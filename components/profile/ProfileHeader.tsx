import React from "react";

import { useRouter } from "expo-router";

import {
    HStack,
    VStack,
    Box,
    Text,
    Avatar,
    AvatarImage,
    AvatarFallbackText,
    Pressable,
} from "@/gluestackComponents";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Heart, MoreHorizontal } from "lucide-react-native";

import { formatLastAccess } from "@/utils/dateFormat";

interface ProfileHeaderProps {
    name: string;
    username: string;
    icon?: string | null;
    bio?: string | null;
    lastAccessAt?: string | null;
    verifiedAt?: string | null;
    shouldGetUserData?: boolean;
    onFavorite?: () => void;
    isFavorited?: boolean;
    onOpenMenu?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    name,
    username,
    icon,
    bio,
    lastAccessAt,
    verifiedAt,
    shouldGetUserData = false,
    onFavorite,
    isFavorited,
    onOpenMenu,
}) => {
    const router = useRouter();

    return (
        <VStack width="100%" gap="$4">
            <HStack
                width="100%"
                alignItems="flex-start"
                justifyContent="space-between"
            >
                <Avatar width={82} height={82}>
                    <AvatarFallbackText fontSize="$2xl">
                        {name}
                    </AvatarFallbackText>
                    <AvatarImage
                        source={{
                            uri: icon || undefined,
                        }}
                        alt={name}
                    />
                </Avatar>

                {!shouldGetUserData ? (
                    <>
                        <VStack gap={3}>
                            <HStack alignItems="center">
                                <Text
                                    fontFamily="$novaTitle"
                                    fontSize="$lg"
                                    textAlign="center"
                                    bold
                                    lineHeight={24}
                                >
                                    {name}
                                </Text>
                                <Box ml="$1">
                                    {verifiedAt && (
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
                                @{username}
                            </Text>
                            {lastAccessAt && (
                                <Text
                                    fontFamily="$novaBody"
                                    fontSize={12.5}
                                    textAlign="left"
                                    lineHeight={20}
                                    color="$gray600"
                                >
                                    Ultima conexão{" "}
                                    {formatLastAccess(lastAccessAt)}
                                </Text>
                            )}
                        </VStack>

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
                            <MaterialIcons
                                name="edit"
                                size={20}
                                color="#111827"
                            />
                        </Pressable>
                    </>
                ) : (
                    <HStack space="md">
                        <Pressable
                            onPress={onFavorite}
                            borderRadius="$full"
                            alignItems="center"
                            justifyContent="center"
                            p={17}
                            bgColor="$gray100"
                        >
                            <Heart
                                size={26}
                                color={isFavorited ? "#ef4444" : "#4B5563"}
                                fill={isFavorited ? "#ef4444" : "none"}
                            />
                        </Pressable>
                        <Pressable
                            onPress={onOpenMenu}
                            borderRadius="$full"
                            alignItems="center"
                            justifyContent="center"
                            p={17}
                            bgColor="$gray100"
                        >
                            <MoreHorizontal size={26} color="#4B5563" />
                        </Pressable>
                    </HStack>
                )}
            </HStack>

            {shouldGetUserData && (
                <>
                    <VStack alignItems="flex-start" mt="$2">
                        <HStack alignItems="center" space="sm">
                            <Text
                                fontFamily="$novaTitle"
                                fontSize="$xl"
                                bold
                                lineHeight={28}
                            >
                                {name}
                            </Text>
                            {verifiedAt && (
                                <MaterialIcons
                                    name="verified"
                                    size={21}
                                    color="#00A8FF"
                                    style={{ marginTop: 2 }}
                                />
                            )}
                        </HStack>

                        <HStack alignItems="center" space="sm" mt="$1">
                            <Text
                                fontFamily="$novaBody"
                                fontSize="$md"
                                color="$gray600"
                                lineHeight={20}
                            >
                                @{username}
                            </Text>
                            {lastAccessAt && (
                                <>
                                    <Box
                                        width={4}
                                        height={4}
                                        borderRadius="$full"
                                        bg="$gray400"
                                    />
                                    <Text
                                        fontFamily="$novaBody"
                                        fontSize="$md"
                                        lineHeight={20}
                                        color="$gray600"
                                    >
                                        Ultima conexão{" "}
                                        {formatLastAccess(lastAccessAt)}
                                    </Text>
                                </>
                            )}
                        </HStack>

                        {bio && (
                            <Text
                                fontFamily="$novaBody"
                                fontSize="$md"
                                color="$black"
                                lineHeight={24}
                            >
                                {bio}
                            </Text>
                        )}
                    </VStack>
                </>
            )}
        </VStack>
    );
};
