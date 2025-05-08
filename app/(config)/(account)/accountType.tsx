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
import { useTranslation } from "react-i18next";

const AccountType = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { t } = useTranslation();

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
                    title: t("accountType.successTitle"),
                    message: t("accountType.successMessage"),
                    haptic: "success",
                });
            } else {
                throw new Error("Failed");
            }
        } catch (error) {
            console.error("Erro ao atualizar tipo de conta:", error);
            toast({
                title: t("accountType.errorTitle"),
                message: t("accountType.errorMessage"),
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
                <HeaderContainer title={t("accountType.title")} />
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <VStack mt="$6" px="$1">
                        <Text fontSize={18} color="$gray800">
                            {t("accountType.subtitle")}
                        </Text>

                        {selectedAccountType == null ? (
                            <LoadingSkeleton />
                        ) : (
                            <Fragment>
                                <VStack gap="$4" mt="$6">
                                    <AccountTypeCard
                                        title={t("accountType.professional.title")}
                                        description={t("accountType.professional.description")}
                                        icon={UserProfessional}
                                        isSelected={
                                            selectedAccountType === "PROFESSIONAL"
                                        }
                                        onSelect={() =>
                                            handleSelectAccountType("PROFESSIONAL")
                                        }
                                    />

                                    <AccountTypeCard
                                        title={t("accountType.regular.title")}
                                        description={t("accountType.regular.description")}
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
                            <ButtonText>{t("accountType.saving")}</ButtonText>
                        </HStack>
                    ) : (
                        <ButtonText textAlign="center">
                            {t("accountType.save")}
                        </ButtonText>
                    )}
                </Button>
            </VStack>
        </BaseContainer>
    );
};

export default AccountType;
