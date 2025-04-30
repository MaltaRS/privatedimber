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
        <Pressable
            onPress={onPress}
            width={76}
            height={100}
            alignItems="center"
        >
            <Avatar width={70} height={70} rounded="$full">
                <AvatarFallbackText size="2xl">{name}</AvatarFallbackText>
                <AvatarImage
                    rounded="$full"
                    source={
                        icon
                            ? {
                                  uri: icon,
                              }
                            : undefined
                    }
                    alt="Foto de perfil"
                />
                {isOnline && <AvatarBadge bgColor="#339058" />}
            </Avatar>
            <Text
                width="$full"
                maxWidth={76}
                textAlign="center"
                fontFamily="$novaBody"
                color="$gray900"
                lineHeight={20}
                numberOfLines={1}
                fontSize={15}
                mt="$1"
            >
                {name}
            </Text>
        </Pressable>
    );
};
