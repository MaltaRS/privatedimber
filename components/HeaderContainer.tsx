import React from "react";

import { TouchableOpacity } from "react-native";

import { Box, HStack, Text } from "@/gluestackComponents";

import { useRouter } from "expo-router";

import { GoBack } from "@/components/utils/GoBack";

type HeaderContainerProps = {
    title: string;

    namebuttontab?: string;

    onSave?: () => void;
};

const HeaderContainer = ({
    title,
    namebuttontab,
    onSave,
}: HeaderContainerProps) => {
    const router = useRouter();

    return (
        <HStack
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            px="$1"
        >
            <GoBack onPress={() => router.back()} iconSize={23} />

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

            {namebuttontab && (
                <TouchableOpacity
                    style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                    onPress={() => {
                        onSave && onSave();
                        console.log(`${namebuttontab} pressionado`);
                    }}
                >
                    <Text color="#00A8FF" fontSize={17}>
                        {namebuttontab}
                    </Text>
                </TouchableOpacity>
            )}
        </HStack>
    );
};

export default HeaderContainer;
