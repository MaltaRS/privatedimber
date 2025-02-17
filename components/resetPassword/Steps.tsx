import React, {
    memo,
    Dispatch,
    SetStateAction,
    useState,
    useEffect,
} from "react";

import {
    Heading,
    InputField,
    InputIcon,
    InputSlot,
    Text,
    VStack,
} from "@/gluestackComponents";

import { useMutation } from "@tanstack/react-query";

import { Eye, EyeOff } from "lucide-react-native";

import { useFormContext, Controller } from "react-hook-form";

import OTPCodeInput from "@/components/signup/OtpCodeInput";

import { Input } from "../ui/Input";

import { VerifyOtpCode } from "@/connection/auth/resetPasswordConnection";

export const StepEmailOrUsername = memo(() => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <Heading size="xl">Recuperação de senha</Heading>
            <Text fontFamily="$arialBody" lineHeight="$md" mb="$3">
                Informe seu email ou nome de usuário cadastrado para recuperar o
                acesso à sua conta.
            </Text>
            <Controller
                control={control}
                name="emailOrUsername"
                render={({
                    field: { onBlur, onChange, ref, value, disabled },
                }) => (
                    <Input
                        size="lg"
                        isDisabled={disabled}
                        isInvalid={!!errors.emailOrUsername?.message}
                        $invalid-borderColor="$negative"
                    >
                        <InputField
                            placeholder="Email ou nome de usuário"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                            keyboardType="email-address"
                        />
                    </Input>
                )}
            />
            {errors.emailOrUsername?.message &&
                typeof errors.emailOrUsername.message === "string" && (
                    <Text color="$negative" fontSize="$md" mt="-$2">
                        {errors.emailOrUsername.message}
                    </Text>
                )}
        </>
    );
});

StepEmailOrUsername.displayName = "StepEmail";

export const StepEmailCode = memo(
    ({
        setGlobalError,
        handleChangeStep,
        userEmail,
    }: {
        setGlobalError?: Dispatch<SetStateAction<boolean>>;
        handleChangeStep?: () => void;
        userEmail?: string;
    }) => {
        const { watch } = useFormContext();

        const [disabled, setDisabled] = useState(false);
        const [code, setCode] = useState("");
        const [error, setError] = useState("");
        const [success, setSuccess] = useState(false);

        const { mutateAsync: verifyOtpCode } = useMutation({
            mutationFn: VerifyOtpCode,
        });

        useEffect(() => {
            if (setGlobalError) {
                setGlobalError(true);
            }
        }, []);

        const handleChangeCode = (code: string) => {
            setCode(code);
            if (code.length === 6) {
                checkOtpCode(code);
            }
        };

        const checkOtpCode = async (code: string) => {
            setDisabled(true);

            try {
                const response = await verifyOtpCode({
                    email: userEmail ?? "",
                    code,
                });

                if (response.success) {
                    if (setGlobalError) setGlobalError(false);
                    setError("");
                    setSuccess(true);

                    handleChangeStep?.();
                } else {
                    setError(
                        response.message ??
                            "Erro ao verificar, tente novamente!",
                    );
                    setDisabled(false);
                }
            } catch (error: any) {
                console.error(error.request?._response);
                console.error("Erro ao verificar código: ", error);
                setError("Erro ao verificar código, tente novamente!");
                setDisabled(false);
            }
        };

        return (
            <>
                <Heading size="xl">Confirme sua conta</Heading>
                <Text fontFamily="$arialBody" lineHeight="$md" mb="$3">
                    Enviamos um código de 6 digitos para o email {userEmail}.
                    Verifique sua caixa de entrada.
                </Text>
                <OTPCodeInput
                    code={code}
                    setCode={handleChangeCode}
                    numDigits={6}
                    disabled={disabled}
                />
                {success && (
                    <Text color="$positive" fontSize="$md" mt="$2">
                        Código verificado com sucesso!
                    </Text>
                )}
                {error && (
                    <Text color="$negative" fontSize="$md" mt="$2">
                        {error}
                    </Text>
                )}
            </>
        );
    },
);

StepEmailCode.displayName = "StepEmailCode";

export const StepPassword = memo(
    ({
        setGlobalError,
    }: {
        setGlobalError?: Dispatch<SetStateAction<boolean>>;
    }) => {
        const {
            control,
            formState: { errors },
        } = useFormContext();

        useEffect(() => {
            setGlobalError?.(true);
        });

        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);

        const PasswordShowIcon = showPassword ? EyeOff : Eye;
        const ConfirmPasswordShowIcon = showConfirmPassword ? EyeOff : Eye;

        return (
            <>
                <Heading size="xl">Crie uma senha</Heading>
                <Text fontFamily="$arialBody" lineHeight="$md" mb="$3">
                    Escolha uma senha forte com pelo menos 6 caracteres,
                    incluindo números e letras.
                </Text>
                <VStack gap="$4">
                    <Controller
                        control={control}
                        name="password"
                        render={({
                            field: { onBlur, onChange, ref, value },
                        }) => (
                            <Input
                                variant="underlined"
                                size="lg"
                                isInvalid={!!errors.password}
                                $invalid-borderColor="$negative"
                            >
                                <InputField
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Sua senha"
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
                    <Controller
                        control={control}
                        name="confirm_password"
                        render={({
                            field: { onBlur, onChange, ref, value },
                        }) => (
                            <Input
                                variant="underlined"
                                size="lg"
                                isInvalid={!!errors.confirm_password}
                                $invalid-borderColor="$negative"
                            >
                                <InputField
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Digite novamente sua senha"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <InputSlot
                                    pr="$3"
                                    onPress={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                >
                                    <InputIcon>
                                        <ConfirmPasswordShowIcon
                                            size={20}
                                            color="black"
                                        />
                                    </InputIcon>
                                </InputSlot>
                            </Input>
                        )}
                    />
                    {errors.confirm_password?.message &&
                        typeof errors.confirm_password.message === "string" && (
                            <Text color="$negative" fontSize="$md" mt="-$2">
                                {errors.confirm_password.message}
                            </Text>
                        )}
                </VStack>
            </>
        );
    },
);

StepPassword.displayName = "StepPassword";
