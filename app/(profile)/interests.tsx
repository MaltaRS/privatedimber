import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

import {
    VStack,
    Text,
    ScrollView,
    Pressable,
    HStack,
    Box,
} from "@/gluestackComponents";

import { useAuth } from "@/Context/AuthProvider";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfile } from "@/connection/auth/UserConnection";
import { BaseContainer } from "@/components/BaseContainer";

import HeaderContainer from "@/components/HeaderContainer";

import { toast } from "burnt";

const interests = [
    "Finanças e Economia",
    "Esportes",
    "Arte e Cultura",
    "Viagens",
    "Beleza",
    "Saúde e Bem estar",
    "Tecnologia",
    "Advocacia",
    "Religião",
    "Entretenimento",
    "Arte e cultura",
];

const InterestsScreen = () => {
    const router = useRouter();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [selectedInterests, setSelectedInterests] = useState<string[]>(
        user?.interests || [],
    );

    const { mutate: updateUserProfile, isPending } = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authenticatedUser"] });
            router.back();

            toast({
                title: "Interesses atualizados com sucesso",
                duration: 3000,
            });
        },
    });

    const handleSave = () => {
        if (selectedInterests.length < 3) {
            Alert.alert(
                "Selecione mais interesses",
                "Você precisa selecionar pelo menos 3 interesses para continuar.",
            );
            return;
        }
        updateUserProfile({
            interests: selectedInterests,
        });
    };

    const toggleInterest = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest],
        );
    };

    return (
        <BaseContainer>
            <VStack flex={1}>
                <HeaderContainer
                    title="Interesses"
                    namebuttontab="Salvar"
                    onSave={handleSave}
                    isLoading={isPending}
                />

                <Text fontSize={18} color="$gray900" mt="$5" mb="$8">
                    Selecione pelo menos 3 categorias para personalizarmos sua
                    experiência.
                </Text>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    <HStack
                        flexWrap="wrap"
                        gap="$3"
                        justifyContent="space-between"
                    >
                        {interests.map((interest) => (
                            <Pressable
                                key={interest}
                                onPress={() => toggleInterest(interest)}
                                width="48%"
                                height="$24"
                            >
                                <Box
                                    flex={1}
                                    py="$3"
                                    px="$3"
                                    borderWidth={2}
                                    borderColor={
                                        selectedInterests.includes(interest)
                                            ? "$primaryDefault"
                                            : "$gray400"
                                    }
                                    borderRadius="$xl"
                                    justifyContent="flex-end"
                                >
                                    <Text
                                        fontSize={19}
                                        color={
                                            selectedInterests.includes(interest)
                                                ? "$primaryDefault"
                                                : "$gray600"
                                        }
                                        textAlign="left"
                                    >
                                        {interest}
                                    </Text>
                                </Box>
                            </Pressable>
                        ))}
                    </HStack>
                </ScrollView>
            </VStack>
        </BaseContainer>
    );
};

export default InterestsScreen;
