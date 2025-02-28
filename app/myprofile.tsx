import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";

import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

import {
    Text,
    VStack,
    HStack,
    Avatar,
    AvatarImage,
    AvatarFallbackText,
    Box,
    Spinner,
} from "@/gluestackComponents";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Feather from "@expo/vector-icons/Feather";

import { BaseContainer } from "@/components/BaseContainer";

import ProfileStatistics from "../components/ProfileStatistics";

import HeaderContainer from "../components/HeaderContainer";

import Row from "../components/Row";

import { useLocalSearchParams, useRouter } from "expo-router";

import { useAuth } from "@/Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/connection/auth/UserConnection";

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

    const { data: userData, isLoading } = useQuery({
        queryKey: ["user", userUuid],
        queryFn: () => fetchUserById(userUuid),
        enabled: shouldGetUserData,
    });

    const contentSobreProfile =
        "O meu grande objetivo de vida é ajudar você e sua empresa a expandir sua capacidade e visão empreendedora";

    const data = shouldGetUserData ? userData?.user : user;

    const HeaderProfile = () => {
        return (
            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                }}
            >
                <HStack
                    className="bg-white "
                    style={{ width: 400, justifyContent: "space-between" }}
                >
                    <VStack className="bg-white ">
                        <View>
                            <HStack>
                                <Avatar width={56} height={56}>
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

                                <View style={{ marginLeft: 7 }}>
                                    <HStack style={{ alignItems: "center" }}>
                                        <Text bold style={{ fontSize: 18 }}>
                                            {data?.name}
                                        </Text>

                                        {data?.verifiedAt && (
                                            <MaterialIcons
                                                name="verified"
                                                size={22}
                                                color="#00A8FF"
                                                style={{ paddingLeft: 4 }}
                                            />
                                        )}
                                    </HStack>

                                    <Text style={{ fontSize: 14 }}>
                                        @{data?.username}
                                    </Text>

                                    <Text style={{ fontSize: 12 }}>
                                        Ultima conexão ontem as 21:30
                                    </Text>
                                </View>
                            </HStack>
                        </View>
                    </VStack>

                    {!shouldGetUserData && (
                        <TouchableOpacity
                            onPress={() => router.push("/editmyprofile")}
                            style={{
                                borderRadius: 300,
                                backgroundColor: "#F9F9F9",
                                alignContent: "flex-end",

                                width: 50,
                                height: 50,
                                alignItems: "center",
                                justifyContent: "center",

                                borderWidth: 1,
                                borderColor: "#E5E7EB",
                                elevation: 1,
                            }}
                        >
                            <Feather name="edit" size={24} color="black" />
                        </TouchableOpacity>
                    )}
                </HStack>

                <VStack style={{ width: "100%", marginTop: 10 }}>
                    <Text
                        className="text-md mt-10 font-normal   text-typography-900"
                        fontSize={15}
                    >
                        {data?.bio ? data.bio : "Sem bio"}
                    </Text>
                </VStack>
            </View>
        );
    };

    const TabCategoryProfile = (title) => {
        return (
            <View style={{ marginRight: 13 }}>
                <HStack style={{ alignItems: "center", marginTop: 12 }}>
                    <VStack
                        style={{
                            padding: 6,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: "#D1D5DB",
                        }}
                    >
                        <Text
                            paddingLeft={10}
                            paddingRight={10}
                            bold
                            fontSize={13}
                            color="#999999"
                        >
                            {title.name}
                        </Text>
                    </VStack>
                </HStack>
            </View>
        );
    };

    const TitleContainer = (title) => {
        return (
            <Text marginTop={30} marginBottom={5} fontSize={17}>
                {title.name}
            </Text>
        );
    };

    // Area do Perfil - Sobre

    const AboutProfile = (title) => {
        return (
            <VStack>
                <TitleContainer name="Sobre Min" />

                <Text style={{ fontSize: 15 }}>{title.content}</Text>

                <Text size="15" style={{ marginTop: 5, color: "#00A8FF" }}>
                    Ver mais
                </Text>

                <View
                    style={{
                        marginTop: 25,
                        width: "100%",
                        height: 3,
                        backgroundColor: "#f2f2f2",
                        borderRadius: 10,
                    }}
                />

                <VStack>
                    <TitleContainer name="Minhas Categorias" />

                    <HStack>
                        <TabCategoryProfile name="Financas e Negocios" />

                        <TabCategoryProfile name="Empreendedorismo" />
                    </HStack>
                </VStack>

                <VStack>
                    <TitleContainer name="Meus Interesses" />

                    <HStack>
                        <TabCategoryProfile name="Financas e Negocios" />

                        <TabCategoryProfile name="Empreendedorismo" />
                    </HStack>
                </VStack>

                <Row />
            </VStack>
        );
    };

    const SocialLinks = (title) => {
        return (
            <VStack className="ml-4 mr-4">
                <TitleContainer name="Social" />

                <Text paddingBottom={20} size="15" color="#00A8FF">
                    {title.linkednanme}
                </Text>
            </VStack>
        );
    };

    return (
        <BaseContainer
            gap="$2"
            style={{ flex: 1, backgroundColor: "#FFF", marginTop: 10 }}
        >
            {isLoading && shouldGetUserData ? (
                <Box
                    flex={1}
                    bg="white"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Spinner size="large" />
                </Box>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HeaderContainer name="Meu Perfil" />

                    <HeaderProfile />

                    <HStack
                        backgroundColor="#f5f5f5"
                        paddingTop={3}
                        paddingBottom={3}
                        marginTop={20}
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
                                style={[
                                    activeTab === "tab2"
                                        ? styles.titleTabActive
                                        : styles.titleTabInactive,
                                ]}
                            >
                                Estatisticas
                            </Text>
                        </TouchableOpacity>
                    </HStack>

                    {activeTab === "tab1" ? <View /> : <ProfileStatistics />}

                    <AboutProfile content={contentSobreProfile} />

                    <SocialLinks
                        linkednanme="@linkedin/@camilafarani"
                        username="@camilafarani"
                    />
                </ScrollView>
            )}
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
        fontSize: 20,

        marginBottom: 20,

        color: "#333",
    },

    tabContainer: {
        flexDirection: "row",

        marginBottom: 20,
    },

    tabButton: {
        marginHorizontal: 10,

        padding: 10,

        borderRadius: 8,

        backgroundColor: "#f4f4f4",

        height: 46,
    },

    titleTabActive: {
        color: "#000",
        fontWeight: "bold",
    },

    titleTabInactive: {
        color: "#000",
    },

    activeTab: {
        width: "45%",
        alignItems: "center",
        justifyContent: "center",

        padding: 6,
        margin: 2,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#fff",
    },

    inactiveTab: {
        width: "45%",
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

        backgroundColor: "#fff",

        borderRadius: 10,

        shadowColor: "#000",

        shadowOffset: { width: 0, height: 2 },

        shadowOpacity: 0.1,

        shadowRadius: 4,

        elevation: 3,

        marginBottom: 20,
    },
});
