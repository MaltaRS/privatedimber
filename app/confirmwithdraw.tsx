import { useRouter } from "expo-router";
import { toast } from "burnt";
import { useFormContext } from "react-hook-form";

import {
    Text,
    VStack,
    HStack,
    Box,
    ButtonText,
    Divider,
} from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/utils/formatters";

export default function ConfirmWithdrawScreen() {
    const router = useRouter();
    const { watch } = useFormContext();

    const amount = watch("amount");
    const bankData = watch("bankData");

    const handleConfirm = () => {
        toast({
            title: "Solicitação de saque realizada com sucesso!",
            message: "O valor será creditado em até 24 horas úteis.",
            preset: "done",
            haptic: "success",
        });
        router.replace("/(tabs)/wallet");
    };

    return (
        <BaseContainer>
            <Box flex={1}>
                <HeaderContainer title="Saque" />

                <VStack mt="$5" gap="$4">
                    <Text fontSize="$md" color="$gray900">
                        Revise os dados antes de finalizar a solicitação de
                        saque.
                    </Text>

                    <VStack
                        bgColor="$gray50"
                        p="$5"
                        borderRadius="$lg"
                        gap="$4"
                    >
                        <HStack justifyContent="space-between">
                            <Text fontSize="$md" color="$gray900">
                                Valor do saque
                            </Text>
                            <Text
                                fontSize="$md"
                                color="$gray900"
                                fontFamily="$heading"
                                bold
                            >
                                {formatCurrency(Number(amount))}
                            </Text>
                        </HStack>

                        <Divider />

                        <VStack gap="$2">
                            <Text fontSize="$md" color="$gray900">
                                Dados bancários
                            </Text>
                            <Text fontSize="$sm" color="$gray600">
                                {bankData?.bankName}
                            </Text>
                            <Text fontSize="$sm" color="$gray600">
                                Agência: {bankData?.agency}
                            </Text>
                            <Text fontSize="$sm" color="$gray600">
                                Conta: {bankData?.accountNumber}
                            </Text>
                        </VStack>
                    </VStack>

                    <Text fontSize="$sm" color="$gray600" mt="$2">
                        O valor será creditado em até 24 horas úteis.
                    </Text>
                </VStack>
            </Box>

            <Button onPress={handleConfirm} mb="$4">
                <ButtonText textAlign="center" fontFamily="$heading" size="xl">
                    Confirmar saque
                </ButtonText>
            </Button>
        </BaseContainer>
    );
}
