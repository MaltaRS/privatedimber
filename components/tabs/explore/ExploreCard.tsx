import { Colors } from "@/constants/Colors";

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Card,
    HStack,
    Text,
    VStack,
    Pressable,
} from "@/gluestackComponents";

import { ArrowUp, Heart } from "lucide-react-native";

export type ExploreCardProps = {
    id: string;
    icon: string;
    name: string;
    tags: string[];
    price: string;
    isChecked: boolean;
    liked: boolean;
    onLike: (id: string) => void;
    onPress: () => void;
};

const CardAvatar = ({
    name,
    imageLink,
    liked,
    onLike,
}: {
    name: string;
    imageLink: string;
    liked: boolean;
    onLike: () => void;
}) => (
    <Avatar w="$full" height={180} rounded={24} position="relative">
        <AvatarFallbackText fontSize={60}>{name}</AvatarFallbackText>
        <AvatarImage
            rounded={24}
            source={{
                uri: imageLink,
            }}
            alt={`Foto de perfil de ${name}`}
        />
        <ImageLikeButton liked={liked} onLike={onLike} />
    </Avatar>
);

const CardTags = ({ tags }: { tags: string[] }) => (
    <Text size="sm" flexWrap="wrap" color="$gray800">
        {tags
            .filter((_, i) => i <= 1)
            .map((tag, index) => tag + (index === 1 ? "" : ", "))}
    </Text>
);

const CardPrice = ({ price }: { price: string }) => (
    <HStack gap="$2" mt="$2" alignItems="center">
        <Text
            fontSize={20}
            fontFamily="$heading"
            color="#111827"
            fontWeight="bold"
        >
            {price}
        </Text>
        <HStack
            p={2}
            px="$1"
            bgColor="$gray200"
            rounded="$sm"
            alignItems="center"
            gap="$1"
        >
            <ArrowUp size={16} color={Colors.gray700} />
            <Text fontSize={17} color="$gray700" fontWeight="bold">
                25%
            </Text>
        </HStack>
    </HStack>
);

const ImageLikeButton = ({
    liked,
    onLike,
}: {
    liked: boolean;
    onLike: () => void;
}) => (
    <Pressable
        rounded="$full"
        bgColor="#F8F8F950"
        py="$2"
        px="$2"
        justifyContent="center"
        alignItems="center"
        onPress={onLike}
        position="absolute"
        bottom={8}
        right={8}
    >
        <Heart
            size={25}
            color={liked ? "#FF6378" : "#fff"}
            fill={liked ? "#FF6378" : "none"}
        />
    </Pressable>
);

export const ExploreCard = ({
    id,
    icon,
    name,
    isChecked,
    tags,
    price,
    liked,
    onLike,
    onPress,
}: ExploreCardProps) => {
    return (
        <Pressable onPress={onPress} w="47.5%">
            <Card variant="ghost" p="$0">
                <VStack alignItems="center">
                    <CardAvatar
                        name={name}
                        imageLink={icon}
                        liked={liked}
                        onLike={() => onLike(id)}
                    />
                    <VStack gap="$1" p="$2" w="$full">
                        <HStack
                            alignItems="center"
                            gap="$1"
                            justifyContent="flex-start"
                        >
                            <Text size="lg" color="#000" fontWeight="$bold">
                                {name}
                            </Text>
                            {/* {isChecked && (
                                <SealCheck
                                    size={20}
                                    color={Colors.primaryDefault}
                                    weight="fill"
                                />
                            )} */}
                        </HStack>
                        <CardTags tags={["Atleta", "Investidor"]} />
                        <CardPrice price={price} />
                    </VStack>
                </VStack>
            </Card>
        </Pressable>
    );
};
