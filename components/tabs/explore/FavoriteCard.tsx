import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    AvatarBadge,
    Text,
    Pressable,
    Box,
} from "@/gluestackComponents";

export type FavoriteCardProps = {
    icon: string;
    name: string;
    isOnline: boolean;
    positionRank?: number; // novo campo opcional
    onPress: () => void;
};

export const FavoriteCard = ({
    icon,
    name,
    isOnline,
    positionRank,
    onPress,
}: FavoriteCardProps) => {
    return (
        <Pressable
            onPress={onPress}
            width={60}
            height={80}
            alignItems="center"
        >
            <Box position="relative">
                <Avatar width={60} height={60} rounded="$full" bg="$gray200">
                    <AvatarFallbackText size="xl">{name}</AvatarFallbackText>
                    <AvatarImage
                        rounded="$full"
                        source={icon ? { uri: icon } : undefined}
                        alt="Foto de perfil"
                    />
                    {isOnline && <AvatarBadge bgColor="#339058" />}
                </Avatar>

                {positionRank !== undefined && (
                    <Box
                        position="absolute"
                        top={1}
                        right={-2}
                        bg="#00A8FF"
                        px={4}
                        py={1}
                        borderBottomLeftRadius={8}
                        borderTopRightRadius={10}
                        zIndex={1}
                    >
                        <Text fontSize={10} fontWeight="bold" color="#FFF">
                            {positionRank}º
                        </Text>
                    </Box>
                )}
            </Box>

            <Text
                width="$full"
                maxWidth={80}
                textAlign="center"
                fontFamily="$Inter_500Medium"
                color="$gray800"
                lineHeight={14}
                numberOfLines={1}
                size="2xs"
                mt="$1"
            >
                {name}
            </Text>
        </Pressable>
    );
};