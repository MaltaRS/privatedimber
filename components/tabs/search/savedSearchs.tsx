import {
    HStack,
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    VStack,
    Text,
    Divider,
    Pressable,
} from "@/gluestackComponents";

import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Star } from "lucide-react-native";
import { handleFavorite } from "@/utils/favorites";
import { useQueryClient } from "@tanstack/react-query";

type SavedSearchCardProps = {
    id: string;
    name: string;
    icon: string;
    tags?: string[];
    index: number;
    verifiedAt?: string;
    isFavorited?: boolean;
    showFavorite?: boolean;
    onPress: () => void;
};

export const SavedSearchCard = ({
    id,
    name,
    icon,
    tags,
    index,
    verifiedAt,
    isFavorited,
    showFavorite,
    onPress,
}: SavedSearchCardProps) => {
    const queryClient = useQueryClient();
    const sanitizedName = name.length > 14 ? `${name.slice(0, 14)}...` : name;

    const handleFavoritePress = () => {
        if (!id || !showFavorite) return;
        handleFavorite({
            id,
            isFavorited: !!isFavorited,
            queryClient,
        });
    };

    return (
        <Pressable key={index} onPress={onPress}>
            <HStack
                gap="$2"
                justifyContent="center"
                alignItems="center"
                pr="$2"
                pl="$0"
            >
                <HStack gap="$3" flex={1}>
                    <Avatar
                        width={64}
                        height={64}
                        rounded="$full"
                        bgColor="$primaryDark"
                    >
                        <AvatarFallbackText fontSize={30}>
                            {name}
                        </AvatarFallbackText>
                        {icon && (
                            <AvatarImage
                                source={
                                    icon
                                        ? {
                                              uri: icon,
                                          }
                                        : undefined
                                }
                                alt={`Foto de perfil de ${name}`}
                            />
                        )}
                    </Avatar>
                    <VStack justifyContent="space-between" py={2} flex={1}>
                        <HStack
                            alignItems="center"
                            justifyContent="space-between"
                            gap="$2"
                            flex={1}
                            mt="$2"
                        >
                            <VStack gap={2} flex={1}>
                                <HStack>
                                    <Text
                                        fontFamily="$heading"
                                        fontSize={22}
                                        color="#000"
                                        lineHeight="$lg"
                                    >
                                        {sanitizedName}
                                    </Text>
                                    {verifiedAt && (
                                        <MaterialIcons
                                            name="verified"
                                            size={22}
                                            color="#00A8FF"
                                            style={{ marginLeft: 6 }}
                                        />
                                    )}
                                </HStack>

                                <Text
                                    fontSize={17}
                                    flexWrap="wrap"
                                    color="$gray800"
                                >
                                    {tags && tags.length > 0
                                        ? tags
                                              .filter((_, i) => i <= 1)
                                              .map(
                                                  (tag, index) =>
                                                      tag +
                                                      (index === 1 ? "" : ", "),
                                              )
                                        : "Nenhuma categoria"}
                                </Text>
                            </VStack>
                            {showFavorite && (
                                <Pressable
                                    onPress={handleFavoritePress}
                                    borderRadius="$full"
                                    alignItems="center"
                                    justifyContent="center"
                                    p="$2"
                                    bgColor="$gray100"
                                >
                                    <Star
                                        size={26}
                                        color={
                                            isFavorited ? "#FDD015" : "#A9B1BD"
                                        }
                                        fill={isFavorited ? "#FDD015" : "none"}
                                    />
                                </Pressable>
                            )}
                        </HStack>
                        <Divider bgColor="$gray300" mt={7} w="$full" />
                    </VStack>
                </HStack>
            </HStack>
        </Pressable>
    );
};
