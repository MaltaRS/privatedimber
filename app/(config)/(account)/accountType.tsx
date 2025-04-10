import { useState, useEffect, Fragment } from "react";

import {
    VStack,
    ScrollView,
    Text,
    ButtonText,
    HStack,
    Spinner,
} from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";
import { SkeletonBox } from "@/components/utils/SkeletonBox";
import { AccountTypeCard } from "@/components/config/AccountTypeCard";

import UserProfessional from "@/assets/icons/appIcons/userProfessional.svg";
import Globe from "@/assets/icons/appIcons/globe.svg";

import { useAuth } from "@/Context/AuthProvider";
import { toast } from "burnt";

import { updateUserAccountType } from "@/connection/auth/UserConnection";
import { Button } from "@/components/ui/Button";
import { useQueryClient } from "@tanstack/react-query";

const AccountType = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [isSaving, setIsSaving] = useState(false);
    const [selectedAccountType, setSelectedAccountType] = useState<
        "REGULAR" | "PROFESSIONAL" | null
    >(null);

    useEffect(() => {
        if (user) {
            setSelectedAccountType(user.type);
        }
    }, [user]);

    const handleSelectAccountType = (type: "REGULAR" | "PROFESSIONAL") => {
        setSelectedAccountType(type);
    };

    const handleSave = async () => {
        if (!selectedAccountType || !user) return;

        setIsSaving(true);
        try {
            const success = await updateUserAccountType(selectedAccountType);

            if (success) {
                queryClient.setQueryData(
                    ["authenticatedUser"],
                    (oldData: any) => ({
                        ...oldData,
                        type: selectedAccountType,
                    }),
                );

                toast({
                    title: "Tipo de conta atualizado",
                    message: "Seu tipo de conta foi atualizado com sucesso.",
                    haptic: "success",
                });
            } else {
                throw new Error("Falha ao atualizar tipo de conta");
            }
        } catch (error) {
            console.error("Erro ao atualizar tipo de conta:", error);
            toast({
                title: "Erro",
                message:
                    "Não foi possível atualizar seu tipo de conta. Tente novamente.",
                haptic: "error",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const LoadingSkeleton = () => (
        <VStack gap="$6">
            <SkeletonBox width={220} height={28} />
            <VStack gap="$4">
                {[1, 2].map((item) => (
                    <Fragment key={item}>
                        <VStack borderWidth={1} borderRadius="$lg" p="$4">
                            <HStack alignItems="center" gap="$4">
                                <SkeletonBox
                                    width={29}
                                    height={29}
                                    borderRadius={4}
                                />
                                <SkeletonBox
                                    width={180}
                                    height={22}
                                    borderRadius={4}
                                />
                            </HStack>
                            <HStack
                                mt="$3"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <SkeletonBox
                                    width={250}
                                    height={18}
                                    borderRadius={4}
                                />
                                <SkeletonBox
                                    width={20}
                                    height={20}
                                    borderRadius="$full"
                                />
                            </HStack>
                        </VStack>
                    </Fragment>
                ))}
            </VStack>
        </VStack>
    );

    return (
        <BaseContainer>
            <VStack flex={1}>
                <HeaderContainer title="Tipo de conta" />
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <VStack mt="$6" px="$1">
                        <Text fontSize={18} color="$gray800">
                            Defina o perfil ideal para a sua experiência no
                            Dimber
                        </Text>

                        {selectedAccountType == null ? (
                            <LoadingSkeleton />
                        ) : (
                            <Fragment>
                                <VStack gap="$4" mt="$6">
                                    <AccountTypeCard
                                        title="Conta Profissional"
                                        description="Seu perfil será exibido na página de exploração, permitindo receber mensagens pagas."
                                        icon={UserProfessional}
                                        isSelected={
                                            selectedAccountType ===
                                            "PROFESSIONAL"
                                        }
                                        onSelect={() =>
                                            handleSelectAccountType(
                                                "PROFESSIONAL",
                                            )
                                        }
                                    />

                                    <AccountTypeCard
                                        title="Conta Comum"
                                        description="Seu perfil será privado e não estará visível para receber mensagens pagas."
                                        icon={Globe}
                                        isSelected={
                                            selectedAccountType === "REGULAR"
                                        }
                                        onSelect={() =>
                                            handleSelectAccountType("REGULAR")
                                        }
                                    />
                                </VStack>
                            </Fragment>
                        )}
                    </VStack>
                </ScrollView>

                <Button
                    size="xl"
                    mb="$4"
                    variant="solid"
                    action="primary"
                    isDisabled={
                        isSaving ||
                        !selectedAccountType ||
                        selectedAccountType === user?.type
                    }
                    onPress={handleSave}
                >
                    {isSaving ? (
                        <HStack space="sm" alignItems="center">
                            <Spinner color="white" />
                            <ButtonText>Salvando...</ButtonText>
                        </HStack>
                    ) : (
                        <ButtonText textAlign="center">Salvar</ButtonText>
                    )}
                </Button>
            </VStack>
        </BaseContainer>
    );
};

export default AccountType;
