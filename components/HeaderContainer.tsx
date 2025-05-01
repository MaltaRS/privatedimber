import { Box, HStack, Text, Pressable } from "@/gluestackComponents";

import { useRouter } from "expo-router";

import { GoBack } from "@/components/utils/GoBack";

type HeaderContainerProps = {
    title: string;
    showTitle?: boolean;
    namebuttontab?: string;
    onBackPress?: () => void;
    onSave?: () => void;
    isLoading?: boolean;
};

const HeaderContainer = ({
    title,
    showTitle = true,
    namebuttontab,
    onSave,
    onBackPress,
    isLoading = false,
}: HeaderContainerProps) => {
    const router = useRouter();

    return (
        <HStack
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            px="$1"
            pb={4}
        >
            <GoBack
                onPress={onBackPress ? onBackPress : () => router.back()}
                iconSize={22}
            />

            {showTitle && (
                <Box
                    flex={1}
                    alignItems="center"
                    justifyContent="center"
                    position="absolute"
                    left="50%"
                    top="60%"
                    transform="translate(-50%, -50%)"
                >
                    <Text
                        fontFamily="$medium"
                        fontSize={20}
                        color="#000"
                        textAlign="center"
                        bold
                        lineHeight={20}
                    >
                        {title}
                    </Text>
                </Box>
            )}

            {namebuttontab && (
                <Pressable
                    bg="$primaryDefault"
                    rounded="$full"
                    py={9}
                    px="$4"
                    onPress={() => {
                        onSave && onSave();
                    }}
                    disabled={isLoading}
                >
                    <Text
                        color="$white"
                        fontFamily="$heading"
                        fontWeight="$bold"
                        size="md"
                    >
                        {namebuttontab}
                    </Text>
                </Pressable>
            )}
        </HStack>
    );
};

export default HeaderContainer;
