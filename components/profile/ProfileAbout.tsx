import React, { useState } from "react";
import { VStack, Text, Box, HStack } from "@/gluestackComponents";
import { Pressable } from "react-native";
import { CategoryTag } from "./CategoryTag";

interface ProfileAboutProps {
    content: string | null | undefined;
    tags?: string[];
    interests?: string[];
}

export const ProfileAbout: React.FC<ProfileAboutProps> = ({
    content,
    tags = [],
    interests = [],
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_CHARS = 240;
    const displayContent = content || "Sem descrição";
    const shouldShowMore = displayContent.length > MAX_CHARS;
    const truncatedText = shouldShowMore
        ? displayContent.substring(0, MAX_CHARS) + "..."
        : displayContent;

    return (
        <VStack>
            <VStack mt="$6">
                <Text
                    fontSize={20.5}
                    fontFamily="$medium"
                    color="#15161E"
                    lineHeight={22}
                    bold
                >
                    Sobre mim
                </Text>
            </VStack>
            <VStack width="100%">
                <Text
                    fontFamily="$novaMedium"
                    fontSize={18}
                    color="$gray900"
                    textAlign="justify"
                    mt="$2"
                >
                    {isExpanded ? displayContent : truncatedText}
                </Text>
                {shouldShowMore && (
                    <Pressable onPress={() => setIsExpanded(!isExpanded)}>
                        <Text
                            color="$blue500"
                            fontFamily="$novaBody"
                            fontSize="$md"
                            lineHeight={20}
                            mt="$2"
                        >
                            {isExpanded ? "Ver menos" : "Ver mais"}
                        </Text>
                    </Pressable>
                )}
            </VStack>

            <Box
                my="$4"
                width="100%"
                height={6}
                bg="$gray100"
                borderRadius="$sm"
            />

            <VStack my="$4">
                <Text
                    fontSize={20.5}
                    fontFamily="$medium"
                    color="#15161E"
                    lineHeight={22}
                    bold
                >
                    Minhas categorias
                </Text>
                <VStack mt="$6">
                    <HStack flexWrap="wrap" gap="$2">
                        {tags.map((tag, index) => (
                            <CategoryTag key={index} name={tag} />
                        ))}
                    </HStack>
                </VStack>
            </VStack>

            <Box
                my="$2"
                width="100%"
                height={6}
                bg="$gray100"
                borderRadius="$sm"
            />

            <VStack my="$4">
                <Text
                    fontSize={20.5}
                    fontFamily="$medium"
                    color="#15161E"
                    lineHeight={22}
                    bold
                >
                    Meus interesses
                </Text>
                <VStack mt="$6">
                    <HStack flexWrap="wrap" gap="$2">
                        {interests.map((interest, index) => (
                            <CategoryTag key={index} name={interest} />
                        ))}
                    </HStack>
                </VStack>
            </VStack>
        </VStack>
    );
};
