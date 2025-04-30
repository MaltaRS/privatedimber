import { Linking } from "react-native";

import { VStack, HStack, Text, Pressable } from "@/gluestackComponents";

import Linkedin from "@/assets/icons/socialIcons/linkedin.svg";
import Instagram from "@/assets/icons/socialIcons/instagram.svg";
import Facebook from "@/assets/icons/socialIcons/facebook.svg";
import Twitter from "@/assets/icons/socialIcons/x.svg";
import Youtube from "@/assets/icons/socialIcons/youtube.svg";
import Tiktok from "@/assets/icons/socialIcons/tiktok.svg";

const socialNetworks = [
    { name: "Facebook", icon: "facebook", color: "#4267B2" },
    { name: "Instagram", icon: "instagram", color: "#C13584" },
    { name: "TikTok", icon: "music", color: "#000000" },
    { name: "YouTube", icon: "youtube", color: "#FF0000" },
    { name: "LinkedIn", icon: "linkedin", color: "#0077B5" },
    { name: "Twitter", icon: "twitter", color: "#1DA1F2" },
];

interface SocialLinksProps {
    links?: { name: string; url: string }[];
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links = [] }) => {
    const handleSocialPress = (url: string) => {
        if (!url) return;
        Linking.openURL(url);
    };

    return (
        <VStack>
            <VStack my="$6">
                <Text
                    fontSize={20.5}
                    fontFamily="$medium"
                    color="#15161E"
                    lineHeight={22}
                    bold
                >
                    Social
                </Text>
                <HStack mt="$4" flexWrap="wrap" gap="$4">
                    {links &&
                        links.map((link, index) => {
                            const social = socialNetworks.find(
                                (s) => s.name === link.name,
                            );
                            if (!social) return null;

                            const Icon =
                                {
                                    Facebook: Facebook,
                                    Instagram: Instagram,
                                    TikTok: Tiktok,
                                    YouTube: Youtube,
                                    LinkedIn: Linkedin,
                                    Twitter: Twitter,
                                }[social.name] ?? null;

                            return (
                                <Pressable
                                    key={index}
                                    onPress={() => handleSocialPress(link.url)}
                                    bg="$gray100"
                                    p="$3"
                                    borderRadius="$lg"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {Icon && <Icon width={24} height={24} />}
                                </Pressable>
                            );
                        })}
                </HStack>
            </VStack>
        </VStack>
    );
};
