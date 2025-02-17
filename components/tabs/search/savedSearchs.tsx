import { Pressable } from "react-native";

import {
    HStack,
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    VStack,
    Text,
    Divider,
} from "@/gluestackComponents";

import { formatMoney } from "@/utils/money";

type SavedSearchCardProps = {
    id: string;
    name: string;
    icon: string;
    tags?: string[];
    price: number;
    index: number;
    onPress: () => void;
};

export const SavedSearchCard = ({
    id,
    name,
    icon,
    tags = ["Atleta", "Investidor"],
    price,
    index,
    onPress,
}: SavedSearchCardProps) => {
    const sanitizedName = name.length > 20 ? `${name.slice(0, 20)}...` : name;

    return (
        <Pressable key={index} onPress={onPress}>
            <HStack
                gap="$2"
                justifyContent="space-between"
                alignItems="center"
                p="$2"
                pl="$0"
            >
                <HStack gap="$3" w="$full">
                    <Avatar width={92} height={92} rounded="$lg">
                        <AvatarFallbackText fontSize={30}>
                            {name}
                        </AvatarFallbackText>
                        {icon && (
                            <AvatarImage
                                rounded="$lg"
                                source={{
                                    uri: icon,
                                }}
                                alt={`Foto de perfil de ${name}`}
                            />
                        )}
                    </Avatar>
                    <VStack justifyContent="space-between" py={2} w="$full">
                        <VStack>
                            <Text
                                fontFamily="$heading"
                                fontSize={23}
                                color="#000"
                                lineHeight="$lg"
                            >
                                {sanitizedName}
                            </Text>
                            <Text
                                fontSize={16}
                                flexWrap="wrap"
                                color="$gray800"
                            >
                                {tags
                                    .filter((_, i) => i <= 1)
                                    .map(
                                        (tag, index) =>
                                            tag + (index === 1 ? "" : ", "),
                                    )}
                            </Text>
                        </VStack>
                        <VStack>
                            <Text
                                fontSize={22}
                                fontFamily="$arialHeading"
                                color="#111827"
                                fontWeight="bold"
                            >
                                {formatMoney(price)}
                            </Text>
                            <Divider bgColor="$gray300" mt="$1" w="$full" />
                        </VStack>
                    </VStack>
                </HStack>
            </HStack>
        </Pressable>
    );
};
