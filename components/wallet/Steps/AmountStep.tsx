import { useFormContext } from "react-hook-form";

import { Text, VStack, HStack } from "@/gluestackComponents";

import { useBalance } from "@/providers/BalanceProvider";

import { formatCurrency } from "@/utils/formatters";

import { MoneyInput } from "@/components/ui/MoneyInput";

export function AmountStep() {
    const { setValue } = useFormContext();
    const { balance, isLoading: isBalanceLoading } = useBalance();

    const formattedBalance =
        balance !== null ? formatCurrency(balance / 100) : "R$ 0,00";

    const handleMaxPress = () => {
        if (balance !== null) {
            setValue("amount", (balance / 100).toFixed(2).replace(".", ","));
        }
    };

    return (
        <VStack>
            <HStack
                mt={25}
                width="100%"
                alignItems="center"
                justifyContent="space-between"
            >
                <Text fontSize={18} color="$black" fontFamily="$novaBody" bold>
                    Quanto você quer sacar?
                </Text>
            </HStack>

            <MoneyInput name="amount" onMaxPress={handleMaxPress} />

            <VStack>
                <HStack width="100%" alignItems="center" mt={5}>
                    <Text fontSize={18} color="$gray900" mb={2}>
                        Saldo disponível:{" "}
                    </Text>

                    <Text
                        fontSize={18}
                        fontFamily="$heading"
                        color="$black"
                        letterSpacing={0}
                        bold
                    >
                        {isBalanceLoading ? "Carregando..." : formattedBalance}
                    </Text>
                </HStack>
            </VStack>
        </VStack>
    );
}
