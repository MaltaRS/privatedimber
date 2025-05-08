import { useState, useEffect, Fragment } from "react";
import { VStack, HStack, Text } from "@/gluestackComponents";
import HeaderContainer from "@/components/HeaderContainer";
import { ConfigCardSwitch } from "@/components/tabs/config/configCardSwitch";
import { BaseContainer } from "@/components/BaseContainer";
import { useSettings } from "@/hooks/SettingsHook";
import { SkeletonBox } from "@/components/utils/SkeletonBox";
import { useTranslation } from "react-i18next";

const ConfigNotifications = () => {
    const { t } = useTranslation();
    const { settings, updateSettings } = useSettings();
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [localSettings, setLocalSettings] = useState({
        messageNotifications: true,
        paymentNotifications: true,
        supportNotifications: true,
        messageSolicitationNotifications: true,
    });

    useEffect(() => {
        if (settings) {
            setLocalSettings({
                messageNotifications:
                    settings.customSettings?.notifications?.messages ?? true,
                paymentNotifications:
                    settings.customSettings?.notifications?.payments ?? true,
                supportNotifications:
                    settings.customSettings?.notifications?.support ?? true,
                messageSolicitationNotifications:
                    settings.customSettings?.notifications
                        ?.messageSolicitation ?? true,
            });
            setIsInitialLoading(false);
        }
    }, [settings]);

    const handleToggle = async (key: string, value: boolean) => {
        const newSettings = { ...localSettings, [key]: value };
        setLocalSettings(newSettings);

        const updatePayload = {
            customSettings: {
                ...settings?.customSettings,
                notifications: {
                    ...settings?.customSettings?.notifications,
                    messages: newSettings.messageNotifications,
                    payments: newSettings.paymentNotifications,
                    support: newSettings.supportNotifications,
                    messageSolicitation:
                        newSettings.messageSolicitationNotifications,
                },
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
                    <HStack
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
                    </HStack>
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
                        <Fragment key={item}>
                            <HStack
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
                            </HStack>
                        </Fragment>
                    ))}
                </VStack>
            </VStack>
        </VStack>
    );

    return (
        <BaseContainer backgroundColor="$white">
            <VStack>
                <HeaderContainer title={t("notifications.title")} />

                <VStack px="$1" gap="$6" mt="$4">
                    {isInitialLoading ? (
                        <LoadingSkeleton />
                    ) : (
                        <Fragment>
                            <VStack gap="$2">
                                <Text
                                    color="$gray800"
                                    fontSize={20}
                                    fontFamily="$heading"
                                >
                                    {t("notifications.sectionMessages")}
                                </Text>
                                <ConfigCardSwitch
                                    items={[
                                        {
                                            title: t("notifications.showNotifications"),
                                            value: localSettings.messageNotifications,
                                            onToggle: (value) =>
                                                handleToggle(
                                                    "messageNotifications",
                                                    value,
                                                ),
                                        },
                                    ]}
                                />
                            </VStack>

                            <VStack gap="$2">
                                <Text
                                    color="$gray800"
                                    fontSize={20}
                                    fontFamily="$heading"
                                >
                                    {t("notifications.sectionEmail")}
                                </Text>
                                <ConfigCardSwitch
                                    items={[
                                        {
                                            title: t("notifications.solicitation"),
                                            value: localSettings.messageSolicitationNotifications,
                                            onToggle: (value) =>
                                                handleToggle(
                                                    "messageSolicitationNotifications",
                                                    value,
                                                ),
                                        },
                                        {
                                            title: t("notifications.payments"),
                                            value: localSettings.paymentNotifications,
                                            onToggle: (value) =>
                                                handleToggle(
                                                    "paymentNotifications",
                                                    value,
                                                ),
                                        },
                                        {
                                            title: t("notifications.support"),
                                            value: localSettings.supportNotifications,
                                            onToggle: (value) =>
                                                handleToggle(
                                                    "supportNotifications",
                                                    value,
                                                ),
                                        },
                                    ]}
                                />
                            </VStack>
                        </Fragment>
                    )}
                </VStack>
            </VStack>
        </BaseContainer>
    );
};

export default ConfigNotifications;
