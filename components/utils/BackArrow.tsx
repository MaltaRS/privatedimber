import React, { useState, Dispatch, SetStateAction } from "react";

import { useRouter } from "expo-router";

import { Pressable } from "@/gluestackComponents";

import { useMutation } from "@tanstack/react-query";

import { ArrowLeft } from "lucide-react-native";

import { CancelPendingUser } from "@/connection/auth/PendingUserConnection";

import { useGoogleAuth } from "@/Context/GoogleAuthProvider";

import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

import { SecureStoreUnencrypted } from "@/utils/SecureStorage";

type BackLeftProps = {
    step?: number;
    setSteps?: Dispatch<SetStateAction<{ steps: any[]; activeStep: number }>>;
    email?: string | null;
};

export const BackLeft = ({ step, setSteps, email }: BackLeftProps) => {
    const router = useRouter();
    const { user: googleUser, signOut } = useGoogleAuth();

    const { mutateAsync: cancelEmailValidation } = useMutation({
        mutationFn: CancelPendingUser,
    });

    const [showConfirmation, setShowConfirmation] = useState(false);

    const verifiedEmail = !!email;

    const verifyIfShouldGoBack = () => {
        if (verifiedEmail && (step === 2 || step === 1) && setSteps) {
            setShowConfirmation(true);
            return;
        }
        HandleGoBack();
    };

    const HandleGoBack = async () => {
        const cancelEmailValidated =
            verifiedEmail && (step === 2 || step === 1) && setSteps;
        const shouldSignOut = verifiedEmail && step === 2 && setSteps;

        if (cancelEmailValidated && !googleUser) {
            await cancelEmailValidation(email);
        }

        if (shouldSignOut && !googleUser) {
            SecureStoreUnencrypted.deleteItem("verified_email");
            setSteps((prev) => ({
                steps: prev.steps.map((s, index) => ({
                    ...s,
                    active: index === 0,
                })),
                activeStep: 0,
            }));
            return;
        } else if (shouldSignOut && googleUser) {
            await signOut();
            // @ts-expect-error
            router.replace("(auth)/");
            return;
        }

        if (step && setSteps) {
            if (step === 0) {
                router.back();
            }
            setSteps((prev) => ({
                steps: prev.steps.map((s, index) => ({
                    ...s,
                    active: index === step - 1,
                })),
                activeStep: step - 1,
            }));
            return;
        }

        router.back();
    };

    return (
        <>
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
            </Pressable>
            <ConfirmationModal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={() => {
                    HandleGoBack();
                    setShowConfirmation(false);
                }}
                title="Deseja realmente voltar?"
                message={
                    !!googleUser
                        ? "Você realmente deseja sair da sua conta Google?"
                        : "Você realmente deseja alterar o email?"
                }
            />
        </>
    );
};
