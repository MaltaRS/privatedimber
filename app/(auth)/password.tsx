import React, { useState } from "react";

import {
    VStack,
    HStack,
    ButtonIcon,
    Spinner,
    ButtonText,
    Heading,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    Text,
} from "@/gluestackComponents";

import { BaseContainer } from "../../components/BaseContainer";

import { GoBack } from "../../components/utils/GoBack";

import { Controller, useForm } from "react-hook-form";

import { EyeOff, Eye } from "lucide-react-native";

import api from "@/utils/api";

import { useLocalSearchParams, useRouter } from "expo-router";

import { useAuth } from "@/Context/AuthProvider";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";

const passwordSchema = z.object({
    password: z
        .string({ message: "A senha é obrigatória." })
        .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type PasswordSchema = z.infer<typeof passwordSchema>;

const PasswordScreen = () => {
    const router = useRouter();

    const { emailOrUsername } = useLocalSearchParams<{
        emailOrUsername?: string;
    }>();

    if (!emailOrUsername) {
        console.error("Email ou nome de usuário não encontrado na query.");
        router.back();
    }

    const { signIn } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
    } = useForm<PasswordSchema>({
        resolver: zodResolver(passwordSchema),
    });

    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const HandleLogin = async (data: PasswordSchema) => {
        setIsLoading(true);

        try {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                emailOrUsername ?? "",
            );

            const response = await api.post("/auth/token", {
                ...(isEmail
                    ? { email: emailOrUsername }
                    : { username: emailOrUsername }),
                password: data.password,
            });

            const { access_token, refresh_token } = response.data;

            await signIn(access_token, refresh_token);

            router.replace("/(tabs)/explore");
        } catch (error: any) {
            console.error("Erro durante o login:", error);

            setError("password", {
                type: "manual",
                message: t("password.invalidCredentials"),
            });
        } finally {
            setIsLoading(false);
        }
    };

    const PasswordShowIcon = showPassword ? EyeOff : Eye;

    return (
        <BaseContainer justifyContent="space-between" pb="$4">
            <VStack gap="$4">
                <HStack alignItems="center" justifyContent="space-between">
                    <GoBack
                        onPress={() => {
                            // @ts-ignore
                            router.replace("(auth)/");
                        }}
                        style={{
                            backgroundColor: Colors.gray200,
                        }}
                    />
                </HStack>
                <VStack gap="$4">
                    <Heading size="xl">{t("password.title")}</Heading>
                    <Text fontFamily="$arialBody" lineHeight="$md" mb="$3">
                        {t("password.description")}
                    </Text>
                    <VStack gap="$4">
                        <Text fontWeight="bold">Senha</Text>
                        <Controller
                            control={control}
                            name="password"
                            render={({
                                field: { onBlur, onChange, ref, value },
                            }) => (
                                <Input
                                    variant="outline"
                                    size="lg"
                                    borderRadius={8}
                                    borderColor="$gray400"
                                    isInvalid={!!errors.password}
                                    $invalid-borderColor="$negative"
                                >
                                    <InputField
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder={t("password.placeholder")}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                        secureTextEntry={!showPassword}
                                    />
                                    <InputSlot
                                        pr="$3"
                                        onPress={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <InputIcon>
                                            <PasswordShowIcon
                                                size={20}
                                                color="black"
                                            />
                                        </InputIcon>
                                    </InputSlot>
                                </Input>
                            )}
                        />
                        {errors.password?.message &&
                            typeof errors.password.message === "string" && (
                                <Text color="$negative" fontSize="$md" mt="-$2">
                                    {errors.password.message}
                                </Text>
                            )}
                        <Text
                            pt="$4"
                            fontSize={17}
                            color="$primaryDefault"
                            fontFamily="$heading"
                            lineHeight={20}
                            textAlign="center"
                            onPress={() => {
                                router.push("/(auth)/reset-password");
                            }}
                        >
                            {t("password.forgotPassword")}
                        </Text>
                    </VStack>
                </VStack>
            </VStack>
            <VStack>
                <Button
                    mt="$4"
                    isDisabled={
                        isLoading ||
                        watch("password") === "" ||
                        watch("password") == null
                    }
                    onPress={handleSubmit(HandleLogin)}
                >
                    {isLoading && (
                        <ButtonIcon>
                            <Spinner />
                        </ButtonIcon>
                    )}
                    {!isLoading && (
                        <ButtonText
                            textAlign="center"
                            fontFamily="$heading"
                            size="lg"
                            fontWeight="$bold"
                        >
                            {t("password.loginButton")}
                        </ButtonText>
                    )}
                </Button>
            </VStack>
        </BaseContainer>
    );
};

export default PasswordScreen;
