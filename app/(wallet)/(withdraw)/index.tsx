import { useState } from "react";

import { useRouter } from "expo-router";

import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { toast } from "burnt";

import { Box, ButtonText, Text, HStack } from "@/gluestackComponents";

import { ConfirmStep } from "@/components/wallet/Steps/ConfirmStep";
import { AmountStep } from "@/components/wallet/Steps/AmountStep";
import { TypeStep } from "@/components/wallet/Steps/TypeStep";
import { LoadingStep } from "@/components/wallet/Steps/LoadingStep";
import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";
import { Button } from "@/components/ui/Button";

import { useKeyboardVisibility } from "@/hooks/KeyboardVisibilityHook";
import { createWithdraw } from "@/connection/wallet/WithdrawConnection";

import Pix from "@/assets/icons/appIcons/pix.svg";

const withdrawalSchema = z.object({
    amount: z.string().min(1, "O valor é obrigatório"),
    withdrawalType: z.enum(["pix", "bank"]).optional(),
    pixKey: z.string().optional(),
    bankData: z
        .object({
            bankName: z.string().optional(),
            agency: z.string().optional(),
            accountNumber: z.string().optional(),
        })
        .optional(),
});

type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

type Step = {
    component: JSX.Element;
    active: boolean;
    fields: (keyof WithdrawalFormData)[];
};

type LoadingState = {
    isLoading: boolean;
    message: string;
};

export default function WithdrawScreen() {
    const router = useRouter();
    const isKeyboardVisible = useKeyboardVisibility();
    const [loadingState, setLoadingState] = useState<LoadingState>({
        isLoading: false,
        message: "",
    });

    const form = useForm<WithdrawalFormData>({
        resolver: zodResolver(withdrawalSchema),
        defaultValues: {
            amount: "",
            withdrawalType: undefined,
            pixKey: "",
            bankData: {
                bankName: "",
                agency: "",
                accountNumber: "",
            },
        },
    });

    const { watch } = form;
    const amount = watch("amount");
    const bankData = watch("bankData");

    const [steps, setSteps] = useState<{ steps: Step[]; activeStep: number }>({
        steps: [
            {
                component: <AmountStep />,
                active: true,
                fields: ["amount"],
            },
            {
                component: <TypeStep />,
                active: false,
                fields: ["withdrawalType", "bankData"],
            },
            {
                component: <ConfirmStep />,
                active: false,
                fields: [],
            },
        ],
        activeStep: 0,
    });

    const handleBack = () => {
        if (steps.activeStep > 0) {
            const activeStep = steps.activeStep - 1;
            setSteps({
                steps: steps.steps.map((step, index) => ({
                    ...step,
                    active: index === activeStep,
                })),
                activeStep,
            });
        } else {
            router.back();
        }
    };

    const handleNext = () => {
        if (steps.activeStep === steps.steps.length - 1) {
            handleConfirm();
        } else {
            const activeStep = steps.activeStep + 1;
            setSteps({
                steps: steps.steps.map((step, index) => ({
                    ...step,
                    active: index === activeStep,
                })),
                activeStep,
            });
        }
    };

    const handleConfirm = async () => {
        try {
            setLoadingState({
                isLoading: true,
                message: "Processando solicitação de saque...",
            });

            await createWithdraw({
                amount,
                bankData: bankData as any,
            });

            setLoadingState({
                isLoading: true,
                message: "Saque criado com sucesso!",
            });

            setTimeout(() => {
                router.replace("/(tabs)/wallet");
            }, 2000);
        } catch (error) {
            // @ts-ignore
            console.log(error.response.data);
            toast({
                title: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
                preset: "error",
                haptic: "error",
            });
            setLoadingState({
                isLoading: false,
                message: "",
            });
        }
    };

    const isButtonDisabled = () => {
        switch (steps.activeStep) {
            case 0:
                return !amount;
            case 1:
                return (
                    !bankData?.bankName ||
                    !bankData?.agency ||
                    !bankData?.accountNumber
                );
            default:
                return false;
        }
    };

    const ComponentTransf = () => {
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

    if (loadingState.isLoading) {
        return (
            <BaseContainer>
                <LoadingStep message={loadingState.message} />
            </BaseContainer>
        );
    }

    return (
        <FormProvider {...form}>
            <BaseContainer>
                <Box flex={1}>
                    <HeaderContainer title="Saque" onBackPress={handleBack} />

                    {steps.steps[steps.activeStep].component}

                    {steps.activeStep === 0 && <ComponentTransf />}
                </Box>

                {!isKeyboardVisible && (
                    <Button
                        onPress={handleNext}
                        mb="$4"
                        isDisabled={isButtonDisabled()}
                    >
                        <ButtonText
                            textAlign="center"
                            fontFamily="$heading"
                            size="xl"
                        >
                            {steps.activeStep === steps.steps.length - 1
                                ? "Confirmar saque"
                                : "Continuar"}
                        </ButtonText>
                    </Button>
                )}
            </BaseContainer>
        </FormProvider>
    );
}
