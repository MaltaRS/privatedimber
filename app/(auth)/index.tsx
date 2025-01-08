import { useState } from "react";

import { Link, Redirect, useRouter } from "expo-router";

import { Controller, useForm } from "react-hook-form";

import { Eye, EyeOff } from "lucide-react-native";

import {
    Box,
    ButtonIcon,
    ButtonText,
    Input,
    InputField,
    InputIcon,
    InputSlot,
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
    password: z
        .string({ message: "A senha é obrigatória." })
        .min(6, "A senha deve ter pelo menos 6 caracteres."),
});
type LoginData = z.infer<typeof loginSchema>;

const WelcomeScreen = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const { user: googleUser, signIn: googleSignIn } = useGoogleAuth();

    const { user, isSigningOut, loading, signIn } = useAuth();

    const [showPasswordField, setShowPasswordField] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const isKeyboardVisible = useKeyboardVisibility();
    const router = useRouter();

    const PasswordShowIcon = showPassword ? EyeOff : Eye;

    const HandleLogin = async (data: LoginData) => {
        try {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                data.emailOrUsername,
            );

            const response = await api.post("/auth/token", {
                ...(isEmail
                    ? { email: data.emailOrUsername }
                    : { username: data.emailOrUsername }),
                password: data.password,
            });

            const { access_token, refresh_token } = response.data;

            await signIn(access_token, refresh_token);

            router.push("/(tabs)/explore");
        } catch (error: any) {
            console.error("Erro durante o login:", error);

            setError("emailOrUsername", {
                type: "manual",
                message: "Credenciais inválidas. Tente novamente.",
            });
            setError("password", {
                type: "manual",
                message: "Credenciais inválidas. Tente novamente.",
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
                        Bem vindo ao dimber!
                    </Text>
                    <VStack gap="$4">
                        <Text fontWeight="bold">Email ou nome do usuário</Text>
                        <VStack gap="$2">
                            <Controller
                                control={control}
                                name="emailOrUsername"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        variant="underlined"
                                        size="lg"
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
                    {showPasswordField && (
                        <VStack gap="$4">
                            <Text fontWeight="bold">Senha</Text>
                            <VStack gap="$2">
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Input
                                            variant="underlined"
                                            size="lg"
                                            isInvalid={!!errors.password}
                                            $invalid-borderColor="$negative"
                                        >
                                            <InputField
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Sua senha"
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                            <InputSlot
                                                pr="$3"
                                                onPress={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
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
                                {errors.password && (
                                    <Text color="$negative">
                                        {errors.password.message}
                                    </Text>
                                )}
                            </VStack>
                        </VStack>
                    )}
                    <Button
                        mt="$4"
                        onPress={() => {
                            if (!showPasswordField) {
                                setShowPasswordField(true);
                            } else {
                                handleSubmit(HandleLogin)();
                            }
                        }}
                    >
                        <ButtonText textAlign="center" size="md">
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
                <VStack gap="$12" pb="$6" pt="$2">
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
                    <Terms />
                </VStack>
            )}
        </BaseContainer>
    );
};
export default WelcomeScreen;
