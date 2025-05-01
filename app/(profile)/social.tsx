import { useState } from "react";

import { Alert } from "react-native";

import { useRouter } from "expo-router";

import {
    VStack,
    Text,
    ScrollView,
    Box,
    Input,
    InputField,
    InputIcon,
    InputSlot,
} from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfile } from "@/connection/auth/UserConnection";

import { useAuth } from "@/Context/AuthProvider";

import Linkedin from "@/assets/icons/socialIcons/linkedin.svg";
import Instagram from "@/assets/icons/socialIcons/instagram.svg";
import Facebook from "@/assets/icons/socialIcons/facebook.svg";
import Twitter from "@/assets/icons/socialIcons/x.svg";
import Youtube from "@/assets/icons/socialIcons/youtube.svg";
import Tiktok from "@/assets/icons/socialIcons/tiktok.svg";

import { toast } from "burnt";

const socialNetworks = [
    { name: "Facebook", icon: Facebook, color: "#4267B2" },
    { name: "Instagram", icon: Instagram, color: "#C13584" },
    { name: "TikTok", icon: Tiktok, color: "#000000" },
    { name: "YouTube", icon: Youtube, color: "#FF0000" },
    { name: "LinkedIn", icon: Linkedin, color: "#0077B5" },
    { name: "Twitter", icon: Twitter, color: "#1DA1F2" },
];

const getBaseUrl = (socialName: string): string => {
    switch (socialName) {
        case "Facebook":
            return "https://www.facebook.com/";
        case "Instagram":
            return "https://www.instagram.com/";
        case "TikTok":
            return "https://www.tiktok.com/@";
        case "YouTube":
            return "https://www.youtube.com/@";
        case "LinkedIn":
            return "https://www.linkedin.com/in/";
        case "Twitter":
            return "https://x.com/";
        default:
            return "";
    }
};

const SocialScreen = () => {
    const router = useRouter();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [socialLinks, setSocialLinks] = useState(
        socialNetworks.map((network) => ({
            ...network,
            url:
                user?.links.find((link) => link.name === network.name)?.url ||
                "",
        })),
    );

    const { mutate: updateUserProfile, isPending } = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authenticatedUser"] });
            router.back();
            toast({
                title: "Redes sociais atualizadas com sucesso",
                duration: 3000,
            });
        },
        onError: () => {
            Alert.alert(
                "Erro",
                "Não foi possível atualizar suas redes sociais.",
            );
        },
    });

    const handleSave = () => {
        const validLinks = socialLinks.filter((link) => link.url.trim() !== "");

        const hasInvalidLinks = validLinks.some(
            (link) => !link.url.startsWith(getBaseUrl(link.name)),
        );

        if (hasInvalidLinks) {
            toast({
                title: "URL inválida",
                duration: 3000,
            });
            return;
        }

        const links = validLinks.map((link) => ({
            name: link.name,
            url: link.url,
        }));

        updateUserProfile({
            links: links,
        });
    };

    const updateSocialLink = (index: number, url: string) => {
        const updatedLinks = [...socialLinks];
        updatedLinks[index].url = url;
        setSocialLinks(updatedLinks);
    };

    return (
        <BaseContainer>
            <VStack flex={1}>
                <HeaderContainer
                    title="Social"
                    namebuttontab="Salvar"
                    onSave={handleSave}
                    isLoading={isPending}
                />

                <Text fontSize={18} color="$gray900" mt="$5" mb="$8">
                    Conecte suas redes sociais para aumentar sua visibilidade e
                    facilitar o acesso ao seu conteúdo.
                </Text>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 20,
                    }}
                >
                    <VStack space="lg">
                        {socialLinks.map((social, index) => (
                            <Box key={index}>
                                <Text
                                    fontSize={18}
                                    color="$gray900"
                                    mb="$2"
                                    fontWeight="$medium"
                                >
                                    {social.name}
                                </Text>
                                <Input
                                    size="xl"
                                    borderWidth={1}
                                    height="$12"
                                    borderColor="$gray400"
                                    borderRadius="$lg"
                                >
                                    <InputSlot
                                        alignItems="center"
                                        justifyContent="center"
                                        pl="$3"
                                    >
                                        <InputIcon>
                                            <social.icon
                                                width={23}
                                                height={23}
                                            />
                                        </InputIcon>
                                    </InputSlot>
                                    <InputField
                                        pl="$3"
                                        fontSize={17}
                                        placeholder={
                                            getBaseUrl(social.name) +
                                            "seu-perfil"
                                        }
                                        value={social.url}
                                        onChangeText={(text) =>
                                            updateSocialLink(index, text)
                                        }
                                    />
                                </Input>
                            </Box>
                        ))}
                    </VStack>
                </ScrollView>
            </VStack>
        </BaseContainer>
    );
};

export default SocialScreen;
