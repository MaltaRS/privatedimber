import React from "react";
import { Box, HStack, Text } from "@/gluestackComponents";

interface CategoryTagProps {
    name: string;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ name }) => {
    return (
        <Box mb="$2" mr="$2">
            <HStack alignItems="center">
                <Box
                    py="$1.5"
                    px="$3"
                    borderRadius="$full"
                    borderWidth={1}
                    borderColor="$gray400"
                >
                    <Text
                        color="$gray600"
                        fontSize={15}
                        textAlign="center"
                        lineHeight={22}
                    >
                        {name}
                    </Text>
                </Box>
            </HStack>
        </Box>
    );
};
