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
    <Avatar
        w="$full"
        height={180}
        rounded={24}
        position="relative"
        bgColor="$primaryDark"
    >
        <AvatarFallbackText fontSize={60}>{name}</AvatarFallbackText>
        <AvatarImage
            width={128}
            rounded="$full"
            height={128}
            position="relative"
            source={{ uri: imageLink }}
            alt={`Foto de perfil de ${name}`}
        />
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
    <HStack
        w="100%"
        mt="$2"
        alignItems="center"
        justifyContent="center"
        bgColor="#00A8FF"
        borderBottomLeftRadius={20}
        borderBottomRightRadius={20}
        p="$2"
    >
        <Text size="lg" fontFamily="$novaTitle" color="#fff" lineHeight={24}>
            {price}
        </Text>
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
        <Pressable onPress={onPress} w="49%" pb="$3" p="$1">
            <Card
                variant="ghost"
                style={{
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    borderWidth: 0.9,
                    borderColor: "#E5E7EB",
                }}
            >
                <VStack alignItems="center">
                    <CardAvatar name={name} imageLink={icon} />
                    <VStack w="$full">
                        <VStack w="$full">
                            <HStack alignItems="center" justifyContent="center">
                                <Text
                                    size="lg"
                                    color="#15161E"
                                    fontFamily="$novaTitle"
                                    lineHeight={24}
                                >
                                    {name}
                                </Text>
                            </HStack>
                            <HStack
                                alignItems="center"
                                gap="$1"
                                justifyContent="center"
                            >
                                <CardTags tags={["Atleta", "Investidor"]} />
                            </HStack>
                        </VStack>
                        <HStack alignItems="center" justifyContent="center">
                            <CardPrice price={price} />
                        </HStack>
                    </VStack>
                </VStack>
            </Card>
        </Pressable>
    );
};
