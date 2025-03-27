import { useState } from "react";

import { VStack, HStack, Text, Switch, Pressable } from "@/gluestackComponents";

import { useBalance } from "@/providers/BalanceProvider";

import Wallet from "@/assets/icons/appIcons/wallet.svg";
import Card from "@/assets/icons/appIcons/newCard.svg";
import Pix from "@/assets/icons/appIcons/pix.svg";

type PaymentMethodSelectionProps = {
    totalAmount: string;
    onMethodsSelected: (methods: PaymentMethods) => void;
};

export type PaymentMethods = {
    balance: boolean;
    useCard: boolean;
    cardId: number | null;
    pix: boolean;
};

type BooleanPaymentMethod = Extract<
    keyof PaymentMethods,
    "balance" | "useCard" | "pix"
>;

export const PaymentMethodSelection = ({
    totalAmount,
    onMethodsSelected,
}: PaymentMethodSelectionProps) => {
    const { balance } = useBalance();
    const totalAmountNumber = parseFloat(totalAmount.replace(",", ".")) * 100;

    const formattedBalance = balance
        ? (balance / 100).toFixed(2).replace(".", ",")
        : "0,00";

    const [selectedMethods, setSelectedMethods] = useState<PaymentMethods>({
        balance: false,
        useCard: false,
        cardId: null,
        pix: false,
    });

    const canUseBalance = balance && balance > 0;
    const isBalanceEnough = balance && balance >= totalAmountNumber;
    const isBalanceDisabled = !!(!canUseBalance || isBalanceEnough);

    const handleMethodSelection = (method: keyof PaymentMethods) => {
        const newMethods = { ...selectedMethods };

        if (isBalanceEnough) {
            if (method === "balance") {
                newMethods.balance = !newMethods.balance;
            } else {
                return;
            }
        } else {
            if (method === "balance") {
                if (canUseBalance) {
                    newMethods.balance = !newMethods.balance;
                }
            } else {
                const booleanKeys: BooleanPaymentMethod[] = [
                    "balance",
                    "useCard",
                    "pix",
                ];
                booleanKeys.forEach((key) => {
                    if (key !== "balance") {
                        newMethods[key] = false;
                    }
                });
                if (method !== "cardId") {
                    const booleanMethod = method as BooleanPaymentMethod;
                    newMethods[booleanMethod] = !newMethods[booleanMethod];
                }
            }
        }

        setSelectedMethods(newMethods);
        onMethodsSelected(newMethods);
    };

    return (
        <VStack py="$4" gap="$4">
            <Text
                fontSize={16}
                lineHeight={24}
                color="$black"
                fontFamily="$body"
            >
                Selecione a melhor opção que deseja realizar o pagamento.
            </Text>

            <VStack gap="$3" mt="$2">
                <Pressable
                    onPress={() => {
                        handleMethodSelection("balance");
                    }}
                    bgColor="white"
                    p="$4"
                    rounded="$xl"
                    borderWidth={1.5}
                    borderColor={
                        selectedMethods.balance ? "$primaryDefault" : "$gray200"
                    }
                    opacity={isBalanceDisabled ? 0.5 : 1}
                >
                    <HStack alignItems="center" height={50} gap="$3">
                        <Wallet width={26} height={26} stroke="#000" />
                        <HStack flex={1} justifyContent="space-between">
                            <VStack gap="$1">
                                <Text fontSize={15} color="#000">
                                    Saldo da carteira
                                </Text>
                                <Text fontSize={18} bold color="#000">
                                    R$ {formattedBalance}
                                </Text>
                                {isBalanceEnough && (
                                    <Text fontSize={14} color="$primaryDefault">
                                        Saldo suficiente para pagamento
                                    </Text>
                                )}
                            </VStack>
                            <Switch
                                value={selectedMethods.balance}
                                onValueChange={() =>
                                    handleMethodSelection("balance")
                                }
                                thumbColor="$white"
                                trackColor={{ true: "$primaryDefault" }}
                                disabled={isBalanceDisabled}
                            />
                        </HStack>
                    </HStack>
                </Pressable>

                <Pressable
                    onPress={() => {
                        if (!isBalanceEnough) {
                            handleMethodSelection("useCard");
                        }
                    }}
                    bgColor="white"
                    p="$4"
                    rounded="$xl"
                    borderWidth={1.5}
                    borderColor={
                        selectedMethods.useCard ? "$primaryDefault" : "$gray200"
                    }
                    opacity={isBalanceEnough ? 0.5 : 1}
                >
                    <HStack alignItems="center" height={50} gap="$3">
                        <Card width={22} height={22} />
                        <Text
                            fontSize={17}
                            fontFamily="$heading"
                            color="#000"
                            lineHeight={24}
                            bold
                        >
                            Cartão de crédito
                        </Text>
                    </HStack>
                </Pressable>

                <Pressable
                    onPress={() => {}}
                    bgColor="white"
                    p="$4"
                    rounded="$xl"
                    borderWidth={1.5}
                    borderColor={
                        selectedMethods.pix ? "$primaryDefault" : "$gray200"
                    }
                    opacity={0.5}
                >
                    <HStack alignItems="center" height={50} gap="$3">
                        <Pix width={22} height={22} />
                        <Text
                            fontSize={17}
                            fontFamily="$heading"
                            color="#000"
                            lineHeight={24}
                            bold
                        >
                            Pix
                        </Text>
                    </HStack>
                </Pressable>
            </VStack>
        </VStack>
    );
};
