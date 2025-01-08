import React, {
    Dispatch,
    memo,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from "react";

import { Controller, useFormContext } from "react-hook-form";

import { CheckCircle, XCircle, Eye, EyeOff } from "lucide-react-native";

import {
    Pressable,
    Text,
    Heading,
    Divider,
    Input,
    InputField,
    ScrollView,
    InputSlot,
    InputIcon,
    VStack,
    AvatarFallbackText,
    Avatar,
    AvatarImage,
    Textarea,
    TextareaInput,
    Spinner,
} from "@/gluestackComponents";

import * as ImagePicker from "expo-image-picker";

import { useMutation } from "@tanstack/react-query";

import { VerifyOtpCode } from "@/connection/auth/PendingUserConnection";

import OTPCodeInput from "./OtpCodeInput";

import api from "@/utils/api";
import { SecureStoreUnencrypted } from "@/utils/SecureStorage";

export const StepEmail = memo(
    ({
        setGlobalLoading,
        setGlobalError,
    }: {
        setGlobalLoading?: Dispatch<SetStateAction<boolean>>;
        setGlobalError?: Dispatch<SetStateAction<boolean>>;
    }) => {
        const {
            control,
            formState: { errors },
            watch,
            setError,
            clearErrors,
        } = useFormContext();

        const [isAvailable, setIsAvailable] = useState<null | boolean>(null);
        const [isLoading, setIsLoading] = useState(false);
        const [lastValueChecked, setLastValueChecked] = useState<string | null>(
            null,
        );

        const email = watch("email");

        const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

        const checkEmail = useMemo(() => {
            return async (email: string) => {
                setLastValueChecked(email);
                setIsLoading(true);
                if (setGlobalLoading) setGlobalLoading(true);

                try {
                    const response = await api.get(`/user/email/${email}`);
                    const isEmailAvailable = response.data.available;

                    if (!isEmailAvailable) {
                        setError("email", {
                            type: "custom",
                            message: "Esse email já está em uso",
                        });
                        if (setGlobalError) setGlobalError(true);
                    } else {
                        clearErrors("email");
                        if (setGlobalError) setGlobalError(false);
                    }

                    setIsAvailable(isEmailAvailable);
                } catch (error: any) {
                    console.error(error.request?._response);
                    console.error("Erro ao verificar email de usuário", error);
                    setIsAvailable(false);
                } finally {
                    setIsLoading(false);
                    if (setGlobalLoading) setGlobalLoading(false);
                }
            };
        }, [setGlobalLoading, setError, clearErrors, setGlobalError]);

        useEffect(() => {
            if (!email) return;

            let delayDebounceFn: NodeJS.Timeout;
            if (emailRegex.test(email) && email !== lastValueChecked) {
                delayDebounceFn = setTimeout(() => {
                    checkEmail(email);
                }, 500);
            }

            return () => clearTimeout(delayDebounceFn);
        }, [email, checkEmail, setError, lastValueChecked, emailRegex]);

        return (
            <>
                <Heading size="xl">Qual o seu email?</Heading>
                <Text fontFamily="$arialBody" lineHeight="$md" mb="$3">
                    Insira seu email para contato. Ninguém terá acesso a essa
                    informação.
                </Text>
                <Controller
                    control={control}
                    name="email"
                    render={({
                        field: { onBlur, onChange, ref, value, disabled },
                    }) => (
                        <Input
                            variant="underlined"
                            size="lg"
                            isDisabled={disabled}
                            isInvalid={
                                !!errors.email ||
                                (lastValueChecked != null && !isAvailable)
                            }
                            $invalid-borderColor="$negative"
                        >
                            <InputField
                                placeholder="Seu email"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                keyboardType="email-address"
                            />
                            <InputSlot pr="$3">
                                <InputIcon>
                                    {isLoading ? (
                                        <Spinner size="small" color="gray" />
                                    ) : isAvailable ? (
                                        <CheckCircle size={20} color="green" />
                                    ) : lastValueChecked != null &&
                                      !isAvailable ? (
                                        <XCircle size={20} color="red" />
                                    ) : null}
                                </InputIcon>
                            </InputSlot>
                        </Input>
                    )}
                />
                {errors.email?.message &&
                    typeof errors.email.message === "string" && (
                        <Text color="$negative" fontSize="$md" mt="-$2">
                            {errors.email.message}
                        </Text>
                    )}
            </>
        );
    },
);

StepEmail.displayName = "StepEmail";

export const StepEmailCode = memo(
    ({
        setGlobalError,
        handleChangeStep,
        revalidateEmail,
    }: {
        setGlobalError?: Dispatch<SetStateAction<boolean>>;
        handleChangeStep?: () => void;
        revalidateEmail?: Dispatch<SetStateAction<boolean>>;
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
                    email: watch("email"),
                    code,
                });

                if (response.success) {
                    if (setGlobalError) setGlobalError(false);
                    setError("");
                    setSuccess(true);

                    SecureStoreUnencrypted.saveItem(
                        "verified_email",
                        watch("email"),
                    );

                    const verifiedEmail =
                        SecureStoreUnencrypted.getItem("verified_email");

                    if (handleChangeStep && revalidateEmail) {
                        console.log("Email verificado: ", verifiedEmail);
                        revalidateEmail(true);
                        handleChangeStep();
                    }
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
                    Enviamos um código de 6 digitos para o email{" "}
                    {watch("email")}. Verifique sua caixa de entrada.
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

export const StepName = memo(() => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <Heading size="xl">Qual o seu nome?</Heading>
            <Text fontFamily="$arialBody" lineHeight="$md" mb="$3">
                Ele ficará visível para que outras pessoas possam encontrar
                você.
            </Text>
            <Controller
                control={control}
                name="name"
                render={({
                    field: { onBlur, onChange, ref, value, disabled },
                }) => (
                    <Input
                        variant="underlined"
                        size="lg"
                        isDisabled={disabled}
                        isInvalid={!!errors.name}
                        $invalid-borderColor="$negative"
                    >
                        <InputField
                            placeholder="Seu nome"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                        />
                    </Input>
                )}
            />
            {errors.name?.message &&
                typeof errors.name.message === "string" && (
                    <Text color="$negative" fontSize="$md" mt="-$2">
                        {errors.name.message}
                    </Text>
                )}
        </>
    );
});

StepName.displayName = "StepName";

export const StepAccountType = memo(() => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <VStack space="lg">
            <Heading size="xl">Qual tipo de conta deseja?</Heading>
            <Text fontFamily="$arialBody" lineHeight="$md" mb="$3">
                Escolha o tipo de conta que deseja usar para se comunicar.
            </Text>
            <ScrollView
                contentContainerStyle={{
                    marginTop: 12,
                }}
            >
                <Controller
                    control={control}
                    name="type"
                    render={({ field: { onChange, value } }) => (
                        <VStack gap="$3">
                            <Pressable onPress={() => onChange("REGULAR")}>
                                <VStack
                                    bg={
                                        value === "REGULAR"
                                            ? "$primaryDefault"
                                            : "transparent"
                                    }
                                    p="$2"
                                    borderRadius="$xl"
                                    gap="$1"
                                >
                                    <Heading
                                        fontWeight="bold"
                                        color={
                                            value === "REGULAR"
                                                ? "$white"
                                                : "$pureBlack"
                                        }
                                    >
                                        Conta usuário
                                    </Heading>
                                    <Text
                                        fontSize="$md"
                                        color={
                                            value === "REGULAR"
                                                ? "$white"
                                                : "$pureBlack"
                                        }
                                    >
                                        Usada apenas para envios de mensagens.
                                    </Text>
                                    <Text
                                        fontSize="$md"
                                        color={
                                            value === "REGULAR"
                                                ? "$white"
                                                : "$pureBlack"
                                        }
                                    >
                                        O seu perfil não aparece na área de
                                        busca para outros usuários.
                                    </Text>
                                </VStack>
                            </Pressable>

                            <Divider bgColor="$primaryDefault" />

                            <Pressable onPress={() => onChange("PROFESSIONAL")}>
                                <VStack
                                    bg={
                                        value === "PROFESSIONAL"
                                            ? "$primaryDefault"
                                            : "transparent"
                                    }
                                    p="$2"
                                    borderRadius="$xl"
                                    gap="$1"
                                >
                                    <Heading
                                        fontWeight="bold"
                                        color={
                                            value === "PROFESSIONAL"
                                                ? "$white"
                                                : "$pureBlack"
                                        }
                                    >
                                        Conta Profissional
                                    </Heading>
                                    <Text
                                        fontSize="$md"
                                        color={
                                            value === "PROFESSIONAL"
                                                ? "$white"
                                                : "$pureBlack"
                                        }
                                    >
                                        Usada para envio e recebimentos de
                                        mensagens pagas.
                                    </Text>
                                    <Text
                                        fontSize="$md"
                                        color={
                                            value === "PROFESSIONAL"
                                                ? "$white"
                                                : "$pureBlack"
                                        }
                                    >
                                        O seu perfil irá aparecer na área de
                                        pesquisa.
                                    </Text>
                                </VStack>
                            </Pressable>
                        </VStack>
                    )}
                />
            </ScrollView>

            {errors.type?.message && (
                <Text color="$negative" fontSize="$md" mt="-$2">
                    {typeof errors.type?.message === "string" &&
                        errors.type.message}
                </Text>
            )}
        </VStack>
    );
});

StepAccountType.displayName = "StepAccountType";

export const StepPassword = memo(() => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const PasswordShowIcon = showPassword ? EyeOff : Eye;
    const ConfirmPasswordShowIcon = showConfirmPassword ? EyeOff : Eye;

    return (
        <>
            <Heading size="xl">Crie uma senha</Heading>
            <Text fontFamily="$arialBody" lineHeight="$md" mb="$3">
                Escolha uma senha forte com pelo menos 6 caracteres, incluindo
                números e letras.
            </Text>
            <VStack gap="$4">
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onBlur, onChange, ref, value } }) => (
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
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <InputIcon>
                                    <PasswordShowIcon size={20} color="black" />
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
                    render={({ field: { onBlur, onChange, ref, value } }) => (
                        <Input
                            variant="underlined"
                            size="lg"
                            isInvalid={!!errors.confirm_password}
                            $invalid-borderColor="$negative"
                        >
                            <InputField
                                type={showConfirmPassword ? "text" : "password"}
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
                                    setShowConfirmPassword(!showConfirmPassword)
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
});

StepPassword.displayName = "StepPassword";

export const StepUsername = memo(
    ({
        setGlobalLoading,
        setGlobalError,
    }: {
        setGlobalLoading?: Dispatch<SetStateAction<boolean>>;
        setGlobalError?: Dispatch<SetStateAction<boolean>>;
    }) => {
        const {
            control,
            formState: { errors },
            watch,
            setError,
            clearErrors,
        } = useFormContext();

        const [isAvailable, setIsAvailable] = useState<null | boolean>(null);
        const [isLoading, setIsLoading] = useState(false);
        const [lastValueChecked, setLastValueChecked] = useState<string | null>(
            null,
        );

        const username = watch("username");

        const checkUsername = useMemo(() => {
            return async (username: string) => {
                setLastValueChecked(username);
                setIsLoading(true);
                if (setGlobalLoading) setGlobalLoading(true);

                try {
                    const response = await api.get(
                        `/user/username/${username}`,
                    );
                    const isUsernameAvailable = response.data.available;

                    if (!isUsernameAvailable) {
                        setError("username", {
                            type: "custom",
                            message: "Nome de usuário já está em uso",
                        });
                        if (setGlobalError) setGlobalError(true);
                    } else {
                        clearErrors("username");
                        if (setGlobalError) setGlobalError(false);
                    }

                    setIsAvailable(isUsernameAvailable);
                } catch (error: any) {
                    console.error(error.request?._response);
                    console.error("Erro ao verificar nome de usuário", error);
                    setIsAvailable(false);
                } finally {
                    setIsLoading(false);
                    if (setGlobalLoading) setGlobalLoading(false);
                }
            };
        }, [setGlobalLoading, setError, clearErrors, setGlobalError]);

        useEffect(() => {
            if (!username) return;

            if (username.length < 3) {
                setError("username", {
                    type: "manual",
                    message: "Nome de usuário deve ter no mínimo 3 caracteres",
                });
                setIsAvailable(false);
                if (setGlobalError) setGlobalError(true);
                return;
            }

            if (!/^[a-z-]+$/.test(username)) {
                setError("username", {
                    type: "manual",
                    message:
                        "O nome de usuário deve conter apenas letras minusculas e hífens",
                });
                setIsAvailable(false);
                if (setGlobalError) setGlobalError(true);
                return;
            }

            if (username.includes(" ")) {
                setError("username", {
                    type: "manual",
                    message: "O nome de usuário não deve conter espaços",
                });
                setIsAvailable(false);
                if (setGlobalError) setGlobalError(true);
                return;
            }

            let delayDebounceFn: NodeJS.Timeout;
            if (username !== lastValueChecked) {
                delayDebounceFn = setTimeout(() => {
                    checkUsername(username);
                }, 500);
            }

            return () => clearTimeout(delayDebounceFn);
        }, [
            username,
            checkUsername,
            setError,
            lastValueChecked,
            setGlobalError,
        ]);

        return (
            <>
                <Heading size="xl">Escolha um nome de usuário</Heading>
                <Text fontFamily="$arialBody" lineHeight="$md" mb="$3">
                    Escolha um nome de usuário que será usado para te
                    identificar.
                </Text>
                <Controller
                    control={control}
                    name="username"
                    render={({
                        field: { onBlur, onChange, ref, value, disabled },
                    }) => (
                        <Input
                            variant="underlined"
                            size="lg"
                            isDisabled={disabled}
                            isInvalid={!!errors.username}
                            $invalid-borderColor="$negative"
                        >
                            <InputField
                                placeholder="Nome de usuário"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                            />
                            <InputSlot pr="$3">
                                <InputIcon>
                                    {isLoading ? (
                                        <Spinner size="small" color="gray" />
                                    ) : isAvailable ? (
                                        <CheckCircle size={20} color="green" />
                                    ) : lastValueChecked != null &&
                                      !isAvailable ? (
                                        <XCircle size={20} color="red" />
                                    ) : null}
                                </InputIcon>
                            </InputSlot>
                        </Input>
                    )}
                />
                {isAvailable && (
                    <Text color="$positive" fontSize="$md" mt="-$2">
                        Nome de usuário disponível
                    </Text>
                )}
                {errors.username?.message &&
                    typeof errors.username.message === "string" && (
                        <Text color="$negative" fontSize="$md" mt="-$2">
                            {errors.username.message}
                        </Text>
                    )}
            </>
        );
    },
);

StepUsername.displayName = "StepUsername";

export const StepBio = memo(
    ({
        previewImage,
        setPreviewImage,
    }: {
        previewImage?: string;
        setPreviewImage?: Dispatch<SetStateAction<string>>;
    }) => {
        const {
            control,
            formState: { errors },
            watch,
            setValue,
        } = useFormContext();

        const selectImage = async () => {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Ops! Precisamos de permissão para acessar suas fotos.");
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images", "livePhotos"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;

                try {
                    const response = await fetch(uri);
                    const blob = await response.blob();
                    const sizeInMB = blob.size / (1024 * 1024);

                    if (sizeInMB > 5) {
                        alert(
                            "A imagem selecionada é muito grande. Escolha uma imagem com até 5MB.",
                        );
                        return;
                    }

                    if (setPreviewImage) setPreviewImage(uri);
                    setValue("icon", uri);
                } catch (error) {
                    alert("Erro ao verificar o tamanho da imagem.");
                    console.error(error);
                }
            }
        };

        return (
            <VStack gap="$4">
                <Text size="2xl">Informações do perfil</Text>
                <VStack
                    alignItems="center"
                    justifyContent="center"
                    mt="$2"
                    gap="$2"
                >
                    <Avatar size="xl">
                        <AvatarFallbackText rounded="$lg">
                            {watch("name")}
                        </AvatarFallbackText>
                        {previewImage !== "" && (
                            <AvatarImage
                                rounded="$full"
                                source={{
                                    uri: previewImage,
                                }}
                                alt={`Foto de perfil de ${watch("name")}`}
                            />
                        )}
                    </Avatar>
                    <Pressable onPress={selectImage}>
                        <Text color="$primaryDefault">Adicionar foto</Text>
                    </Pressable>
                </VStack>
                <VStack gap="$4">
                    <VStack gap="$2">
                        <Text fontWeight="$bold">Bio</Text>
                        <Controller
                            control={control}
                            name="bio"
                            render={({
                                field: {
                                    onBlur,
                                    onChange,
                                    ref,
                                    value,
                                    disabled,
                                },
                            }) => (
                                <Textarea isDisabled={disabled}>
                                    <TextareaInput
                                        placeholder="Escreva uma breve descrição sobre você"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                    />
                                </Textarea>
                            )}
                        />
                        {errors.bio?.message &&
                            typeof errors.bio.message === "string" && (
                                <Text
                                    color="$negative"
                                    fontSize="$md"
                                    textAlign="center"
                                    mt="-$2"
                                >
                                    {errors.bio.message}
                                </Text>
                            )}
                    </VStack>
                    <Text fontWeight="$bold">Links</Text>
                    <Controller
                        control={control}
                        name="links"
                        render={({
                            field: { onBlur, onChange, ref, value, disabled },
                        }) => (
                            <Input
                                variant="underlined"
                                size="lg"
                                isDisabled={disabled}
                            >
                                <InputField
                                    placeholder="Adicione suas redes sociais"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}
                                    multiline
                                />
                            </Input>
                        )}
                    />
                    {errors.links?.message &&
                        typeof errors.links.message === "string" && (
                            <Text
                                color="$negative"
                                fontSize="$md"
                                textAlign="center"
                                mt="-$2"
                            >
                                {errors.links.message}
                            </Text>
                        )}
                </VStack>
            </VStack>
        );
    },
);

StepBio.displayName = "StepBio";
