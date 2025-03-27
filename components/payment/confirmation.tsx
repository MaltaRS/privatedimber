import { Dispatch, Fragment, SetStateAction, useMemo, useState } from "react";

import { Dimensions } from "react-native";

import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ButtonText,
    Divider,
    HStack,
    Text,
    VStack,
    Box,
    Spinner,
} from "@/gluestackComponents";

import { PaymentItems } from "@/app/(conversations)/[conversationId]";

import { useAuth, User } from "@/Context/AuthProvider";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import {
    createPaymentIntent,
    findTransactionById,
} from "@/connection/stripe/StripeConnection";

import { getPaymentMethods } from "@/connection/wallet/WalletConnection";

import { toast } from "burnt";

import { GoBack } from "../utils/GoBack";

import { PaymentSheetComponent } from ".";

import { Button } from "../ui/Button";

import { Receipt } from "./receipt";

import {
    PaymentMethodSelection,
    PaymentMethods,
} from "./PaymentMethodSelection";

import { CardSelection } from "./CardSelection";
import { useBalance } from "@/providers/BalanceProvider";

type ConfirmationProps = {
    conversationId: string;
    contact: User | undefined;
    paymentItems: PaymentItems;
    setSendToPayment: Dispatch<SetStateAction<boolean>>;
};

export const Confirmation = ({
    conversationId,
    contact,
    paymentItems,
    setSendToPayment,
}: ConfirmationProps) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: paymentMethodsData } = useQuery({
        queryKey: ["paymentMethods"],
        queryFn: getPaymentMethods,
    });

    const { balance } = useBalance();

    const formattedBalance = balance
        ? (balance / 100).toFixed(2).replace(".", ",")
        : "0,00";

    const [showSummary, setShowSummary] = useState(false);

    const [showMethodSelection, setShowMethodSelection] = useState(true);

    const [showCardSelection, setShowCardSelection] = useState(false);

    const [selectedPaymentMethods, setSelectedPaymentMethods] =
        useState<PaymentMethods>({
            balance: false,
            useCard: false,
            cardId: null,
            pix: false,
        });

    const [selectedInstallments, setSelectedInstallments] = useState(1);

    const [showReceipt, setShowReceipt] = useState(false);

    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const [transactionId, setTransactionId] = useState<string | null>(null);

    const [isPolling, setIsPolling] = useState(false);

    const [transactionInfo, setTransactionInfo] = useState<{
        cardBrand?: string;
        last4?: string;
        installments?: number;
        successfullAt?: string;
    }>({});

    const { width, height } = Dimensions.get("window");

    const handleMethodsSelected = (methods: PaymentMethods) => {
        setSelectedPaymentMethods(methods);
    };

    const handleProceedToSummary = () => {
        const hasSelectedMethod = Object.values(selectedPaymentMethods).some(
            (value) => typeof value === "boolean" && value === true,
        );

        if (!hasSelectedMethod) {
            toast({
                title: "Selecione uma forma de pagamento",
                preset: "error",
            });
            return;
        }

        if (selectedPaymentMethods.useCard) {
            setShowMethodSelection(false);
            setShowCardSelection(true);
        } else {
            setShowMethodSelection(false);
            setShowSummary(true);
        }
    };

    const handleCardSelected = (cardId: number) => {
        setSelectedPaymentMethods((prev) => ({
            ...prev,
            cardId,
        }));
    };

    const handleInstallmentsSelected = (installments: number) => {
        setSelectedInstallments(installments);
    };

    const handleProceedFromCardSelection = () => {
        if (!selectedPaymentMethods.cardId) {
            toast({
                title: "Selecione um cartão",
                preset: "error",
            });
            return;
        }
        setShowCardSelection(false);
        setShowSummary(true);
    };

    const handleCloseSummary = ({ success = true }: { success?: boolean }) => {
        setShowSummary(false);
        setShowMethodSelection(false);
        setShowCardSelection(false);
        setSendToPayment(success);
    };

    const handleCloseReceipt = () => {
        setShowReceipt(false);
        setShowSummary(false);
        setSendToPayment(false);
    };

    const pollTransaction = async (id: string) => {
        setIsPolling(true);
        setShowSummary(false);
        const intervalId = setInterval(async () => {
            try {
                const transaction = await findTransactionById(id);
                if (transaction && transaction.status === "SUCCESS") {
                    clearInterval(intervalId);
                    setIsPolling(false);

                    const successEvent = Array.isArray(
                        transaction.statusHistory,
                    )
                        ? transaction.statusHistory.find(
                              (e: { event: string; at: string }) =>
                                  e.event === "payment_intent.succeeded",
                          )
                        : null;

                    setTransactionInfo({
                        cardBrand: transaction.cardBrand,
                        last4: transaction.last4,
                        installments: transaction.installments,
                        successfullAt: successEvent?.at,
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["balance"],
                    });

                    queryClient.invalidateQueries({
                        queryKey: ["transactions"],
                    });

                    setShowReceipt(true);
                }
            } catch (error) {
                console.error("Erro ao buscar transação:", error);
                clearInterval(intervalId);
                setIsPolling(false);
                toast({ title: "Erro ao buscar transação", preset: "error" });
            }
        }, 1200);
    };

    const {
        mutate: handleCreatePaymentIntent,
        isPending: isCreatingPaymentIntent,
    } = useMutation({
        mutationFn: createPaymentIntent,
        onSuccess: async (data) => {
            if (data.status === "succeeded") {
                setTransactionId(data.transactionId);
                pollTransaction(data.transactionId);
                return;
            }
            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
                setTransactionId(data.transactionId);
            } else {
                toast({
                    title: "Não foi possivel criar o pagamento!",
                    preset: "error",
                });
            }
        },
        onError: (err: any) => {
            console.error("Erro ao criar Payment Intent:", err);
            toast({
                title: "Não foi possivel criar o pagamento!",
                preset: "error",
            });
        },
    });

    const HandleCreatePaymentIntent = () => {
        if (!contact) {
            toast({ title: "Usuário não encontrado!", preset: "error" });
            return;
        }
        const paymentItemsTotal = paymentItems.reduce(
            (acc, item) => acc + item.amount * item.quantity,
            0,
        );
        const items = paymentItems.filter((item) => item.quantity > 0);
        handleCreatePaymentIntent({
            amount: paymentItemsTotal,
            items,
            contact,
            intention: "CHAT_APRESENTATION",
            metadata: { conversationId },
            paymentMethods: selectedPaymentMethods,
            installments: selectedInstallments,
        });
    };

    const handleSuccess = async () => {
        await queryClient.setQueryData(["conversations"], (oldData: any) => {
            if (!oldData) return;
            if (!oldData.pages) return;
            const conversations =
                oldData.pages[oldData.pages.length - 1].conversations;
            return {
                ...oldData,
                conversations: conversations.map((conversation: any) => {
                    if (conversation.id === conversationId) {
                        return {
                            ...conversation,
                            messages: conversation.messages.map(
                                (message: any) => {
                                    if (message.senderId === user?.id) {
                                        return {
                                            ...message,
                                            deliveredAt: new Date(),
                                        };
                                    }
                                    return message;
                                },
                            ),
                        };
                    }
                    return conversation;
                }),
            };
        });
        await queryClient.setQueryData(
            ["conversationMessage", conversationId],
            (oldData: any) => {
                if (!oldData) return;
                return {
                    ...oldData,
                    messages: oldData.messages.map((message: any) => {
                        if (message.senderId === user?.id) {
                            return { ...message, deliveredAt: new Date() };
                        }
                        return message;
                    }),
                };
            },
        );
    };

    const totalAmount = useMemo(() => {
        return (
            paymentItems.reduce(
                (acc, item) => acc + item.amount * item.quantity,
                0,
            ) / 100
        )
            .toFixed(2)
            .replace(".", ",");
    }, [paymentItems]);

    return (
        <Fragment>
            {isPolling && (
                <Box
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width,
                        height,
                        backgroundColor: "white",
                    }}
                    justifyContent="center"
                    alignItems="center"
                    zIndex={2000}
                >
                    <Spinner size="large" />
                </Box>
            )}
            <Actionsheet
                isOpen={showMethodSelection}
                onClose={() => handleCloseSummary({ success: false })}
            >
                <ActionsheetBackdrop bgColor="#000" />
                <ActionsheetContent zIndex={999} bgColor="white">
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator bgColor="#000" />
                    </ActionsheetDragIndicatorWrapper>
                    <ActionsheetItem>
                        <VStack pt="$2" w="$full">
                            <HStack
                                gap="$2"
                                h={22}
                                alignItems="center"
                                justifyContent="center"
                                position="relative"
                            >
                                <GoBack
                                    onPress={() =>
                                        handleCloseSummary({
                                            success: false,
                                        })
                                    }
                                    style={{
                                        position: "absolute",
                                        top: "-50%",
                                        left: 0,
                                    }}
                                />
                                <Text
                                    size="lg"
                                    color="#000"
                                    fontFamily="$heading"
                                    lineHeight={20}
                                    textAlign="center"
                                >
                                    Pagamento
                                </Text>
                            </HStack>
                            <PaymentMethodSelection
                                totalAmount={totalAmount}
                                onMethodsSelected={handleMethodsSelected}
                            />
                            <Button mt="$4" onPress={handleProceedToSummary}>
                                <ButtonText
                                    textAlign="center"
                                    fontFamily="$heading"
                                    size="lg"
                                    fontWeight="$bold"
                                >
                                    Continuar
                                </ButtonText>
                            </Button>
                        </VStack>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>

            <Actionsheet
                isOpen={showCardSelection}
                onClose={() => handleCloseSummary({ success: false })}
            >
                <ActionsheetBackdrop bgColor="#000" />
                <ActionsheetContent zIndex={999} bgColor="white">
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator bgColor="#000" />
                    </ActionsheetDragIndicatorWrapper>
                    <ActionsheetItem>
                        <VStack pt="$2" w="$full" gap="$4">
                            <HStack
                                gap="$2"
                                h={22}
                                alignItems="center"
                                justifyContent="center"
                                position="relative"
                            >
                                <GoBack
                                    onPress={() => {
                                        setShowCardSelection(false);
                                        setShowMethodSelection(true);
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: "-50%",
                                        left: 0,
                                    }}
                                />
                                <Text
                                    size="lg"
                                    color="#000"
                                    fontFamily="$heading"
                                    lineHeight={20}
                                    textAlign="center"
                                >
                                    Pagamento
                                </Text>
                            </HStack>
                            <CardSelection
                                onCardSelected={handleCardSelected}
                                onInstallmentsSelected={
                                    handleInstallmentsSelected
                                }
                                selectedCardId={selectedPaymentMethods.cardId}
                            />
                            <Button
                                mt="$4"
                                onPress={handleProceedFromCardSelection}
                            >
                                <ButtonText
                                    textAlign="center"
                                    fontFamily="$heading"
                                    size="lg"
                                    fontWeight="$bold"
                                >
                                    Continuar
                                </ButtonText>
                            </Button>
                        </VStack>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>

            <Actionsheet
                isOpen={showSummary}
                onClose={() => handleCloseSummary({ success: false })}
            >
                <ActionsheetBackdrop bgColor="#000" />
                <ActionsheetContent zIndex={999} bgColor="white">
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator bgColor="#000" />
                    </ActionsheetDragIndicatorWrapper>
                    <ActionsheetItem>
                        <VStack pt="$2" gap="$2" w="$full">
                            <HStack
                                gap="$2"
                                h={22}
                                alignItems="center"
                                justifyContent="center"
                                position="relative"
                            >
                                <GoBack
                                    onPress={() => {
                                        setShowMethodSelection(true);
                                        setShowSummary(false);
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: "-50%",
                                        left: 0,
                                    }}
                                />
                                <Text
                                    size="lg"
                                    color="#000"
                                    fontFamily="$heading"
                                    lineHeight={20}
                                    textAlign="center"
                                >
                                    Resumo do pagamento
                                </Text>
                            </HStack>
                            <Text
                                size="2xl"
                                fontFamily="$heading"
                                color="$black"
                                pt="$7"
                                pb="$9"
                            >
                                Enviando mensagem para {contact?.name}
                            </Text>
                            <VStack gap="$4">
                                <Text
                                    fontFamily="$heading"
                                    color="$black"
                                    size="xl"
                                    lineHeight={20}
                                >
                                    Detalhes do envio
                                </Text>
                                <VStack gap="$2">
                                    {paymentItems
                                        .filter(
                                            (item: any) =>
                                                Number(
                                                    item.amount * item.quantity,
                                                ) > 0,
                                        )
                                        .map((item: any, index: number) => (
                                            <HStack
                                                key={index}
                                                justifyContent="space-between"
                                            >
                                                <Text
                                                    color="$gray700"
                                                    fontSize={17}
                                                >
                                                    {item.name}
                                                </Text>
                                                <Text
                                                    color="$gray700"
                                                    fontSize={18}
                                                >
                                                    R${" "}
                                                    {(
                                                        (item.amount *
                                                            item.quantity) /
                                                        100
                                                    )
                                                        .toFixed(2)
                                                        .replace(".", ",")}
                                                </Text>
                                            </HStack>
                                        ))}
                                    <HStack
                                        key={String(paymentItems.length + 1)}
                                        justifyContent="space-between"
                                        mt="$1"
                                    >
                                        <Text color="$gray700" fontSize={17}>
                                            Valor total
                                        </Text>
                                        <Text
                                            fontFamily="$jakartHeading"
                                            color="#000"
                                            fontSize={18}
                                        >
                                            R$ {totalAmount}
                                        </Text>
                                    </HStack>
                                </VStack>
                            </VStack>
                            <Divider mb="$2" bgColor="$gray200" mt="$4" />
                            <VStack gap="$4" mt="$4">
                                <Text
                                    fontFamily="$heading"
                                    color="$black"
                                    size="xl"
                                    lineHeight={20}
                                >
                                    Forma de pagamento
                                </Text>
                                <VStack>
                                    {selectedPaymentMethods.balance && (
                                        <HStack justifyContent="space-between">
                                            <Text
                                                fontFamily="novaBody"
                                                lineHeight={22}
                                                color="$gray400"
                                                fontSize={16}
                                            >
                                                Saldo da carteira
                                            </Text>
                                            <Text
                                                fontFamily="$jakartHeading"
                                                color="#000"
                                                fontSize={18}
                                            >
                                                R${" "}
                                                {formattedBalance < totalAmount
                                                    ? formattedBalance
                                                    : totalAmount}
                                            </Text>
                                        </HStack>
                                    )}
                                    {selectedPaymentMethods.useCard && (
                                        <HStack justifyContent="space-between">
                                            <Text
                                                color="$gray800"
                                                fontSize={17}
                                            >
                                                Cartão de crédito
                                            </Text>
                                            <Text
                                                fontFamily="$jakartHeading"
                                                color="#000"
                                                fontSize={18}
                                            >
                                                R$ {totalAmount}
                                            </Text>
                                        </HStack>
                                    )}
                                    {selectedPaymentMethods.cardId && (
                                        <HStack justifyContent="space-between">
                                            <Text
                                                fontFamily="novaBody"
                                                lineHeight={22}
                                                color="$gray400"
                                                fontSize={16}
                                            >
                                                {
                                                    paymentMethodsData?.paymentMethods.find(
                                                        (method) =>
                                                            method.id ===
                                                            selectedPaymentMethods.cardId,
                                                    )?.cardBrand
                                                }{" "}
                                                ••••
                                                {
                                                    paymentMethodsData?.paymentMethods.find(
                                                        (method) =>
                                                            method.id ===
                                                            selectedPaymentMethods.cardId,
                                                    )?.last4
                                                }
                                            </Text>
                                            <Text
                                                fontFamily="novaBody"
                                                lineHeight={22}
                                                color="$gray400"
                                                fontSize={14}
                                            >
                                                {selectedInstallments}x de R${" "}
                                                {(
                                                    parseFloat(
                                                        totalAmount.replace(
                                                            ",",
                                                            ".",
                                                        ),
                                                    ) / selectedInstallments
                                                )
                                                    .toFixed(2)
                                                    .replace(".", ",")}{" "}
                                                sem juros
                                            </Text>
                                        </HStack>
                                    )}
                                </VStack>
                            </VStack>
                            <Button
                                mt="$4"
                                onPress={HandleCreatePaymentIntent}
                                disabled={isCreatingPaymentIntent}
                            >
                                <ButtonText
                                    textAlign="center"
                                    fontFamily="$heading"
                                    size="lg"
                                    fontWeight="$bold"
                                >
                                    Confirmar pagamento
                                </ButtonText>
                            </Button>
                        </VStack>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>
            {clientSecret && (
                <PaymentSheetComponent
                    clientSecret={clientSecret}
                    autoPresent={true}
                    onSuccess={async () => {
                        await handleSuccess();
                        transactionId && pollTransaction(transactionId);
                    }}
                    onError={(err) => {
                        console.error("Erro ao processar pagamento:", err);
                        handleCloseSummary({ success: false });
                    }}
                />
            )}
            <Receipt
                showReceipt={showReceipt}
                handleCloseReceipt={handleCloseReceipt}
                paymentItems={paymentItems}
                contact={contact}
                totalAmount={totalAmount}
                transactionId={
                    transactionId ?? "Id da transação não encontrado"
                }
                cardBrand={transactionInfo.cardBrand}
                cardLast4={transactionInfo.last4}
                installments={transactionInfo.installments}
                successfullAt={transactionInfo.successfullAt}
            />
        </Fragment>
    );
};
