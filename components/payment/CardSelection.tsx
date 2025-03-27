import { Fragment, useState } from "react";

import {
    VStack,
    Text,
    ScrollView,
    InputField,
    HStack,
    Pressable,
} from "@/gluestackComponents";

import { useQuery } from "@tanstack/react-query";

import {
    getPaymentMethods,
    PaymentMethod,
} from "@/connection/wallet/WalletConnection";

import { CheckCircle2 } from "lucide-react-native";

import Mastercard from "@/assets/icons/cardBrands/mastercard.svg";
import Visa from "@/assets/icons/cardBrands/visa.svg";

import { SkeletonBox } from "../utils/SkeletonBox";

import { Colors } from "@/constants/Colors";

import { Input } from "@/components/ui/Input";

type CardSelectionProps = {
    onCardSelected: (cardId: number) => void;
    onInstallmentsSelected: (installments: number) => void;
    selectedCardId?: number | null;
};

export const CardSelection = ({
    onCardSelected,
    onInstallmentsSelected,
    selectedCardId,
}: CardSelectionProps) => {
    const [selectedInstallments, setSelectedInstallments] = useState("1");

    const { data: paymentMethodsData, isLoading } = useQuery({
        queryKey: ["paymentMethods"],
        queryFn: getPaymentMethods,
    });

    const handleCardPress = (cardId: number) => {
        onCardSelected(cardId);
    };

    const handleInstallmentsChange = (value: string) => {
        const numValue = value.replace(/\D/g, "").substring(1, 2);
        const num = parseInt(numValue || "1");

        if (num > 6) {
            setSelectedInstallments("6");
            onInstallmentsSelected(6);
            return;
        } else if (num < 1) {
            setSelectedInstallments("1");
            onInstallmentsSelected(1);
            return;
        }

        setSelectedInstallments(numValue || "1");
        onInstallmentsSelected(num);
    };

    return (
        <VStack gap="$4">
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading ? (
                    <VStack space="md">
                        {[1, 2, 3].map((index) => (
                            <Fragment key={index}>
                                <HStack
                                    borderWidth={1}
                                    borderColor="#999"
                                    padding={15}
                                    borderRadius={10}
                                    alignItems="center"
                                    width="100%"
                                    height={85}
                                    justifyContent="space-between"
                                    marginTop={20}
                                    backgroundColor="#fff"
                                >
                                    <HStack alignItems="center" gap="$4">
                                        <SkeletonBox
                                            width={34}
                                            height={34}
                                            borderRadius="$full"
                                        />
                                        <VStack gap="$2">
                                            <SkeletonBox
                                                width={120}
                                                height={20}
                                            />
                                            <SkeletonBox
                                                width={180}
                                                height={16}
                                            />
                                        </VStack>
                                    </HStack>
                                    <SkeletonBox width={24} height={24} />
                                </HStack>
                            </Fragment>
                        ))}
                    </VStack>
                ) : (
                    <Fragment>
                        {paymentMethodsData?.paymentMethods.map(
                            (paymentMethod: PaymentMethod) => {
                                const isSelected =
                                    selectedCardId === paymentMethod.id;
                                const CardIcon =
                                    paymentMethod.cardBrand.toLowerCase() ===
                                    "visa"
                                        ? Visa
                                        : Mastercard;

                                return (
                                    <Pressable
                                        key={paymentMethod.id}
                                        onPress={() =>
                                            handleCardPress(paymentMethod.id)
                                        }
                                    >
                                        <VStack
                                            borderWidth={1}
                                            borderColor={
                                                isSelected
                                                    ? "$primaryDefault"
                                                    : "$gray300"
                                            }
                                            rounded="$xl"
                                            mb="$3"
                                            bgColor="$white"
                                        >
                                            <HStack
                                                alignItems="center"
                                                justifyContent="space-between"
                                                borderBottomWidth={
                                                    isSelected ? 1 : 0
                                                }
                                                borderBottomColor={"$gray300"}
                                                p="$4"
                                            >
                                                <HStack
                                                    alignItems="center"
                                                    gap="$3"
                                                >
                                                    {isSelected && (
                                                        <CheckCircle2
                                                            size={24}
                                                            color={
                                                                Colors.primaryDefault
                                                            }
                                                            style={{
                                                                marginRight: 10,
                                                            }}
                                                        />
                                                    )}
                                                    <CardIcon
                                                        width={34}
                                                        height={34}
                                                    />
                                                    <VStack>
                                                        <Text
                                                            fontSize={18}
                                                            color="$black"
                                                            bold
                                                        >
                                                            Crédito
                                                        </Text>
                                                        <Text
                                                            fontSize={16}
                                                            color="$gray600"
                                                        >
                                                            {
                                                                paymentMethod.cardBrand
                                                            }{" "}
                                                            crédito ••••
                                                            {
                                                                paymentMethod.last4
                                                            }
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                            </HStack>

                                            {isSelected && (
                                                <VStack gap="$3" p="$4">
                                                    <VStack gap="$2">
                                                        <Text
                                                            fontSize={17.5}
                                                            bold
                                                            color="$black"
                                                        >
                                                            Parcelas
                                                        </Text>
                                                        <Input borderColor="$gray300">
                                                            <InputField
                                                                value={
                                                                    selectedInstallments
                                                                }
                                                                onChangeText={
                                                                    handleInstallmentsChange
                                                                }
                                                                keyboardType="numeric"
                                                            />
                                                        </Input>
                                                    </VStack>
                                                </VStack>
                                            )}
                                        </VStack>
                                    </Pressable>
                                );
                            },
                        )}
                        {paymentMethodsData?.paymentMethods.length === 0 && (
                            <Text
                                fontSize={16}
                                fontWeight="bold"
                                color="$gray700"
                                textAlign="center"
                                mt="$4"
                            >
                                Nenhum cartão cadastrado, cadastre um novo
                                cartão para continuar
                            </Text>
                        )}
                    </Fragment>
                )}
            </ScrollView>
        </VStack>
    );
};
