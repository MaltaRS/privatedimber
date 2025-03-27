import { useState } from "react";

import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

import {
    Text,
    VStack,
    HStack,
    Avatar,
    AvatarImage,
    AvatarFallbackText,
} from "@/gluestackComponents";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Feather from "@expo/vector-icons/Feather";

import { BaseContainer } from "@/components/BaseContainer";

import ProfileStatistics from "../components/ProfileStatistics";

import HeaderContainer from "../components/HeaderContainer";

import { useLocalSearchParams, useRouter } from "expo-router";

import { useAuth } from "@/Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/connection/auth/UserConnection";
import TitleContainerProfile from "@/components/TitleContainerProfile";

export default function ProfileScreen() {
    const { user } = useAuth();

    const router = useRouter();

    let { userUuid } = useLocalSearchParams<{
        userUuid: string;
    }>();

    const [activeTab, setActiveTab] = useState("tab1");

    let shouldGetUserData = false;

    if (userUuid && user?.id !== userUuid) {
        shouldGetUserData = true;
    }

    const { data: userData } = useQuery({
        queryKey: ["user", userUuid],
        queryFn: () => fetchUserById(userUuid),
        enabled: shouldGetUserData,
    });

    const contentSobreProfile =
        "O meu grande objetivo de vida é ajudar você e sua empresa a expandir sua capacidade e visão empreendedora";

    const data = shouldGetUserData ? userData?.user : user;

    const HeaderProfile = () => {
        return (
            <VStack alignItems="flex-start">
                <HStack justifyContent="space-between">
                    <VStack>
                        <HStack>
                            <Avatar width={72} height={72} marginRight={10}>
                                <AvatarFallbackText>
                                    {data?.name}
                                </AvatarFallbackText>
                                <AvatarImage
                                    source={{
                                        uri: data?.icon,
                                    }}
                                    alt={data?.name}
                                />
                            </Avatar>

                            <VStack>
                                <HStack style={{ alignItems: "center" }}>
                                    <Text
                                        fontFamily="$novaTitle"
                                        fontSize="$lg"
                                        textAlign="center"
                                        lineHeight={24}
                                    >
                                        {data?.name}
                                    </Text>
                                    <MaterialIcons
                                        name="verified"
                                        size={14}
                                        color="#00A8FF"
                                        style={{ paddingLeft: 4 }}
                                    />
                                </HStack>

                                <Text
                                    fontFamily="$novaBody"
                                    fontSize="$sm"
                                    textAlign="left"
                                    lineHeight={20}
                                >
                                    @{data?.username}
                                </Text>
                                <Text
                                    fontFamily="$novaBody"
                                    fontSize="$xs"
                                    textAlign="left"
                                    lineHeight={20}
                                >
                                    Ultima conexão ontem as 21:30
                                </Text>
                            </VStack>
                        </HStack>
                    </VStack>

                    {!shouldGetUserData && (
                        <TouchableOpacity
                            onPress={() => router.push("/editmyprofile")}
                            style={{
                                borderRadius: 300,
                                alignContent: "flex-end",
                                width: 48,
                                height: 48,
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 1,
                                borderColor: "#f3f4f6",
                            }}
                        >
                            <Feather name="edit" size={20} color="black" />
                        </TouchableOpacity>
                    )}
                </HStack>

                <VStack mt="$2">
                    <Text fontFamily="$novaBody" fontSize="$sm" lineHeight={20}>
                        {data?.bio ? data.bio : "Sem bio"}
                    </Text>
                </VStack>
            </VStack>
        );
    };

    const TabCategoryProfile = (title: { name: string }) => {
        return (
            <View style={{ marginRight: 8 }}>
                <HStack style={{ alignItems: "center" }}>
                    <VStack
                        style={{
                            padding: 4,
                            borderRadius: 50,
                            borderWidth: 1.5,
                            borderColor: "#D1D5DB",
                        }}
                    >
                        <Text
                            paddingLeft={10}
                            paddingRight={10}
                            color="$gray500"
                            fontSize={12}
                            textAlign="center"
                            lineHeight={14}
                        >
                            {title.name}
                        </Text>
                    </VStack>
                </HStack>
            </View>
        );
    };

    const AboutProfile = (title: { content: string }) => {
        return (
            <VStack>
                <VStack mt={24}>
                    <TitleContainerProfile name="Sobre Mim" />
                </VStack>
                <VStack width="100%">
                    <Text
                        fontFamily="$novaBody"
                        fontSize={15}
                        textAlign="justify"
                        lineHeight={18}
                        marginTop="$2"
                    >
                        {title.content}
                    </Text>
                </VStack>
                <Text
                    color="#00A8FF"
                    fontFamily="$novaBody"
                    fontSize="$md"
                    lineHeight={20}
                    marginTop="$2"
                >
                    Ver mais
                </Text>

                <View
                    style={{
                        marginTop: 18,
                        width: "100%",
                        height: 6,
                        backgroundColor: "#F8F8F9",
                        borderRadius: 10,
                    }}
                />

                <VStack mt={24} mb={16}>
                    <TitleContainerProfile name="Minhas Categorias" />
                    <VStack mt={24}>
                        <HStack>
                            <TabCategoryProfile name="Financas e Negocios" />
                            <TabCategoryProfile name="Empreendedorismo" />
                        </HStack>
                    </VStack>
                </VStack>
                <View
                    style={{
                        marginTop: 18,
                        width: "100%",
                        height: 6,
                        backgroundColor: "#F8F8F9",
                        borderRadius: 10,
                    }}
                />
                <VStack mt={24} mb={16}>
                    <TitleContainerProfile name="Meus Interesses" />
                    <VStack mt={24}>
                        <HStack>
                            <TabCategoryProfile name="Financas e Negocios" />
                            <TabCategoryProfile name="Empreendedorismo" />
                        </HStack>
                    </VStack>
                </VStack>

                <View
                    style={{
                        marginTop: 18,
                        width: "100%",
                        height: 6,
                        backgroundColor: "#F8F8F9",
                        borderRadius: 10,
                    }}
                />
            </VStack>
        );
    };

    const SocialLinks = (title: {
        linkednName: string;
        instaName: string;
        sitelink: string;
        username: string;
    }) => {
        return (
            <VStack>
                <VStack mt={24} mb={16}>
                    <TitleContainerProfile name="Social" />
                    <VStack mt={24}>
                        <VStack>
                            <Text
                                fontFamily="medium"
                                paddingBottom={10}
                                fontSize="$sm"
                                color="#gray800"
                                lineHeight={20}
                            >
                                {title.linkednName}
                            </Text>
                            <Text
                                fontFamily="medium"
                                fontSize="$sm"
                                color="$gray800"
                                lineHeight={20}
                            >
                                {title.instaName}
                            </Text>
                        </VStack>
                    </VStack>
                </VStack>
                <View
                    style={{
                        marginTop: 18,
                        width: "100%",
                        height: 6,
                        backgroundColor: "#F8F8F9",
                        borderRadius: 10,
                    }}
                />

                <VStack mt={24} mb={16}>
                    <TitleContainerProfile name="Links" />
                    <VStack mt={16}>
                        <HStack>
                            <Text
                                fontFamily="regular"
                                paddingBottom={20}
                                fontSize="$sm"
                                color="$blue600"
                                lineHeight={20}
                            >
                                {title.sitelink}
                            </Text>
                        </HStack>
                    </VStack>
                </VStack>
            </VStack>
        );
    };

    return (
        <BaseContainer>
            <VStack gap="$4">
                <HeaderContainer title="Meu Perfil" />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 86 }}
                >
                    <VStack p="$1">
                        <HeaderProfile />

                        <HStack
                            backgroundColor="$gray100"
                            padding={2}
                            marginTop={12}
                            borderRadius={30}
                        >
                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    activeTab === "tab1"
                                        ? styles.activeTab
                                        : styles.inactiveTab,
                                ]}
                                onPress={() => setActiveTab("tab1")}
                            >
                                <Text
                                    style={[
                                        activeTab === "tab1"
                                            ? styles.titleTabActive
                                            : styles.titleTabInactive,
                                    ]}
                                >
                                    Sobre
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    activeTab === "tab2"
                                        ? styles.activeTab
                                        : styles.inactiveTab,
                                ]}
                                onPress={() => setActiveTab("tab2")}
                            >
                                <Text
                                    fontFamily="title"
                                    style={[
                                        activeTab === "tab2"
                                            ? styles.titleTabActive
                                            : styles.titleTabInactive,
                                    ]}
                                >
                                    Estatísticas
                                </Text>
                            </TouchableOpacity>
                        </HStack>

                        {activeTab === "tab1" ? (
                            <View />
                        ) : (
                            <ProfileStatistics />
                        )}

                        <AboutProfile content={contentSobreProfile} />

                        <SocialLinks
                            linkednName="@linkedin"
                            username="@camilafarani"
                            sitelink="www.teste.com"
                            instaName="@camilafarani"
                        />
                    </VStack>
                </ScrollView>
            </VStack>
        </BaseContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8F9FA",
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: "#333",
        lineHeight: 20,
    },
    tabContainer: {
        flexDirection: "row",
    },
    tabButton: {
        marginHorizontal: "auto",
        borderRadius: 10,
        backgroundColor: "#f4f4f4",
        height: 36,
    },

    titleTabActive: {
        color: "#000",
        fontFamily: "$novaTitle",
    },

    titleTabInactive: {
        color: "$gray700",
        fontFamily: "$novaTitle",
    },
    activeTab: {
        width: "48%",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        margin: 2,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#fff",
    },
    inactiveTab: {
        width: "48%",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        margin: 2,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#f8f8f8",
        opacity: 0.6,
    },
    contentView: {
        padding: 20,
        backgroundColor: "#000",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
});
