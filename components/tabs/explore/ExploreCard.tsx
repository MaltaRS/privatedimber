import { Colors } from "@/constants/Colors";

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Box,
    Card,
    HStack,
    Text,
    VStack,
    Pressable,
} from "@/gluestackComponents";

import { SealCheck, Tag, ChatCircleDots, Heart } from "phosphor-react-native";

export type ExploreCardProps = {
    id: string;
    icon: string;
    name: string;
    tags: string[];
    price: string;
    isChecked: boolean;
    chatCount: number;
    liked: boolean;
    onLike: (id: string) => void;
    onPress: () => void;
};

const ExploreAvatar = ({
    name,
    imageLink,
}: {
    name: string;
    imageLink: string;
}) => (
    <Avatar size="xl" rounded="$lg">
        <AvatarFallbackText>{name}</AvatarFallbackText>
        <AvatarImage
            rounded="$lg"
            source={{
                uri: imageLink,
            }}
            alt={`Foto de perfil de ${name}`}
        />
    </Avatar>
);

const ExploreTags = ({ tags }: { tags: string[] }) => (
    <HStack gap="$1" flexWrap="wrap">
        {tags
            .filter((_, i) => i <= 1)
            .map((tag, index) => (
                <Box
                    key={index}
                    py={2}
                    px="$2"
                    borderWidth={1}
                    borderColor="#9CA3AF"
                    rounded="$full"
                >
                    <Text textAlign="center" size="sm" color="#9CA3AF">
                        {tag}
                    </Text>
                </Box>
            ))}
    </HStack>
);

const ExplorePrice = ({ price }: { price: string }) => (
    <HStack gap="$2">
        <Tag size={20} color="#111827" />
        <Text size="sm" color="#111827" fontWeight="bold">
            {price}
        </Text>
    </HStack>
);

const ExploreChatCount = ({ chatCount }: { chatCount: number }) => (
    <Box
        rounded="$sm"
        bgColor="#F3F4F6"
        py="$1"
        px="$3"
        justifyContent="center"
        alignItems="center"
    >
        <ChatCircleDots size={18} color="#9CA3AF" />
        <Text size="sm" color="#9CA3AF">
            {chatCount}
        </Text>
    </Box>
);

const ExploreLikeButton = ({
    liked,
    onLike,
}: {
    liked: boolean;
    onLike: () => void;
}) => (
    <Pressable
        rounded="$sm"
        bgColor="#F3F4F6"
        py="$1"
        px="$3"
        justifyContent="center"
        alignItems="center"
        onPress={onLike}
        flex={1}
    >
        <Heart size={22} color="#FF6378" weight={liked ? "fill" : "regular"} />
    </Pressable>
);

export const ExploreCard = ({
    id,
    icon,
    name,
    isChecked,
    tags,
    price,
    chatCount,
    liked,
    onLike,
    onPress,
}: ExploreCardProps) => {
    return (
        <Pressable onPress={onPress}>
            <Card variant="ghost" p="$0">
                <HStack justifyContent="space-between" alignItems="center">
                    <HStack gap="$4">
                        <ExploreAvatar name={name} imageLink={icon} />
                        <VStack
                            gap="$1"
                            justifyContent="space-between"
                            width="55%"
                            maxWidth="55%"
                        >
                            <VStack maxWidth="$full">
                                <HStack alignItems="center" gap="$1">
                                    <Text size="lg" fontWeight="$bold">
                                        {name}
                                    </Text>
                                    {isChecked && (
                                        <SealCheck
                                            size={20}
                                            color={Colors.primaryDefault}
                                            weight="fill"
                                        />
                                    )}
                                </HStack>
                                <ExploreTags tags={tags} />
                            </VStack>
                            <ExplorePrice price={price} />
                        </VStack>
                    </HStack>
                    <VStack gap={9} alignItems="stretch">
                        <ExploreChatCount chatCount={chatCount} />
                        <ExploreLikeButton
                            liked={liked}
                            onLike={() => onLike(id)}
                        />
                    </VStack>
                </HStack>
            </Card>
        </Pressable>
    );
};
