import { useFormContext } from "react-hook-form";

import { Text, VStack, HStack } from "@/gluestackComponents";

import { formatCurrency } from "@/utils/formatters";

import { useAuth } from "@/Context/AuthProvider";

interface BankData {
    bankName: string;
    agency: string;
    accountNumber: string;
}

export function ConfirmStep() {
    const { watch } = useFormContext();

    const { user } = useAuth();

    const amount = watch("amount");
    const bankData = watch("bankData") as BankData;

    return (
        <VStack mt="$5" gap="$4">
            <Text fontSize={17} color="$gray900">
                Revise os dados antes de finalizar a solicitação de saque.
            </Text>

            <VStack borderRadius="$lg" gap="$4" pt="$6">
                <Text fontSize={19.5} color="$gray900" bold>
                    Detalhes da solicitação de saque
                </Text>
                <VStack gap="$4" pt="$2">
                    <HStack justifyContent="space-between">
                        <Text fontSize={17} color="$gray900">
                            Valor
                        </Text>
                        <Text fontSize={17} color="$black" bold>
                            {formatCurrency(Number(amount))}
                        </Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Text fontSize={17} color="$gray900">
                            Banco
                        </Text>
                        <Text fontSize={17} color="$black" fontWeight="$bold">
                            {bankData?.bankName}
                        </Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Text fontSize={17} color="$gray900">
                            Agência
                        </Text>
                        <Text fontSize={17} color="$black" fontWeight="$bold">
                            {bankData?.agency}
                        </Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Text fontSize={17} color="$gray900">
                            Número da Conta
                        </Text>
                        <Text fontSize={17} color="$black" fontWeight="$bold">
                            {bankData?.accountNumber}
                        </Text>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Text fontSize={17} color="$gray900">
                            Nome do beneficiário
                        </Text>
                        <Text fontSize={17} color="$black" fontWeight="$bold">
                            {user?.name}
                        </Text>
                    </HStack>
                </VStack>
            </VStack>
        </VStack>
    );
}
