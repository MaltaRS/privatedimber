import { useState, useEffect, Fragment } from "react";
import { VStack } from "@/gluestackComponents";

import { useSocket } from "@/Context/SocketProvider";
import { useSettings } from "@/hooks/SettingsHook";

import { ConfigCardSwitch } from "@/components/tabs/config/configCardSwitch";
import { ConfigCard } from "@/components/tabs/config/configCard";
import { SkeletonBox } from "@/components/utils/SkeletonBox";
import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";

import { useTranslation } from "react-i18next";

const PrivacyScreen = () => {
    const { t } = useTranslation();
    const { settings, updateSettings } = useSettings();
    const { socket } = useSocket();

    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [localSettings, setLocalSettings] = useState({
        showOnline: true,
        showLastUpdate: true,
        showStatistics: true,
        vacationMode: false,
    });

    useEffect(() => {
        if (settings) {
            setLocalSettings({
                showOnline: settings.privacySettings?.showOnline ?? true,
                showLastUpdate:
                    settings.privacySettings?.showLastUpdate ?? true,
                showStatistics:
                    settings.privacySettings?.showStatistics ?? true,
                vacationMode: settings.privacySettings?.vacationMode ?? false,
            });
            setIsInitialLoading(false);
        }
    }, [settings]);

    const handleToggle = async (key: string, value: boolean) => {
        const newSettings = { ...localSettings, [key]: value };
        setLocalSettings(newSettings);

        await updateSettings({
            privacySettings: newSettings,
        });

        if (key === "showOnline" && socket) {
            socket.emit("updateOnlineStatus", { showOnlineStatus: value });
        }
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
                    {[1, 2, 3, 4].map((item) => (
                        <Fragment key={item}>
                            <VStack
                                py="$4"
                                pr="$4"
                                alignItems="center"
                                justifyContent="space-between"
                                flexDirection="row"
                            >
                                <SkeletonBox width={180} height={24} />
                                <SkeletonBox
                                    width={40}
                                    height={24}
                                    borderRadius="$full"
                                />
                            </VStack>
                        </Fragment>
                    ))}
                </VStack>
            </VStack>
        </VStack>
    );

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title={t("privacySettings.title")} />

                <VStack p="$1" gap="$6">
                    <ConfigCard
                        items={[
                            {
                                title: t("privacySettings.blocked"),
                                href: "/(config)/(account)/listblockusers",
                            },
                        ]}
                    />

                    {isInitialLoading ? (
                        <LoadingSkeleton />
                    ) : (
                        <ConfigCardSwitch
                            items={[
                                {
                                    title: t("privacySettings.showOnline"),
                                    value: localSettings.showOnline,
                                    onToggle: (value) =>
                                        handleToggle("showOnline", value),
                                },
                                {
                                    title: t("privacySettings.showLastUpdate"),
                                    value: localSettings.showLastUpdate,
                                    onToggle: (value) =>
                                        handleToggle("showLastUpdate", value),
                                },
                                {
                                    title: t("privacySettings.showStatistics"),
                                    value: localSettings.showStatistics,
                                    onToggle: (value) =>
                                        handleToggle("showStatistics", value),
                                },
                                {
                                    title: t("privacySettings.vacationMode"),
                                    value: localSettings.vacationMode,
                                    onToggle: (value) =>
                                        handleToggle("vacationMode", value),
                                },
                            ]}
                        />
                    )}
                </VStack>
            </VStack>
        </BaseContainer>
    );
};

export default PrivacyScreen;
