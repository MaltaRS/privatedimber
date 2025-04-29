import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";

import {
    Text,
    VStack,
    HStack,
    Avatar,
    AvatarImage,
    AvatarFallbackText,
    ScrollView,
    Box,
    Pressable,
} from "@/gluestackComponents";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Feather from "@expo/vector-icons/Feather";

import { BaseContainer } from "@/components/BaseContainer";

import ProfileStatistics from "../components/ProfileStatistics";

import TitleContainerProfile from "@/components/TitleContainerProfile";

import { GoBack } from "@/components/utils/GoBack";

import { useRouter } from "expo-router";

import { useAuth } from "@/Context/AuthProvider";

interface HeaderContainerProps {
    title: string;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ title }) => {
    const router = useRouter();

    return (
        <HStack
            pt="$1"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            px="$1"
        >
            <GoBack onPress={() => router.back()} />

            <Box
                flex={1}
                alignItems="center"
                position="absolute"
                left={0}
                right={0}
            >
                <Text
                    fontFamily="$title"
                    fontSize="$lg"
                    color="$gray900"
                    textAlign="center"
                >
                    {title}
                </Text>
            </Box>

            <Box width={40} />
        </HStack>
    );
};

export default function ProfileScreen() {
    const { user } = useAuth();

    const router = useRouter();

    const [activeTab, setActiveTab] = useState("tab1");

    const contentSobreProfile =
        "O meu grande objetivo de vida é ajudar você e a sua empresa a expandir sua capacidade e visão empreendedora";

    const HeaderProfile = () => {
        return (
            <Box width="100%" mt="$5">
                <HStack width="100%" justifyContent="space-between">
                    <VStack>
                        <Box>
                            <HStack>
                                <Avatar size="lg">
                                    <AvatarFallbackText>
                                        {user?.name}
                                    </AvatarFallbackText>

                                    <AvatarImage
                                        source={{ uri: user?.icon }}
                                        alt={user?.name}
                                    />
                                </Avatar>

                                <VStack ml="$2.5">
                                    <HStack alignItems="center">
                                        <Text bold fontSize="$lg">
                                            {user?.name}
                                        </Text>

                                        <MaterialIcons
                                            name="verified"
                                            size={22}
                                            color="$blue500"
                                            ml="$1"
                                        />
                                    </HStack>

                                    <Text fontSize="$sm" color="$gray600">
                                        @CamilaFarani
                                    </Text>

                                    <Text fontSize="$xs" color="$gray500">
                                        última conexão ontem às 21:30
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </VStack>

                    <Pressable
                        onPress={() => router.push("/editmyprofile")}
                        bg="$gray100"
                        borderRadius="$full"
                        width={48}
                        height={48}
                        alignItems="center"
                        justifyContent="center"
                        borderWidth={1}
                        borderColor="$gray200"
                    >
                        <Feather name="edit" size={24} color="$gray600" />
                    </Pressable>
                </HStack>

                <VStack width="100%" mt="$4">
                    <Text fontSize="$sm" color="$gray800" mb="$1">
                        Mais influente da América Latina pela Bloomberg
                    </Text>

                    <Text fontSize="$sm" color="$gray800">
                        Investidora Shark Tank Brasil | Empreendedora | LinkedIn
                    </Text>
                </VStack>
            </Box>
        );
    };

    interface CategoryProps {
        name: string;
    }

    const TabCategoryProfile: React.FC<CategoryProps> = ({ name }) => {
        return (
            <Box mr="$2">
                <HStack alignItems="center">
                    <Box
                        py="$1.5"
                        px="$4"
                        borderRadius="$full"
                        borderWidth={1}
                        borderColor="$gray300"
                        bg="$white"
                    >
                        <Text fontSize="$xs" color="$gray600">
                            {name}
                        </Text>
                    </Box>
                </HStack>
            </Box>
        );
    };

    interface AboutProfileProps {
        content: string;
    }

    const AboutProfile: React.FC<AboutProfileProps> = ({ content }) => {
        return (
            <VStack mt="$6">
                <VStack my="$4">
                    <TitleContainerProfile name="Sobre mim" />
                </VStack>

                <Text fontSize="$md" color="$gray800" lineHeight="$lg">
                    {content}
                </Text>

                <Text fontSize="$md" color="$blue500" mt="$2">
                    Ver mais
                </Text>

                <Box
                    my="$6"
                    width="100%"
                    height={6}
                    bg="$gray100"
                    borderRadius="$sm"
                />

                <VStack my="$4">
                    <TitleContainerProfile name="Minhas categorias" />

                    <VStack mt="$4">
                        <HStack>
                            <TabCategoryProfile name="Finanças e Economia" />

                            <TabCategoryProfile name="Negócios" />
                        </HStack>
                    </VStack>
                </VStack>

                <Box
                    my="$6"
                    width="100%"
                    height={6}
                    bg="$gray100"
                    borderRadius="$sm"
                />

                <VStack my="$4">
                    <TitleContainerProfile name="Meus interesses" />

                    <VStack mt="$4">
                        <HStack>
                            <TabCategoryProfile name="Finanças e Economia" />

                            <TabCategoryProfile name="Negócios" />
                        </HStack>
                    </VStack>
                </VStack>
            </VStack>
        );
    };

    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <BaseContainer>
                <VStack gap="$4">
                    <HeaderContainer title="Meu perfil" />

                    <Box px="$4">
                        <HeaderProfile />

                        <HStack
                            bg="$gray100"
                            p="$1"
                            mt="$6"
                            borderRadius="$full"
                        >
                            <Pressable
                                flex={1}
                                height={36}
                                justifyContent="center"
                                alignItems="center"
                                borderRadius="$full"
                                bg={
                                    activeTab === "tab1"
                                        ? "$white"
                                        : "transparent"
                                }
                                shadowColor={
                                    activeTab === "tab1"
                                        ? "$black"
                                        : "transparent"
                                }
                                shadowOffset={{ width: 0, height: 1 }}
                                shadowOpacity={activeTab === "tab1" ? 0.1 : 0}
                                shadowRadius={1}
                                elevation={activeTab === "tab1" ? 1 : 0}
                                onPress={() => setActiveTab("tab1")}
                            >
                                <Text
                                    fontSize="$sm"
                                    fontFamily="$body"
                                    color={
                                        activeTab === "tab1"
                                            ? "$gray900"
                                            : "$gray600"
                                    }
                                    fontWeight={
                                        activeTab === "tab1"
                                            ? "$medium"
                                            : "$normal"
                                    }
                                >
                                    Sobre
                                </Text>
                            </Pressable>

                            <Pressable
                                flex={1}
                                height={36}
                                justifyContent="center"
                                alignItems="center"
                                borderRadius="$full"
                                bg={
                                    activeTab === "tab2"
                                        ? "$white"
                                        : "transparent"
                                }
                                shadowColor={
                                    activeTab === "tab2"
                                        ? "$black"
                                        : "transparent"
                                }
                                shadowOffset={{ width: 0, height: 1 }}
                                shadowOpacity={activeTab === "tab2" ? 0.1 : 0}
                                shadowRadius={1}
                                elevation={activeTab === "tab2" ? 1 : 0}
                                onPress={() => setActiveTab("tab2")}
                            >
                                <Text
                                    fontSize="$sm"
                                    fontFamily="$body"
                                    color={
                                        activeTab === "tab2"
                                            ? "$gray900"
                                            : "$gray600"
                                    }
                                    fontWeight={
                                        activeTab === "tab2"
                                            ? "$medium"
                                            : "$normal"
                                    }
                                >
                                    Estatísticas
                                </Text>
                            </Pressable>
                        </HStack>

                        {activeTab === "tab1" ? (
                            <AboutProfile content={contentSobreProfile} />
                        ) : (
                            <ProfileStatistics />
                        )}
                    </Box>
                </VStack>

                <StatusBar style="auto" />
            </BaseContainer>
        </ScrollView>
    );
}
