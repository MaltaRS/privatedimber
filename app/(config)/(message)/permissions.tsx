import { useState, useEffect, Fragment } from "react";
import { ScrollView } from "react-native";
import { HStack, VStack } from "@/gluestackComponents";

import { useSettings } from "@/hooks/SettingsHook";
import { ConfigCardSwitch } from "@/components/tabs/config/configCardSwitch";
import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";
import { SkeletonBox } from "@/components/utils/SkeletonBox";
import TitleContainer from "@/components/TitleContainer";
import { useTranslation } from "react-i18next";

const Permissions = () => {
    const { t } = useTranslation();
    const { settings, updateSettings } = useSettings();
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [localSettings, setLocalSettings] = useState({
        allowResponse: true,
        allowAttachments: {
            files: true,
            images: true,
            videos: true,
        },
    });

    useEffect(() => {
        if (settings) {
            setLocalSettings({
                allowResponse: settings.chatSettings?.allowResponse ?? true,
                allowAttachments: {
                    files: settings.chatSettings?.allowAttachments?.files ?? true,
                    images: settings.chatSettings?.allowAttachments?.images ?? true,
                    videos: settings.chatSettings?.allowAttachments?.videos ?? true,
                },
            });
            setIsInitialLoading(false);
        }
    }, [settings]);

    const handleToggle = async (key: string, value: boolean) => {
        const newSettings = { ...localSettings };

        if (key === "allowResponse") {
            newSettings.allowResponse = value;
        } else {
            newSettings.allowAttachments[
                key as keyof typeof newSettings.allowAttachments
            ] = value;
        }

        setLocalSettings(newSettings);

        const updatePayload = {
            chatSettings: {
                ...settings?.chatSettings,
                allowResponse: newSettings.allowResponse,
                allowAttachments: newSettings.allowAttachments,
            },
        };

        await updateSettings(updatePayload);
    };

    const LoadingSkeleton = () => (
        <VStack gap="$6">
            <VStack gap="$2">
                <SkeletonBox width={220} height={28} />
                <VStack bgColor="$white" pl="$4" borderRadius="$xl" elevation={2}>
                    <HStack py="$4" pr="$4" alignItems="center" justifyContent="space-between">
                        <SkeletonBox width={160} height={24} />
                        <SkeletonBox width={40} height={24} borderRadius="$full" />
                    </HStack>
                </VStack>
            </VStack>

            <VStack gap="$2">
                <SkeletonBox width={200} height={28} />
                <VStack bgColor="$white" pl="$4" borderRadius="$xl" elevation={2}>
                    {[1, 2, 3].map((item) => (
                        <HStack
                            key={item}
                            py="$4"
                            pr="$4"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <SkeletonBox width={160} height={24} />
                            <SkeletonBox width={40} height={24} borderRadius="$full" />
                        </HStack>
                    ))}
                </VStack>
            </VStack>
        </VStack>
    );

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title={t("permissions.title")} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 46 }}
                >
                    <VStack p="$1">
                        {isInitialLoading ? (
                            <LoadingSkeleton />
                        ) : (
                            <Fragment>
                                <TitleContainer name={t("permissions.responseTitle")} />
                                <ConfigCardSwitch
                                    items={[
                                        {
                                            title: t("permissions.allowResponse"),
                                            value: localSettings.allowResponse,
                                            onToggle: (value) =>
                                                handleToggle("allowResponse", value),
                                        },
                                    ]}
                                />

                                <TitleContainer name={t("permissions.attachmentsTitle")} />
                                <ConfigCardSwitch
                                    items={[
                                        {
                                            title: t("permissions.allowFiles"),
                                            value: localSettings.allowAttachments.files,
                                            onToggle: (value) =>
                                                handleToggle("files", value),
                                        },
                                        {
                                            title: t("permissions.allowImages"),
                                            value: localSettings.allowAttachments.images,
                                            onToggle: (value) =>
                                                handleToggle("images", value),
                                        },
                                        {
                                            title: t("permissions.allowVideos"),
                                            value: localSettings.allowAttachments.videos,
                                            onToggle: (value) =>
                                                handleToggle("videos", value),
                                        },
                                    ]}
                                />
                            </Fragment>
                        )}
                    </VStack>
                </ScrollView>
            </VStack>
        </BaseContainer>
    );
};

export default Permissions;
