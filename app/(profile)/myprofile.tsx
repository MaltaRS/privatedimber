import { Fragment, useState } from "react";

import { Linking } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

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

import { useAuth, User } from "@/Context/AuthProvider";

import { fetchUserById } from "@/connection/auth/UserConnection";

import { useQuery } from "@tanstack/react-query";

import { formatTime, formatLastAccess } from "@/utils/dateFormat";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

import { BaseContainer } from "@/components/BaseContainer";
import ProfileStatistics from "@/components/ProfileStatistics";
import HeaderContainer from "@/components/HeaderContainer";
import { TabButton } from "@/components/utils/TabButton";

import Linkedin from "@/assets/icons/socialIcons/linkedin.svg";
import Instagram from "@/assets/icons/socialIcons/instagram.svg";
import Facebook from "@/assets/icons/socialIcons/facebook.svg";
import Twitter from "@/assets/icons/socialIcons/x.svg";
import Youtube from "@/assets/icons/socialIcons/youtube.svg";
import Tiktok from "@/assets/icons/socialIcons/tiktok.svg";

const socialNetworks = [
    { name: "Facebook", icon: "facebook", color: "#4267B2" },
    { name: "Instagram", icon: "instagram", color: "#C13584" },
    { name: "TikTok", icon: "music", color: "#000000" },
    { name: "YouTube", icon: "youtube", color: "#FF0000" },
    { name: "LinkedIn", icon: "linkedin", color: "#0077B5" },
    { name: "Twitter", icon: "twitter", color: "#1DA1F2" },
];

export default function ProfileScreen() {
    const { user } = useAuth();
    const router = useRouter();

    let { userUuid } = useLocalSearchParams<{ userUuid: string }>();

    const [activeTab, setActiveTab] = useState("tab1");

    let shouldGetUserData = false;
    if (userUuid && user?.uuid !== userUuid) {
        shouldGetUserData = true;
    }

    const { data: userData } = useQuery({
        queryKey: ["user", userUuid],
        queryFn: () => fetchUserById(userUuid),
        enabled: shouldGetUserData,
    });

    const validatedUser = shouldGetUserData ? userData?.user : user;

    const HeaderProfile = () => {
        return (
            <VStack alignItems="flex-start">
                <HStack justifyContent="space-between" width="100%">
                    <VStack>
                        <HStack>
                            <Avatar width={75} height={75} mr="$2.5">
                                <AvatarFallbackText>
                                    {validatedUser?.name}
                                </AvatarFallbackText>
                                <AvatarImage
                                    source={{
                                        uri: validatedUser?.icon || undefined,
                                    }}
                                    alt={validatedUser?.name}
                                />
                            </Avatar>

                            <VStack gap={3}>
                                <HStack alignItems="center">
                                    <Text
                                        fontFamily="$novaTitle"
                                        fontSize="$lg"
                                        textAlign="center"
                                        bold
                                        lineHeight={24}
                                    >
                                        {validatedUser?.name}
                                    </Text>
                                    <Box ml="$1">
                                        {validatedUser?.verifiedAt && (
                                            <MaterialIcons
                                                name="verified"
                                                size={21}
                                                color="#00A8FF"
                                                style={{ marginTop: 2 }}
                                            />
                                        )}
                                    </Box>
                                </HStack>

                                <Text
                                    fontFamily="$novaBody"
                                    fontSize="$md"
                                    textAlign="left"
                                    color="$black"
                                    lineHeight={20}
                                >
                                    @{validatedUser?.username}
                                </Text>
                                {validatedUser?.lastAccessAt && (
                                    <Text
                                        fontFamily="$novaBody"
                                        fontSize={12.5}
                                        textAlign="left"
                                        lineHeight={20}
                                        color="$gray600"
                                    >
                                        Ultima conexão{" "}
                                        {formatLastAccess(
                                            validatedUser?.lastAccessAt,
                                        )}
                                    </Text>
                                )}
                            </VStack>
                        </HStack>
                    </VStack>

                    {!shouldGetUserData && (
                        <Pressable
                            onPress={() => router.push("/editprofile")}
                            borderRadius="$full"
                            width={48}
                            height={48}
                            alignItems="center"
                            justifyContent="center"
                            borderWidth={1}
                            borderColor="$gray200"
                        >
                            <Feather name="edit" size={20} color="$gray900" />
                        </Pressable>
                    )}
                </HStack>

                <VStack mt="$4">
                    <Text fontFamily="$novaBody" fontSize="$md" lineHeight={20}>
                        {validatedUser?.bio ? validatedUser.bio : "Sem bio"}
                    </Text>
                </VStack>
            </VStack>
        );
    };

    const TabCategoryProfile = ({ name }: { name: string }) => {
        return (
            <Box mb="$2" mr="$2">
                <HStack alignItems="center">
                    <Box
                        py="$1.5"
                        px="$3"
                        borderRadius="$full"
                        borderWidth={1}
                        borderColor="$gray400"
                    >
                        <Text
                            color="$gray600"
                            fontSize={15}
                            textAlign="center"
                            lineHeight={22}
                        >
                            {name}
                        </Text>
                    </Box>
                </HStack>
            </Box>
        );
    };

    const AboutProfile = ({
        content,
    }: {
        content: string | null | undefined;
    }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const MAX_CHARS = 240;
        const displayContent = content || "Sem descrição";
        const shouldShowMore = displayContent.length > MAX_CHARS;
        const truncatedText = shouldShowMore
            ? displayContent.substring(0, MAX_CHARS) + "..."
            : displayContent;

        return (
            <VStack>
                <VStack mt="$6">
                    <Text
                        fontSize={19}
                        fontFamily="$medium"
                        color="#15161E"
                        lineHeight={22}
                        bold
                    >
                        Sobre mim
                    </Text>
                </VStack>
                <VStack width="100%">
                    <Text
                        fontFamily="$novaMedium"
                        fontSize={16}
                        textAlign="justify"
                        mt="$2"
                    >
                        {isExpanded ? displayContent : truncatedText}
                    </Text>
                    {shouldShowMore && (
                        <Pressable onPress={() => setIsExpanded(!isExpanded)}>
                            <Text
                                color="$blue500"
                                fontFamily="$novaBody"
                                fontSize="$md"
                                lineHeight={20}
                                mt="$2"
                            >
                                {isExpanded ? "Ver menos" : "Ver mais"}
                            </Text>
                        </Pressable>
                    )}
                </VStack>

                <Box
                    my="$4"
                    width="100%"
                    height={6}
                    bg="$gray100"
                    borderRadius="$sm"
                />

                <VStack my="$4">
                    <Text
                        fontSize={19}
                        fontFamily="$medium"
                        color="#15161E"
                        lineHeight={22}
                        bold
                    >
                        Minhas categorias
                    </Text>
                    <VStack mt="$6">
                        <HStack flexWrap="wrap">
                            {validatedUser?.tags?.map((tag) => (
                                <TabCategoryProfile key={tag} name={tag} />
                            ))}
                        </HStack>
                    </VStack>
                </VStack>

                <Box
                    my="$2"
                    width="100%"
                    height={6}
                    bg="$gray100"
                    borderRadius="$sm"
                />

                <VStack my="$4">
                    <Text
                        fontSize={19}
                        fontFamily="$medium"
                        color="#15161E"
                        lineHeight={22}
                        bold
                    >
                        Meus interesses
                    </Text>
                    <VStack mt="$6">
                        <HStack flexWrap="wrap">
                            {validatedUser?.interests?.map((interest) => (
                                <TabCategoryProfile
                                    key={interest}
                                    name={interest}
                                />
                            ))}
                        </HStack>
                    </VStack>
                </VStack>

                <Box
                    my="$2"
                    width="100%"
                    height={6}
                    bg="$gray100"
                    borderRadius="$sm"
                />
            </VStack>
        );
    };

    const SocialLinks = ({
        validatedUser,
    }: {
        validatedUser: User | null | undefined;
    }) => {
        if (!validatedUser?.links?.length) return null;

        const handleSocialPress = (url: string) => {
            if (!url) return;
            Linking.openURL(url);
        };

        return (
            <VStack>
                <VStack my="$6">
                    <Text
                        fontSize={19}
                        fontFamily="$medium"
                        color="#15161E"
                        lineHeight={22}
                        bold
                    >
                        Social
                    </Text>
                    <HStack mt="$4" flexWrap="wrap" gap="$4">
                        {validatedUser.links.map((link, index) => {
                            const social = socialNetworks.find(
                                (s) => s.name === link.name,
                            );
                            if (!social) return null;

                            const Icon =
                                {
                                    Facebook: Facebook,
                                    Instagram: Instagram,
                                    TikTok: Tiktok,
                                    YouTube: Youtube,
                                    LinkedIn: Linkedin,
                                    Twitter: Twitter,
                                }[social.name] ?? null;

                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => handleSocialPress(link.url)}
                                    bg="$gray100"
                                    p="$3"
                                    borderRadius="$lg"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {Icon && <Icon width={24} height={24} />}
                                </Pressable>
                            );
                        })}
                    </HStack>
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
                                <AboutProfile content={validatedUser?.about} />
                                <SocialLinks validatedUser={validatedUser} />
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
