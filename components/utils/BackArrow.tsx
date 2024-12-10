import { Dispatch, SetStateAction } from "react";

import { Step } from "@/app/(auth)/signup";
import { Pressable } from "@/gluestackComponents";

import { useRouter } from "expo-router";

import { ArrowLeft } from "phosphor-react-native";

type BackLeftProps = {
    step?: number;
    setSteps?: Dispatch<SetStateAction<{ steps: Step[]; activeStep: number }>>;
};

export const BackLeft = ({ step, setSteps }: BackLeftProps) => {
    const router = useRouter();

    const HandleGoBack = () => {
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
            onPress={HandleGoBack}
        >
            <ArrowLeft size={20} />
        </Pressable>
    );
};
