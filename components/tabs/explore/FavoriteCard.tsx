
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
        <Pressable onPress={onPress} width={76} height={86} >
            <Avatar width={61} height={61} rounded="$full">
                <AvatarFallbackText size="2xl">{name}</AvatarFallbackText>
                <AvatarImage
                    rounded="$full"
                    source={{
                        uri: icon,
                    }}
                    alt="Foto de perfil"
                />
                {isOnline && <AvatarBadge bgColor="#339058" />}
            </Avatar>
            <Text
                width="$full"
                maxWidth={60}
                textAlign="left"
                fontFamily="$body"
                color="$gray900"
                lineHeight={20}
                numberOfLines={1}
                fontSize={12}
                pt="$1"                                     
            >
                {name}
            </Text>
        </Pressable>
    );
};