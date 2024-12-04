import {
    VStack,
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    AvatarBadge,
    Text,
} from "@/gluestackComponents";

export type FavoriteCardProps = {
    icon: string;
    name: string;
    isActive: boolean;
};

export const FavoriteCard = ({ icon, name, isActive }: FavoriteCardProps) => {
    return (
        <VStack>
            <Avatar size="lg" rounded="$lg">
                <AvatarFallbackText>{name}</AvatarFallbackText>
                <AvatarImage
                    rounded="$lg"
                    source={{
                        uri: icon,
                    }}
                    alt="Foto de perfil"
                />
                {isActive && <AvatarBadge bgColor="#339058" />}
            </Avatar>
            <Text
                width="$full"
                maxWidth={64}
                textAlign="center"
                fontWeight="$bold"
                numberOfLines={2}
            >
                {name}
            </Text>
        </VStack>
    );
};
