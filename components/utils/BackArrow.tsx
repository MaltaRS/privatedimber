import React, { Dispatch, SetStateAction, useState } from "react";

import { Step } from "@/app/(auth)/signup";
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    Button,
    ButtonGroup,
    ButtonText,
    Pressable,
    Text,
} from "@/gluestackComponents";

import { useRouter } from "expo-router";

import { SecureStoreUnencrypted } from "@/utils/SecureStorage";
import { useGoogleAuth } from "@/Context/GoogleAuthProvider";
import { ArrowLeft, X } from "lucide-react-native";

type BackLeftProps = {
    step?: number;
    setSteps?: Dispatch<SetStateAction<{ steps: Step[]; activeStep: number }>>;
    verifiedEmail?: boolean;
};

export const BackLeft = ({ step, setSteps, verifiedEmail }: BackLeftProps) => {
    const router = useRouter();
    const { user: googleUser, signOut } = useGoogleAuth();

    const [showConfirmation, setShowConfirmation] = useState(false);

    const verifyIfShouldGoBack = () => {
        if (verifiedEmail && step === 2 && setSteps) {
            setShowConfirmation(true);
            return;
        }

        HandleGoBack();
    };

    const HandleGoBack = async () => {
        const shouldSignOut = verifiedEmail && step === 2 && setSteps;

        if (shouldSignOut && !googleUser) {
            SecureStoreUnencrypted.deleteItem("verified_email");
            setSteps((prev) => {
                return {
                    steps: prev.steps.map((s, index) => {
                        return {
                            ...s,
                            active: index === 0,
                        };
                    }),
                    activeStep: 0,
                };
            });
            return;
        } else if (shouldSignOut && googleUser) {
            await signOut();

            // @ts-ignore
            router.replace("(auth)/");

            return;
        }

        if (step && setSteps) {
            if (step === 0) {
                router.back();
            }
            setSteps((prev) => {
                return {
                    steps: prev.steps.map((s, index) => {
                        return {
                            ...s,
                            active: index === step - 1,
                        };
                    }),
                    activeStep: step - 1,
                };
            });
            return;
        }

        router.back();
    };

    return (
        <Pressable
            p="$3"
            alignItems="center"
            justifyContent="center"
            rounded="$full"
            w="$12"
            bgColor="$gray200"
            onPress={verifyIfShouldGoBack}
        >
            <ArrowLeft size={20} color="black" />
            {showConfirmation && (
                <AlertDialog
                    isOpen={showConfirmation}
                    onClose={() => setShowConfirmation(false)}
                >
                    <AlertDialogBackdrop backgroundColor="#000" />
                    <AlertDialogContent bgColor="$gray100">
                        <AlertDialogHeader alignItems="center">
                            <Text
                                textAlign="center"
                                fontSize="$lg"
                                fontWeight="bold"
                            >
                                Deseja realmente voltar?
                            </Text>
                            <AlertDialogCloseButton>
                                <X size={20} />
                            </AlertDialogCloseButton>
                        </AlertDialogHeader>
                        <AlertDialogBody mb="$2">
                            <Text textAlign="center">
                                {!!googleUser
                                    ? "Você realmente deseja sair da sua conta Google?"
                                    : "Você realmente deseja alterar o email?"}
                            </Text>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <ButtonGroup gap="$4">
                                <Button
                                    flex={1}
                                    action="negative"
                                    onPress={() => {
                                        setShowConfirmation(false);
                                    }}
                                >
                                    <ButtonText textAlign="center">
                                        Cancelar
                                    </ButtonText>
                                </Button>
                                <Button
                                    flex={1}
                                    bg="$primaryDefault"
                                    action="negative"
                                    onPress={() => {
                                        HandleGoBack();
                                        setShowConfirmation(false);
                                    }}
                                >
                                    <ButtonText textAlign="center">
                                        Sim
                                    </ButtonText>
                                </Button>
                            </ButtonGroup>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </Pressable>
    );
};
