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

import { Star } from "lucide-react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
}: {
    name: string;
    imageLink: string;
}) => (
    <Avatar
        margin="$3"
        width={128}
        rounded="$full"
        height={128}
        position="relative"
    >
        <AvatarFallbackText fontSize={60}>{name}</AvatarFallbackText>
        <AvatarImage
            width={128}
            rounded="$full"
            height={128}
            position="relative"
            source={imageLink ? { uri: imageLink } : undefined}
            alt={"Foto de perfil de ${name}"}
        />
    </Avatar>
);

const CardTags = ({ tags }: { tags: string[] }) => (
    <Text size="xs" lineHeight={16} flexWrap="wrap" color="$gray600">
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
        borderWidth={0.9}
        borderColor="#00A8FF"
        borderBottomLeftRadius={12}
        borderBottomRightRadius={12}
        p="$2"
    >
        <Text size="lg" fontFamily="$heading" color="#fff" lineHeight={24}>
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
        py={8}
        px={19}
        width={20}
        height={20}
        justifyContent="center"
        alignItems="center"
        onPress={onLike}
        position="absolute"
        top={6}
        right={2}
    >
        <Star
            size={22}
            color={liked ? "#FDD015" : "#D1D5DB"}
            fill={liked ? "#FDD015" : "none"}
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
        <Pressable onPress={onPress} w="48.5%" mb="$3">
            <Card
                variant="ghost"
                p="$0"
                bgColor="#fff"
                borderColor="#E5E7EB"
                borderWidth={0.9}
                borderRadius="$3xl"
            >
                <VStack alignItems="center">
                    <CardAvatar name={name} imageLink={icon} />
                    <ImageLikeButton liked={liked} onLike={() => onLike(id)} />
                    <VStack w="$full">
                        <VStack w="$full">
                            <HStack
                                w="$full"
                                marginLeft={4}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text
                                    mt="$1"
                                    fontSize="$xl"
                                    color="$gray900"
                                    fontFamily="$novaTitle"
                                    lineHeight={20}
                                    maxWidth={140}
                                    numberOfLines={1}
                                >
                                    {name}
                                </Text>
                                {isChecked && (
                                    <MaterialIcons
                                        name="verified"
                                        size={13}
                                        color="#00A8FF"
                                        style={{ marginLeft: 4 }}
                                    />
                                )}
                            </HStack>
                            <HStack
                                alignItems="center"
                                gap="$1"
                                justifyContent="center"
                            >
                                <CardTags tags={tags} />
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
