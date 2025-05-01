import { Fragment, useState } from "react";

import { Text, VStack, HStack, ScrollView, Box } from "@/gluestackComponents";

import { useAuth } from "@/Context/AuthProvider";

import { BaseContainer } from "@/components/BaseContainer";
import ProfileStatistics from "@/components/ProfileStatistics";
import HeaderContainer from "@/components/HeaderContainer";
import { TabButton } from "@/components/utils/TabButton";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileAbout } from "@/components/profile/ProfileAbout";
import { SocialLinks } from "@/components/profile/SocialLinks";

export default function ProfileScreen() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("tab1");

    if (!user) {
        return (
            <BaseContainer>
                <VStack flex={1} alignItems="center" justifyContent="center">
                    <Text>Usuário não encontrado</Text>
                </VStack>
            </BaseContainer>
        );
    }

    return (
        <BaseContainer>
            <VStack gap="$4">
                <HeaderContainer title="Meu Perfil" />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 86 }}
                >
                    <VStack p="$1">
                        <ProfileHeader
                            name={user.name}
                            username={user.username}
                            icon={user.icon}
                            bio={user.bio}
                            lastAccessAt={user.lastAccessAt}
                            verifiedAt={user.verifiedAt}
                            shouldGetUserData={false}
                        />

                        <HStack bg="$gray100" borderRadius="$full" mt="$2">
                            <HStack
                                backgroundColor="$gray100"
                                p={4}
                                borderRadius="$full"
                                alignItems="center"
                                justifyContent="center"
                                alignSelf="center"
                                width="$full"
                            >
                                <TabButton
                                    title="Sobre"
                                    isActive={activeTab === "tab1"}
                                    onPress={() => setActiveTab("tab1")}
                                />
                                <TabButton
                                    title="Doadores"
                                    isActive={activeTab === "tab2"}
                                    onPress={() => setActiveTab("tab2")}
                                />
                            </HStack>
                        </HStack>

                        {activeTab === "tab1" ? (
                            <Fragment>
                                <ProfileAbout
                                    content={user.about}
                                    tags={user.tags}
                                    interests={user.interests}
                                />
                                <Box
                                    my="$2"
                                    width="100%"
                                    height={6}
                                    bg="$gray100"
                                    borderRadius="$sm"
                                />
                                <SocialLinks links={user.links} />
                            </Fragment>
                        ) : (
                            <ProfileStatistics />
                        )}
                    </VStack>
                </ScrollView>
            </VStack>
        </BaseContainer>
    );
}
