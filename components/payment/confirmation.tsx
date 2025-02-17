import { Dispatch, Fragment, SetStateAction, useState } from "react";

import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ButtonText,
    HStack,
    Text,
    VStack,
} from "@/gluestackComponents";

import { PaymentItems } from "@/app/(conversations)/[conversationId]";

import { useAuth, User } from "@/Context/AuthProvider";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPaymentIntent } from "@/connection/stripe/StripeConnection";

import { toast } from "burnt";

import { GoBack } from "../utils/GoBack";

import { PaymentSheetComponent } from ".";
import { Button } from "../ui/Button";

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

    const [needConfirmation, setNeedConfirmation] = useState(true);

    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const handleClose = () => {
        setNeedConfirmation(false);

        setSendToPayment(false);
    };

    const {
        mutate: handleCreatePaymentIntent,
        isPending: isCreatingPaymentIntent,
    } = useMutation({
        mutationFn: createPaymentIntent,
        onSuccess: async (data) => {
            if (data.status === "succeeded") {
                await handleSuccess();

                handleClose();
                return;
            }

            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
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
            toast({
                title: "Usuário não encontrado!",
                preset: "error",
            });
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
            metadata: {
                conversationId,
            },
        });
    };

    const handleSuccess = async () => {
        await queryClient.setQueryData(["conversations"], (oldData: any) => {
            if (!oldData) return;
            return {
                ...oldData,
                conversations: oldData.conversations.map(
                    (conversation: any) => {
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
                    },
                ),
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
                            return {
                                ...message,
                                deliveredAt: new Date(),
                            };
                        }
                        return message;
                    }),
                };
            },
        );
    };

    return (
        <Fragment>
            <Actionsheet
                isOpen={needConfirmation}
                onClose={handleClose}
                zIndex={999}
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
                                    onPress={handleClose}
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
                                                parseFloat(item.amount) > 0,
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
                                    >
                                        <Text color="$gray700" fontSize={17}>
                                            Valor total
                                        </Text>
                                        <Text
                                            fontFamily="$jakartHeading"
                                            color="#000"
                                            fontSize={18}
                                        >
                                            R${" "}
                                            {(
                                                paymentItems.reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        item.amount *
                                                            item.quantity,
                                                    0,
                                                ) / 100
                                            )
                                                .toFixed(2)
                                                .replace(".", ",")}
                                        </Text>
                                    </HStack>
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
                        handleClose();
                    }}
                    onError={(err) => {
                        console.error("Erro ao processar pagamento:", err);
                        handleClose();
                    }}
                />
            )}
        </Fragment>
    );
};
