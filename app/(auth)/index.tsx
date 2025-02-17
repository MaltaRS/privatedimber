import { Link, Redirect, useRouter } from "expo-router";

import { Controller, useForm } from "react-hook-form";

import {
    Box,
    ButtonIcon,
    ButtonText,
    Divider,
    HStack,
    Input,
    InputField,
    ScrollView,
    Text,
    VStack,
} from "@/gluestackComponents";

import { useKeyboardVisibility } from "@/hooks/KeyboardVisibilityHook";

import DimberLogo from "@/assets/icons/dimberLogo.svg";
import GoogleLogo from "@/assets/icons/google.svg";

import { BaseContainer } from "@/components/BaseContainer";
import { Button } from "@/components/ui/Button";
import { Terms } from "@/components/Terms";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/utils/api";

import { useAuth } from "@/Context/AuthProvider";
import { useGoogleAuth } from "@/Context/GoogleAuthProvider";
import React from "react";

const loginSchema = z.object({
    emailOrUsername: z
        .string({
            message: "O campo de email ou nome de usuário é obrigatório.",
        })
        .min(1, "O campo de email ou nome de usuário é obrigatório.")
        .refine(
            (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                /^[a-zA-Z0-9_.-]+$/.test(value),
            {
                message: "Insira um email válido ou nome de usuário.",
            },
        ),
});

type LoginData = z.infer<typeof loginSchema>;

const WelcomeScreen = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const { user: googleUser, signIn: googleSignIn } = useGoogleAuth();

    const { user, isSigningOut, loading } = useAuth();

    const isKeyboardVisible = useKeyboardVisibility();

    const router = useRouter();

    const HandleLogin = async (data: LoginData) => {
        try {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                data.emailOrUsername,
            );

            let response;

            if (isEmail) {
                response = await api.get(`/user/email/${data.emailOrUsername}`);
            } else {
                response = await api.get(
                    `/user/username/${data.emailOrUsername}`,
                );
            }

            const notFound = response.data.available;

            if (notFound) {
                setError("emailOrUsername", {
                    type: "manual",
                    message:
                        "Não encontramos um usuário com essas credenciais.",
                });

                return;
            }

            router.push(
                // @ts-expect-error
                "/(auth)/password?emailOrUsername=" + data.emailOrUsername,
            );
        } catch (error: any) {
            console.error("Erro durante o login:", error);

            setError("emailOrUsername", {
                type: "manual",
                message: "Não encontramos um usuário com essas credenciais.",
            });
        }
    };

    const HandleGoogleSignIn = async () => {
        await googleSignIn();
    };

    const isAuthenticated = !!user && !loading && !isSigningOut;

    if (isAuthenticated) {
        return <Redirect href="/(tabs)/explore" />;
    }

    if (googleUser) {
        return <Redirect href="/(auth)/signup" />;
    }

    return (
        <BaseContainer px="$6" py="$6">
            <ScrollView>
                <VStack gap="$5" pt="$8" flex={1}>
                    <Box>
                        <DimberLogo width={60} height={40} />
                    </Box>
                    <Text
                        fontFamily="$heading"
                        size="2xl"
                        fontWeight="$bold"
                        color="#000"
                        letterSpacing="$lg"
                    >
                        Vamos começar!
                    </Text>
                    <VStack gap="$4">
                        <Text fontWeight="bold">Email ou nome do usuário</Text>
                        <VStack gap="$2">
                            <Controller
                                control={control}
                                name="emailOrUsername"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        variant="outline"
                                        size="lg"
                                        borderRadius={8}
                                        borderColor="$gray400"
                                        isInvalid={!!errors.emailOrUsername}
                                        $invalid-borderColor="$negative"
                                    >
                                        <InputField
                                            placeholder="Seu email ou nome de usuário"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    </Input>
                                )}
                            />
                            {errors.emailOrUsername && (
                                <Text color="$negative">
                                    {errors.emailOrUsername.message}
                                </Text>
                            )}
                        </VStack>
                    </VStack>
                    <Button
                        mt="$4"
                        onPress={handleSubmit(HandleLogin)}
                        isDisabled={
                            watch("emailOrUsername") === "" ||
                            watch("emailOrUsername") == null
                        }
                    >
                        <ButtonText
                            textAlign="center"
                            fontFamily="$heading"
                            size="lg"
                            fontWeight="$bold"
                        >
                            Continuar
                        </ButtonText>
                    </Button>
                    <Link href="/(auth)/signup" asChild>
                        <Text
                            textAlign="center"
                            mt="$2"
                            textDecorationColor="$primaryDefault"
                            textDecorationLine="underline"
                            color="$primaryDefault"
                        >
                            Não possui conta ainda? Crie uma conta
                        </Text>
                    </Link>
                </VStack>
            </ScrollView>
            {!isKeyboardVisible && (
                <VStack gap="$12" pb="$4" pt="$2">
                    <VStack gap="$8">
                        <HStack
                            alignItems="center"
                            gap="$3"
                            justifyContent="center"
                        >
                            <Divider w="45%" bgColor="$gray300" />
                            <Text color="$gray500" size="md" mb="$1">
                                ou
                            </Text>
                            <Divider w="45%" bgColor="$gray300" />
                        </HStack>
                        <VStack gap="$2">
                            <Button
                                bgColor="transparent"
                                borderColor="$black"
                                variant="outline"
                                justifyContent="center"
                                alignItems="center"
                                onPress={HandleGoogleSignIn}
                            >
                                <ButtonIcon>
                                    <GoogleLogo width={20} height={20} />
                                </ButtonIcon>
                                <ButtonText
                                    textAlign="center"
                                    color="$black"
                                    size="md"
                                    fontFamily="$jakartMedium"
                                >
                                    Continuar com o Google
                                </ButtonText>
                            </Button>
                        </VStack>
                    </VStack>
                    <Terms />
                </VStack>
            )}
        </BaseContainer>
    );
};

export default WelcomeScreen;
