import {
    Text,
    VStack,
    HStack,
    Avatar,
    AvatarImage,
    AvatarFallbackText,
    ButtonText,
    Box,
} from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";
import { Button } from "@/components/ui/Button";
import { MoneyInput } from "@/components/ui/MoneyInput";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useForm, FormProvider } from "react-hook-form";

import { useBalance } from "@/providers/BalanceProvider";

import { formatCurrency } from "@/utils/formatters";

import Pix from "@/assets/icons/appIcons/pix.svg";

interface DonationFormData {
    amount: string;
}

export default function DonationInstituitionValuescreen() {
    const methods = useForm<DonationFormData>({
        defaultValues: {
            amount: "",
        },
    });

    const { balance, isLoading: isBalanceLoading } = useBalance();

    const formattedBalance =
        balance !== null ? formatCurrency(balance / 100) : "R$ 0,00";

    const handleMaxPress = () => {
        if (balance !== null) {
            methods.setValue(
                "amount",
                (balance / 100).toFixed(2).replace(".", ","),
            );
        }
    };

    const institutionData = {
        id: "1",
        name: "Instituto Neymar Jr.",
        username: "@institutoneymarjr",
        lastSeen: "ontem às 21:30",
        verified: true,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5z03a91O5qAqycFrTXVjaBcpy1rOjeBERaw&s",
    };

    const HeaderInfoProfile = () => {
        return (
            <VStack alignItems="center" space="md" pt="$4" px="$4">
                <HStack alignItems="center" space="md">
                    <Avatar size="xl">
                        <AvatarFallbackText>
                            {institutionData.name}
                        </AvatarFallbackText>
                        <AvatarImage
                            source={{ uri: institutionData.avatar }}
                            alt={institutionData.name}
                        />
                    </Avatar>

                    <VStack gap={2}>
                        <HStack alignItems="center" space="xs">
                            <Text
                                fontFamily="$novaTitle"
                                fontSize={22}
                                color="$gray900"
                                lineHeight={24}
                            >
                                {institutionData.name}
                            </Text>
                            {institutionData.verified && (
                                <MaterialIcons
                                    name="verified"
                                    size={20}
                                    color="#00A8FF"
                                />
                            )}
                        </HStack>

                        <Text fontSize={17} color="$black">
                            {institutionData.username}
                        </Text>

                        <Text fontSize={15} color="$gray600" mt="$1">
                            última conexão {institutionData.lastSeen}
                        </Text>
                    </VStack>
                </HStack>
            </VStack>
        );
    };

    const AmountSection = () => {
        return (
            <VStack mt="$8" width="100%">
                <Text fontSize={18} color="$black" fontFamily="$novaBody" bold>
                    Quanto você quer doar?
                </Text>

                <MoneyInput name="amount" onMaxPress={handleMaxPress} />

                <HStack width="100%" alignItems="center" mt={5}>
                    <Text fontSize={18} color="$gray900" mb={2}>
                        Saldo disponível:{" "}
                    </Text>

                    <Text
                        fontSize={18}
                        fontFamily="$heading"
                        color="$black"
                        letterSpacing={0}
                        mt={2}
                        bold
                    >
                        {isBalanceLoading ? "Carregando..." : formattedBalance}
                    </Text>
                </HStack>
            </VStack>
        );
    };

    const PaymentMethodSection = () => {
        return (
            <Box mt={32}>
                <Text fontSize={21} bold color="$black">
                    Método de recebimento
                </Text>

                <HStack
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop={20}
                    p="$5"
                    borderRadius={10}
                    bgColor="$gray50"
                >
                    <HStack alignItems="center" gap="$3">
                        <Pix width={22} height={22} color="#777" />

                        <Text fontSize={18} color="$gray900">
                            Transferência bancária via PIX
                        </Text>
                    </HStack>
                </HStack>
            </Box>
        );
    };

    const onSubmit = (data: DonationFormData) => {
        console.log(data);
        // Handle donation submission
    };

    return (
        <BaseContainer>
            <HeaderContainer title="Doação" />

            <FormProvider {...methods}>
                <VStack flex={1} w="$full">
                    <HeaderInfoProfile />
                    <AmountSection />
                    <PaymentMethodSection />
                </VStack>

                <Button
                    onPress={methods.handleSubmit(onSubmit)}
                    mb="$4"
                    mt="$1"
                    disabled={!methods.watch("amount")}
                >
                    <ButtonText
                        textAlign="center"
                        fontFamily="$heading"
                        size="xl"
                    >
                        Confirmar
                    </ButtonText>
                </Button>
            </FormProvider>
        </BaseContainer>
    );
}
