import { useState } from "react";

import { useRouter } from "expo-router";

import {
    ButtonIcon,
    ButtonText,
    Spinner,
    Text,
    VStack,
} from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import { BackLeft } from "@/components/utils/BackArrow";
import { Button } from "@/components/ui/Button";
import { Terms } from "@/components/Terms";

import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
    StepAccountType,
    StepBio,
    StepEmail,
    StepEmailCode,
    StepName,
    StepPassword,
    StepUsername,
} from "@/components/signup/Steps";

import { Alert, Pressable } from "react-native";

import { storage } from "@/utils/firebaseConfig";
import api from "@/utils/api";

import { z } from "zod";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useAuth } from "@/Context/AuthProvider";

import { useMutation } from "@tanstack/react-query";

import { CreatePendingUser } from "@/connection/auth/PendingUserConnection";

import { toast } from "burnt";

const createPendingFormSchema = z.object({
    email: z
        .string({ required_error: "O email é obrigatório." })
        .email("O email é inválido."),
    code: z
        .string({
            required_error: "O código de verificação é obrigatório.",
        })
        .max(6, "O código deve ter 6 caracteres."),
});

const createUserFormSchema = z
    .object({
        email: z
            .string({ required_error: "O email é obrigatório." })
            .email("O email é inválido."),
        username: z
            .string({
                required_error: "O nome de usuário é obrigatório.",
            })
            .min(3, "O nome de usuário deve ter no mínimo 3 caracteres.")
            .regex(
                /^[a-z-]+$/,
                "O nome de usuário deve conter apenas letras minusculas e hífens.",
            )
            .refine((username) => !username.includes(" "), {
                message: "O nome de usuário não deve conter espaços.",
            }),
        name: z
            .string({ required_error: "O nome é obrigatório." })
            .refine((name) => name.trim().includes(" "), {
                message: "É obrigatório incluir pelo menos o nome e sobrenome.",
            }),
        type: z.enum(["REGULAR", "PROFESSIONAL"]).default("REGULAR"),
        password: z
            .string({ required_error: "O senha é obrigatória." })
            .min(6, "A senha deve ter no mínimo 6 caracteres."),
        confirm_password: z.string({
            required_error: "A confirmação de senha é obrigatória.",
        }),
        bio: z.string().optional(),
        icon: z.string().optional(),
    })
    .transform((data) => {
        return {
            email: data.email.trim(),
            username: data.username.trim(),
            name: data.name.trim(),
            type: data.type,
            password: data.password,
            bio: data.bio?.trim() ?? "",
            icon: data.icon,
        };
    });

type CreateUserForm = z.infer<typeof createUserFormSchema> & {
    confirm_password: string;
};

export type Step = {
    component: JSX.Element;
    active: boolean;
    fields: (keyof CreateUserForm)[];
};

const SignUp = () => {
    const router = useRouter();

    const { mutateAsync: createPendingUser } = useMutation({
        mutationFn: CreatePendingUser,
    });

    const formProps = useForm<CreateUserForm>({
        resolver: zodResolver(createUserFormSchema),
        shouldUnregister: false,
        reValidateMode: "onBlur",
        defaultValues: {
            type: "REGULAR",
        },
    });

    const { handleSubmit, getValues } = formProps;

    const [isGlobalLoading, setIsGlobalLoading] = useState(false);
    const [globalError, setGlobalError] = useState(false);

    const [previewImage, setPreviewImage] = useState("");

    const { signIn } = useAuth();

    const [steps, setSteps] = useState<{ steps: Step[]; activeStep: number }>({
        steps: [
            {
                component: <StepEmail />,
                active: false,
                fields: ["email"],
            },
            {
                component: <StepEmailCode />,
                active: false,
                fields: [],
            },
            {
                component: <StepPassword />,
                active: false,
                fields: ["password"],
            },
            {
                component: <StepName />,
                active: false,
                fields: ["name"],
            },
            {
                component: <StepAccountType />,
                active: false,
                fields: ["type"],
            },
            {
                component: <StepUsername />,
                active: false,
                fields: ["username"],
            },
            {
                component: <StepBio />,
                active: false,
                fields: ["bio", "icon"],
            },
        ],
        activeStep: 0,
    });

    const sendVerificationEmail = async (): Promise<boolean> => {
        setIsGlobalLoading(true);

        const email = getValues("email");

        const codeSended = await createPendingUser(email);

        if (!codeSended) {
            setIsGlobalLoading(false);
            toast({
                title: "Erro",
                message: "Ocorreu um erro ao enviar o código de verificação.",
                duration: 5000,
                haptic: "error",
                from: "top",
                preset: "error",
            });
            return false;
        }

        setIsGlobalLoading(false);

        return true;
    };

    const HandleChangeStep = async () => {
        if (isGlobalLoading || globalError) return;

        const fields = steps.steps[steps.activeStep].fields;

        const isValid = await formProps.trigger(fields);

        if (!isValid) return;

        if (fields.includes("password")) {
            const password = getValues("password");
            const confirm_password = getValues("confirm_password");

            if (password !== confirm_password) {
                formProps.setError("confirm_password", {
                    type: "manual",
                    message: "As senhas não coincidem.",
                });
                return;
            }

            formProps.clearErrors("confirm_password");
        } else if (fields.includes("email")) {
            const success = await sendVerificationEmail();

            if (!success) return;
        }

        const activeStep = steps.activeStep + 1;
        setSteps({
            steps: steps.steps.map((step, index) => ({
                ...step,
                active: index === activeStep,
            })),
            activeStep,
        });
    };

    const uploadImageToFirebase = async (uri: string) => {
        const blob = await new Promise<Blob>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new Error("Erro ao fazer upload da imagem."));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const filename = uri.substring(uri.lastIndexOf("/") + 1);
        const storageRef = ref(storage, `profile_images/${filename}`);

        await uploadBytes(storageRef, blob);

        //@ts-ignore
        blob.close();

        return await getDownloadURL(storageRef);
    };

    const OnSubmit = async (data: CreateUserForm) => {
        setIsGlobalLoading(true);

        try {
            let imageUrl = data.icon;

            if (data.icon) {
                imageUrl = await uploadImageToFirebase(data.icon);
            }

            await api.post("/user", {
                ...data,
                icon: imageUrl,
            });

            const responseToken = await api.post("/auth/token", {
                email: data.email,
                password: data.password,
            });

            const { access_token, refresh_token } = responseToken.data;

            await signIn(access_token, refresh_token);

            router.push("/(tabs)/explore");
        } catch (error: any) {
            console.error(error.request?._response);
            Alert.alert(
                "Erro",
                `Ocorreu um erro ao criar o usuário. erro: ${error}`,
            );
        } finally {
            setIsGlobalLoading(false);
        }
    };

    return (
        <BaseContainer
            justifyContent="space-between"
            pb={
                steps.activeStep === 1 ||
                steps.activeStep === steps.steps.length - 1
                    ? "$6"
                    : "$4"
            }
        >
            <VStack gap="$4">
                <BackLeft step={steps.activeStep} setSteps={setSteps} />
                <VStack gap="$4">
                    <FormProvider {...formProps}>
                        {steps.steps[steps.activeStep].fields.includes(
                            "email",
                        ) ? (
                            <StepEmail
                                setGlobalLoading={setIsGlobalLoading}
                                setGlobalError={setGlobalError}
                            />
                        ) : steps.steps[steps.activeStep].fields.includes(
                              "username",
                          ) ? (
                            <StepUsername
                                setGlobalLoading={setIsGlobalLoading}
                                setGlobalError={setGlobalError}
                            />
                        ) : steps.steps[steps.activeStep].fields.includes(
                              "bio",
                          ) ? (
                            <StepBio
                                setPreviewImage={setPreviewImage}
                                previewImage={previewImage}
                            />
                        ) : steps.steps[steps.activeStep].fields.length ===
                          0 ? (
                            <StepEmailCode setGlobalError={setGlobalError} />
                        ) : (
                            steps.steps[steps.activeStep].component
                        )}
                    </FormProvider>
                </VStack>
            </VStack>
            <VStack
                gap={
                    steps.activeStep === 1 ||
                    steps.activeStep === steps.steps.length - 1
                        ? "$5"
                        : "$3"
                }
            >
                {steps.activeStep === 0 && <Terms />}
                <Button
                    mt="$4"
                    onPress={() => {
                        if (steps.activeStep === steps.steps.length - 1) {
                            handleSubmit(OnSubmit)();
                        } else {
                            HandleChangeStep();
                        }
                    }}
                    isDisabled={isGlobalLoading || globalError}
                >
                    {isGlobalLoading && (
                        <ButtonIcon>
                            <Spinner />
                        </ButtonIcon>
                    )}
                    {!isGlobalLoading && (
                        <ButtonText textAlign="center" size="md">
                            {steps.activeStep === steps.steps.length - 1
                                ? "Finalizar"
                                : "Continuar"}
                        </ButtonText>
                    )}
                </Button>
                {steps.activeStep === 1 && (
                    <Pressable onPress={sendVerificationEmail}>
                        <Text
                            textAlign="center"
                            color="$primaryDefault"
                            textDecorationColor="$primaryDefault"
                            textDecorationLine="underline"
                        >
                            Enviar código novamente
                        </Text>
                    </Pressable>
                )}
                {steps.activeStep === steps.steps.length - 1 &&
                    (isGlobalLoading ? (
                        <Spinner />
                    ) : (
                        <Pressable onPress={handleSubmit(OnSubmit)}>
                            <Text textAlign="center" color="$primaryDefault">
                                Pular
                            </Text>
                        </Pressable>
                    ))}
            </VStack>
        </BaseContainer>
    );
};

export default SignUp;
