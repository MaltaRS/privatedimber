import { useState, useEffect, Fragment } from "react";
import { ScrollView } from "react-native";
import { VStack } from "@/gluestackComponents";
import { useSettings } from "@/hooks/SettingsHook";
import HeaderContainer from "../components/HeaderContainer";
import { ConfigCardSwitch } from "@/components/tabs/config/configCardSwitch";
import { BaseContainer } from "@/components/BaseContainer";
import TitleContainer from "@/components/TitleContainer";
import { SkeletonBox } from "@/components/utils/SkeletonBox";

const Permissions = () => {
    const { settings, updateSettings } = useSettings();
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [localSettings, setLocalSettings] = useState({
        allowResponse: true,
        allowAttachments: {
            file: true,
            photo: true,
            video: true,
        },
    });

    useEffect(() => {
        if (settings) {
            setLocalSettings({
                allowResponse: settings.chatSettings?.allowResponse ?? true,
                allowAttachments: {
                    file: settings.chatSettings?.allowAttachments?.file ?? true,
                    photo:
                        settings.chatSettings?.allowAttachments?.photo ?? true,
                    video:
                        settings.chatSettings?.allowAttachments?.video ?? true,
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
                <VStack
                    bgColor="$white"
                    pl="$4"
                    borderRadius="$xl"
                    elevation={2}
                >
                    <VStack
                        py="$4"
                        pr="$4"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <SkeletonBox width={160} height={24} />
                        <SkeletonBox
                            width={40}
                            height={24}
                            borderRadius="$full"
                        />
                    </VStack>
                </VStack>
            </VStack>

            <VStack gap="$2">
                <SkeletonBox width={200} height={28} />
                <VStack
                    bgColor="$white"
                    pl="$4"
                    borderRadius="$xl"
                    elevation={2}
                >
                    {[1, 2, 3].map((item) => (
                        <VStack
                            key={item}
                            py="$4"
                            pr="$4"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <SkeletonBox width={180} height={24} />
                            <SkeletonBox
                                width={40}
                                height={24}
                                borderRadius="$full"
                            />
                        </VStack>
                    ))}
                </VStack>
            </VStack>
        </VStack>
    );

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title="Permissões" />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 46 }}
                >
                    <VStack p="$1">
                        {isInitialLoading ? (
                            <LoadingSkeleton />
                        ) : (
                            <Fragment>
                                <TitleContainer name="Direito de resposta" />
                                <ConfigCardSwitch
                                    items={[
                                        {
                                            title: "Conceder resposta",
                                            value: localSettings.allowResponse,
                                            onToggle: (value) =>
                                                handleToggle(
                                                    "allowResponse",
                                                    value,
                                                ),
                                        },
                                    ]}
                                />

                                <TitleContainer name="Anexos" />
                                <ConfigCardSwitch
                                    items={[
                                        {
                                            title: "Permitir arquivo",
                                            value: localSettings
                                                .allowAttachments.file,
                                            onToggle: (value) =>
                                                handleToggle("file", value),
                                        },
                                        {
                                            title: "Permitir foto",
                                            value: localSettings
                                                .allowAttachments.photo,
                                            onToggle: (value) =>
                                                handleToggle("photo", value),
                                        },
                                        {
                                            title: "Permitir vídeo",
                                            value: localSettings
                                                .allowAttachments.video,
                                            onToggle: (value) =>
                                                handleToggle("video", value),
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
