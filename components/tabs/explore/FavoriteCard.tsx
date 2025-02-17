import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    AvatarBadge,
    Text,
    Pressable,
} from "@/gluestackComponents";

export type FavoriteCardProps = {
    icon: string;
    name: string;
    isOnline: boolean;
    onPress: () => void;
};

export const FavoriteCard = ({
    icon,
    name,
    isOnline,
    onPress,
}: FavoriteCardProps) => {
    return (
        <Pressable onPress={onPress}>
            <Avatar width={80} height={80} rounded="$2xl">
                <AvatarFallbackText size="3xl">{name}</AvatarFallbackText>
                <AvatarImage
                    rounded="$lg"
                    source={{
                        uri: icon,
                    }}
                    alt="Foto de perfil"
                />
                {isOnline && <AvatarBadge bgColor="#339058" />}
            </Avatar>
            <Text
                width="$full"
                maxWidth={80}
                textAlign="center"
                fontWeight="$bold"
                color="$gray900"
                numberOfLines={1}
                pt="$1"
            >
                {name}
            </Text>
        </Pressable>
    );
};
