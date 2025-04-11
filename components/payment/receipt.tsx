import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicatorWrapper,
    ActionsheetDragIndicator,
    ActionsheetItem,
    VStack,
    HStack,
    Divider,
    Text,
    Pressable,
} from "@/gluestackComponents";

import { Download } from "lucide-react-native";

import { GoBack } from "../utils/GoBack";

import DimberGrayLogo from "@/assets/icons/DimberLogoGray.svg";

import { PaymentItems } from "@/app/(conversations)/[conversationId]";

import { User } from "@/Context/AuthProvider";

import { Colors } from "@/constants/Colors";
import { formatSuccessDate } from "@/utils/dateFormat";
import { PaymentMethods } from "./PaymentMethodSelection";
import { PaymentMethodsResponse } from "@/connection/wallet/WalletConnection";

type ReceiptProps = {
    showReceipt: boolean;
    handleCloseReceipt: () => void;
    contact: User | undefined;
    paymentItems: PaymentItems;
    totalAmount: string;
    transactionId: string;
    selectedPaymentMethods: PaymentMethods;
    paymentMethodsData: PaymentMethodsResponse | undefined;
    formattedBalance: string;
    selectedInstallments: number;
    successfullAt?: string;
};

export const Receipt = ({
    showReceipt,
    handleCloseReceipt,
    contact,
    paymentItems,
    totalAmount,
    transactionId,
    selectedPaymentMethods,
    paymentMethodsData,
    formattedBalance,
    selectedInstallments,
    successfullAt,
}: ReceiptProps) => {
    return (
        <Actionsheet
            isOpen={showReceipt}
            onClose={handleCloseReceipt}
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
                            justifyContent="space-between"
                        >
                            <GoBack
                                onPress={handleCloseReceipt}
                                transparent
                                iconSize={22}
                                icon="close"
                            />
                            <Text
                                fontSize={19}
                                color="#000"
                                fontFamily="$heading"
                                lineHeight={20}
                                textAlign="center"
                            >
                                Comprovante
                            </Text>
                            <Pressable
                                p="$2"
                                alignItems="center"
                                justifyContent="center"
                                rounded="$full"
                                onPress={() => {}}
                            >
                                <Download size={20} color={Colors.gray700} />
                            </Pressable>
                        </HStack>
                        <VStack gap="$4" pt="$7" pb="$6">
                            <HStack gap="$2" alignItems="center">
                                <DimberGrayLogo
                                    height={28}
                                    width={28}
                                    style={{ marginBottom: 6 }}
                                />
                                <Text
                                    fontFamily="$heading"
                                    fontSize={28}
                                    color="$gray500"
                                    lineHeight={40}
                                    pb="$1"
                                >
                                    dimber
                                </Text>
                            </HStack>
                            <VStack pt="$1">
                                <Text
                                    size="2xl"
                                    fontFamily="$heading"
                                    color="$black"
                                >
                                    Sua mensagem foi enviada para{" "}
                                    {contact?.name}!
                                </Text>
                                <Text
                                    size="md"
                                    fontFamily="$heading"
                                    color="$gray500"
                                    pt={2}
                                >
                                    {successfullAt
                                        ? formatSuccessDate(successfullAt)
                                        : ""}
                                </Text>
                            </VStack>
                        </VStack>
                        <Divider mb="$2" bgColor="$gray200" />
                        <VStack gap="$4">
                            <Text
                                fontFamily="$heading"
                                color="$black"
                                size="xl"
                                lineHeight={20}
                            >
                                Informações do Serviço
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
                            <Divider mb="$2" bgColor="$gray200" />
                            <VStack gap="$4">
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
                                                fontSize={18}
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
                            <Divider mb="$2" bgColor="$gray200" />
                            <VStack gap="$2">
                                <Text
                                    fontFamily="$heading"
                                    color="$black"
                                    size="xl"
                                    lineHeight={20}
                                >
                                    ID da transação
                                </Text>
                                <Text
                                    color="$gray900"
                                    fontSize={14}
                                    fontFamily="$novaBody"
                                    lineHeight={20}
                                >
                                    {transactionId}
                                </Text>
                            </VStack>
                        </VStack>
                    </VStack>
                </ActionsheetItem>
            </ActionsheetContent>
        </Actionsheet>
    );
};
