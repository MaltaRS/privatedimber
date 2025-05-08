import { useState } from "react";

import { ScrollView, View } from "react-native";

import { useTranslation } from 'react-i18next';

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    HStack,
    VStack,
    Text,
    Pressable,
} from "@/gluestackComponents";

import TitleContainer from "@/components/TitleContainer";
import { useRouter } from "expo-router";
import { Box, ChevronRight } from "lucide-react-native";

import { useGoogleAuth } from "@/Context/GoogleAuthProvider";
import { useAuth } from "@/Context/AuthProvider";
import { Colors } from "@/constants/Colors";
import { ConfigCard } from "@/components/tabs/config/configCard";
import { BaseContainer } from "@/components/BaseContainer";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { GoBack } from "@/components/utils/GoBack";

// ... (imports permanecem os mesmos)

const ConfigScreen = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { signOut } = useGoogleAuth();
    const { t } = useTranslation();

    const [modalVisible, setModalVisible] = useState(false);

    const handleSignOut = async () => {
        setModalVisible(false);
        await signOut();
    };

    const HeaderContainer = ({ title }: { title: string }) => (
        <HStack
            pt="$1"
            justifyContent="space-between"
            width="100%"
            position="relative"
        >
            <GoBack onPress={() => router.push("/explore")} />
            <Text
                fontFamily="$medium"
                fontSize={20}
                color="#000"
                textAlign="center"
                pt="$2"
                lineHeight={20}
                flex={1}
            >
                {title}
                <View style={{ width: 50 }} />
            </Text>
        </HStack>
    );

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title={t("config.title")} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 86 }}
                >
                    <VStack p="$1" pt="$2" gap="$2">
                        <Pressable
                            bgColor="#fff"
                            px="$4"
                            py="$3"
                            borderRadius="$xl"
                            alignItems="center"
                            justifyContent="space-between"
                            elevation={2}
                            flexDirection="row"
                            onPress={() => router.push("/(profile)/myprofile")}
                        >
                            <HStack gap="$5" alignItems="center">
                                <Avatar width={56} height={56}>
                                    <AvatarFallbackText>
                                        {user?.name}
                                    </AvatarFallbackText>
                                    <AvatarImage
                                        source={{
                                            uri: user?.icon,
                                        }}
                                        alt={user?.name}
                                    />
                                </Avatar>
                                <VStack gap="$1">
                                    <Text
                                        size="lg"
                                        fontFamily="$heading"
                                        color="#000"
                                        lineHeight={24}
                                    >
                                        {user?.name}
                                    </Text>
                                    <Text
                                        fontSize={17}
                                        color="#6B7280"
                                        fontFamily="$novaBody"
                                        lineHeight={20}
                                    >
                                        {t("config.viewProfile")}
                                    </Text>
                                </VStack>
                            </HStack>
                            <Box>
                                <ChevronRight
                                    size={24}
                                    color={Colors.gray500}
                                    strokeWidth={3}
                                />
                            </Box>
                        </Pressable>
                        <Text
                            my="$4"
                            fontSize={21}
                            fontFamily="$heading"
                            color="#000"
                            lineHeight={24}
                        >
                            {t("config.sections.messages")}
                        </Text>
                        <ConfigCard
                            items={[
                                {
                                    title: t("config.items.notifications"),
                                    href: "/(config)/(message)/notifications",
                                },
                                {
                                    title: t("config.items.setValues"),
                                    href: "/(config)/(message)/values",
                                },
                                {
                                    title: t("config.items.permissions"),
                                    href: "/(config)/(message)/permissions",
                                },
                                {
                                    title: t("config.items.conversations"),
                                    href: "/(config)/(message)/chatoptions",
                                },
                            ]}
                        />

                        <Text
                            my="$4"
                            fontSize={21}
                            fontFamily="$heading"
                            color="#000"
                            lineHeight={24}
                        >
                            {t("config.sections.account")}
                        </Text>
                        <ConfigCard
                            items={[
                                {
                                    title: t("config.items.accountType"),
                                    href: "/(config)/(account)/accountType",
                                },
                                {
                                    title: t("config.items.privacy"),
                                    href: "/(config)/(account)/privacy",
                                },
                                {
                                    title: t("config.items.security"),
                                    href: "/(config)/(account)/security",
                                },
                            ]}
                        />

                        <Text
                            my="$4"
                            fontSize={21}
                            fontFamily="$heading"
                            color="#000"
                            lineHeight={24}
                        >
                            {t("config.sections.app")}
                        </Text>
                        <ConfigCard
                            items={[
                                {
                                    title: t("config.items.help"),
                                    href: "/(config)/(app)/help",
                                },
                                {
                                    title: t("config.items.devicePermissions"),
                                    href: "/(config)/(message)/permissions",
                                },
                                {
                                    title: t("config.items.language"),
                                    href: "/(config)/(app)/languages",
                                },
                                {
                                    title: t("config.items.inviteFriends"),
                                    href: "/(config)/(app)/invitefriends",
                                },
                                {
                                    title: t("config.items.about"),
                                    href: "/(config)/(app)/about",
                                },
                                {
                                    title: t("config.items.signOut"),
                                    color: "$negative",
                                    action: () => setModalVisible(true),
                                },
                            ]}
                        />
                    </VStack>
                </ScrollView>
            </VStack>

            <ConfirmationModal
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={handleSignOut}
                title={t("config.modal.title")}
                message={t("config.modal.message")}
            />
        </BaseContainer>
    );
};

export default ConfigScreen;
