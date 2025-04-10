import { useMemo, useState } from "react";

import { useRouter } from "expo-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useStripe, CardField } from "@stripe/stripe-react-native";

import {
    Box,
    Input,
    InputField,
    Text,
    ButtonText,
    ScrollView,
} from "@/gluestackComponents";

import MaskInput from "react-native-mask-input";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";
import { Button } from "@/components/ui/Button";

import { z } from "zod";

import {
    validateDocument,
    getDocumentMask,
    getDocumentPlaceholder,
} from "@/utils/documentValidation";

import { useKeyboardVisibility } from "@/hooks/KeyboardVisibilityHook";

import { savePaymentMethod } from "@/connection/wallet/WalletConnection";

import { toast } from "burnt";

const NewCardSchema = z.object({
    document: z.string().refine((val) => validateDocument(val), {
        message: "CPF/CNPJ inválido",
    }),
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    nickname: z.string().min(3, "Apelido deve ter no mínimo 3 caracteres"),
});

type NewCardData = z.infer<typeof NewCardSchema>;

export default function NewCard() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { createPaymentMethod } = useStripe();
    const [isProcessing, setIsProcessing] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<NewCardData>({
        resolver: zodResolver(NewCardSchema),
    });

    const { mutate: saveCard, isPending } = useMutation({
        mutationFn: savePaymentMethod,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
            router.back();
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: "Erro ao salvar cartão",
                haptic: "error",
                duration: 3000,
                preset: "error",
                from: "top",
            });
        },
    });

    const isKeyboardVisible = useKeyboardVisibility();

    const document = watch("document") ?? "";

    const documentMask = useMemo(() => getDocumentMask(document), [document]);
    const documentPlaceholder = useMemo(
        () => getDocumentPlaceholder(document),
        [document],
    );

    const onSubmit = async (data: NewCardData) => {
        try {
            setIsProcessing(true);
            const { paymentMethod, error } = await createPaymentMethod({
                paymentMethodType: "Card",
                paymentMethodData: {
                    billingDetails: {
                        name: data.name,
                        address: { country: "BR" },
                    },
                },
            });

            if (error) {
                toast({
                    title: "Erro ao processar cartão",
                    message: error.message,
                    preset: "error",
                    haptic: "error",
                });
            } else {
                saveCard({
                    token: paymentMethod.id,
                    document: data.document,
                    name: data.name,
                    nickname: data.nickname,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro ao processar cartão",
                preset: "error",
                haptic: "error",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <BaseContainer backgroundColor="$gray50">
            <HeaderContainer title="Cartões" />

            <Text
                fontFamily="$novaBody"
                fontSize={19}
                mt="$5"
                color="$gray900"
                lineHeight={24}
                mb="$5"
            >
                Preencha os dados abaixo para o cadastro de um novo cartão
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text fontSize={17.5} bold color="$black">
                    Dados do cartão
                </Text>

                <Box
                    borderWidth={1}
                    borderRadius={10}
                    height={48}
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop={8}
                    overflow="hidden"
                >
                    <CardField
                        postalCodeEnabled={false}
                        style={{
                            width: "100%",
                            height: 48,
                        }}
                        onCardChange={(cardDetails) => {
                            console.log(cardDetails);
                        }}
                        onFocus={(focusedField) => {
                            console.log(focusedField);
                        }}
                    />
                </Box>

                <Text fontSize={17.5} bold color="$black" mt="$5">
                    Nome impresso no cartão
                </Text>

                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            size="md"
                            borderWidth={1}
                            borderColor={errors.name ? "#ff0000" : "#999"}
                            borderRadius={10}
                            height={48}
                            alignItems="center"
                            justifyContent="space-between"
                            marginTop={8}
                        >
                            <InputField
                                fontSize={19}
                                placeholder="Ex: Antonio Ataide"
                                value={value}
                                onChangeText={onChange}
                                style={{
                                    color: errors.name ? "#ff0000" : "#000",
                                }}
                            />
                        </Input>
                    )}
                />

                <Text fontSize={17.5} mt="$4" bold color="$black">
                    CPF/CNPJ do titular
                </Text>

                <Controller
                    control={control}
                    name="document"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            size="md"
                            borderWidth={1}
                            borderColor={errors.document ? "#ff0000" : "#999"}
                            borderRadius={10}
                            height={48}
                            alignItems="center"
                            justifyContent="space-between"
                            marginTop={8}
                        >
                            <MaskInput
                                value={value}
                                onChangeText={onChange}
                                mask={documentMask}
                                placeholder={documentPlaceholder}
                                keyboardType="numeric"
                                style={{
                                    fontSize: 19,
                                    flex: 1,
                                    paddingHorizontal: 12,
                                    color: errors.document ? "#ff0000" : "#000",
                                }}
                            />
                        </Input>
                    )}
                />

                <Text fontSize={17.5} bold color="$black" mt="$4">
                    Apelido
                </Text>

                <Controller
                    control={control}
                    name="nickname"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            size="md"
                            borderWidth={1}
                            borderColor={errors.nickname ? "#ff0000" : "#999"}
                            borderRadius={10}
                            height={48}
                            alignItems="center"
                            justifyContent="space-between"
                            marginTop={8}
                        >
                            <InputField
                                fontSize={19}
                                placeholder="Ex: Antonio Ataide"
                                value={value}
                                onChangeText={onChange}
                                style={{
                                    color: errors.nickname ? "#ff0000" : "#000",
                                }}
                            />
                        </Input>
                    )}
                />
            </ScrollView>
            {!isKeyboardVisible && (
                <Box
                    mt="$10"
                    alignItems="center"
                    justifyContent="flex-end"
                    flex={1}
                >
                    <Button
                        onPress={handleSubmit(onSubmit)}
                        mb="$4"
                        disabled={isPending || isProcessing}
                    >
                        <ButtonText
                            textAlign="center"
                            fontFamily="$heading"
                            size="xl"
                        >
                            {isPending || isProcessing
                                ? "Processando..."
                                : "Continuar"}
                        </ButtonText>
                    </Button>
                </Box>
            )}
        </BaseContainer>
    );
}
