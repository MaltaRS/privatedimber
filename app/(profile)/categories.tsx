import { useState } from "react";
import { useRouter } from "expo-router";
import {
    VStack,
    Text,
    ScrollView,
    Pressable,
    HStack,
    Box,
} from "@/gluestackComponents";
import { Check } from "lucide-react-native";
import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";
import { useAuth } from "@/Context/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/connection/auth/UserConnection";
import { toast } from "burnt";
import { useTranslation } from "react-i18next";

const tags = [
    "Artista",
    "Empresário",
    "Influencer",
    "Moda e Beleza",
    "Religião",
    "Tecnologia",
    "Moda",
    "Esporte",
];

const TagsScreen = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [selectedTags, setSelectedTags] = useState<string[]>(user?.tags || []);

    const { mutate: updateUserProfile, isPending } = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authenticatedUser"] });
            router.back();
        },
    });

    const handleSave = () => {
        updateUserProfile({ tags: selectedTags });
        toast({
            title: t("tags.toastSuccess"),
            duration: 3000,
        });
    };

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
        );
    };

    return (
        <BaseContainer>
            <VStack flex={1}>
                <HeaderContainer
                    title={t("tags.title")}
                    namebuttontab={t("tags.save")}
                    onSave={handleSave}
                    isLoading={isPending}
                />

                <Text fontSize={17} color="$gray900" lineHeight={25} my="$5">
                    {t("tags.description")}
                </Text>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    <VStack space="lg" px="$2">
                        {tags.map((tag) => (
                            <Pressable
                                key={tag}
                                onPress={() => toggleTag(tag)}
                                width="100%"
                                py="$3"
                                borderBottomWidth={1}
                                borderBottomColor="$gray200"
                            >
                                <HStack
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Text fontSize={19} color="$gray900">
                                        {tag}
                                    </Text>
                                    <Box
                                        width="$6"
                                        height="$6"
                                        borderRadius="$full"
                                        borderWidth={2}
                                        borderColor={
                                            selectedTags.includes(tag)
                                                ? "$primaryDefault"
                                                : "$gray400"
                                        }
                                        bg={
                                            selectedTags.includes(tag)
                                                ? "$primaryDefault"
                                                : "transparent"
                                        }
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        {selectedTags.includes(tag) && (
                                            <Check size={14} color="white" />
                                        )}
                                    </Box>
                                </HStack>
                            </Pressable>
                        ))}
                    </VStack>
                </ScrollView>
            </VStack>
        </BaseContainer>
    );
};

export default TagsScreen;
