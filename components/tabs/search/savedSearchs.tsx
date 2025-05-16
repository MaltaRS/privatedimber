import {
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  VStack,
  Text,
  Pressable,
  Box,
  Card,
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
  position?: number;
};

const CardBadge = ({ position }: { position?: number }) => (
  position !== undefined ? (
    <Box
      position="absolute"
      top={6}
      left={6}
      bgColor="#0086D1"
      px="$2"
      py="$1"
      borderRadius={12}
      zIndex={10}
    >
      <Text size="xs" fontFamily="$heading" color="#fff">
        #{position}
      </Text>
    </Box>
  ) : null
);

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
  position,
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
    <Pressable key={index} onPress={onPress} w="$full" mb="$3">
      <Card
        variant="ghost"
        p="$3"
        bgColor="#FFF"
        borderColor="#E5E7EB"
        borderWidth={1}
        rounded="$2xl"
        shadow="4"
        overflow="hidden"
        position="relative"
      >
        <CardBadge position={position} />
        <HStack alignItems="center" space="md">
          <Box position="relative">
            <Avatar width={60} height={60} bg="$gray200" position="relative">
              <AvatarFallbackText size="md">{name}</AvatarFallbackText>
              <AvatarImage
                source={icon ? { uri: icon } : undefined}
                alt={`Foto de perfil de ${name}`}
              />
            </Avatar>
            {showFavorite && (
              <Pressable
                onPress={handleFavoritePress}
                position="absolute"
                bottom={-4}
                left={"50%"}
                transform={[{ translateX: -12 }]}
                bgColor="rgba(249, 250, 246, 0.97)"
                rounded="$full"
                p="$1"
                shadow="2"
                zIndex={10}
              >
                <Star
                  size={16}
                  color={isFavorited ? "#FDD015" : "#D1D5DB"}
                  fill={isFavorited ? "#FDD015" : "none"}
                />
              </Pressable>
            )}
          </Box>
          <VStack flex={1}>
            <HStack alignItems="center" space="sm">
              <Text
                size="sm"
                fontFamily="$Inter_600SemiBold"
                color="#000"
                numberOfLines={1}
                flex={1}
              >
                {sanitizedName}
              </Text>
              {verifiedAt && (
                <MaterialIcons name="verified" size={16} color="#00A8FF" />
              )}
            </HStack>
            <Text size="xs" color="$gray600" numberOfLines={1} mt="$0">
              {tags && tags.length > 0
                ? tags.slice(0, 2).join(", ")
                : "Nenhuma categoria"}
            </Text>
          </VStack>
        </HStack>
      </Card>
    </Pressable>
  );
};