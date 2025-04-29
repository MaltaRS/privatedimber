import { View } from "react-native";

import { Box, HStack, Pressable, Text } from "@/gluestackComponents";

type TabButtonProps = {
    title: string;
    isActive: boolean;
    onPress: () => void;
};

export const TabButton = ({ title, isActive, onPress }: TabButtonProps) => (
    <Pressable
        onPress={onPress}
        flex={1}
        py={8}
        backgroundColor={isActive ? "$white" : "transparent"}
        borderRadius="$full"
        elevation={isActive ? 6 : 0}
    >
        <HStack space="sm" alignItems="center" justifyContent="center">
            {isActive && (
                <Box bg="$white" width={4} height={4} borderRadius={2} />
            )}
            <Text
                textAlign="center"
                fontSize={20}
                fontFamily="$novaTitle"
                lineHeight={24}
                color={isActive ? "$gray900" : "$gray500"}
            >
                {title}
            </Text>
        </HStack>
    </Pressable>
);
