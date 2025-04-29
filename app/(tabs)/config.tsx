import { useState } from "react";

import { ScrollView, View } from "react-native";

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    HStack,
    VStack,
    Text,
    Pressable,
} from "@/gluestackComponents";

import TitleContainer from "@/components/TitleContainer";
import { useRouter } from "expo-router";
import { Box, ChevronRight } from "lucide-react-native";

import { useGoogleAuth } from "@/Context/GoogleAuthProvider";
import { useAuth } from "@/Context/AuthProvider";
import { Colors } from "@/constants/Colors";
import { ConfigCard } from "@/components/tabs/config/configCard";
import { BaseContainer } from "@/components/BaseContainer";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { GoBack } from "@/components/utils/GoBack";

const ConfigScreen = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { signOut } = useGoogleAuth();

    const [modalVisible, setModalVisible] = useState(false);

    const handleSignOut = async () => {
        setModalVisible(false);
        await signOut();
    };

    const HeaderContainer = ({ title }: { title: string }) => (
        <HStack
            pt="$1"
            justifyContent="space-between"
            width="100%"
            position="relative"
        >
            <GoBack onPress={() => router.push("/explore")} />
            <Text
                fontFamily="$medium"
                fontSize={20}
                color="#000"
                textAlign="center"
                pt="$2"
                lineHeight={20}
                flex={1}
            >
                {title}
                <View style={{ width: 50 }} />
            </Text>
        </HStack>
    );

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title="Configurações" />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 86 }}
                >
                    <VStack p="$1" pt="$2" gap="$2">
                        <Pressable
                            bgColor="#fff"
                            px="$4"
                            py="$3"
                            borderRadius="$xl"
                            alignItems="center"
                            justifyContent="space-between"
                            elevation={2}
                            flexDirection="row"
                            onPress={() => router.push("/(profile)/myprofile")}
                        >
                            <HStack gap="$5" alignItems="center">
                                <Avatar width={56} height={56}>
                                    <AvatarFallbackText>
                                        {user?.name}
                                    </AvatarFallbackText>
                                    <AvatarImage
                                        source={{
                                            uri: user?.icon,
                                        }}
                                        alt={user?.name}
                                    />
                                </Avatar>
                                <VStack gap="$1">
                                    <Text
                                        size="lg"
                                        fontFamily="$heading"
                                        color="#000"
                                        lineHeight={24}
                                    >
                                        {user?.name}
                                    </Text>
                                    <Text
                                        fontSize={17}
                                        color="#6B7280"
                                        fontFamily="$novaBody"
                                        lineHeight={20}
                                    >
                                        Ver perfil
                                    </Text>
                                </VStack>
                            </HStack>
                            <Box>
                                <ChevronRight
                                    size={24}
                                    color={Colors.gray500}
                                    strokeWidth={3}
                                />
                            </Box>
                        </Pressable>
                        <Text
                            my="$4"
                            fontSize={21}
                            fontFamily="$heading"
                            color="#000"
                            lineHeight={24}
                        >
                            Mensagens
                        </Text>
                        <ConfigCard
                            items={[
                                {
                                    title: "Notificações",
                                    href: "/(config)/(message)/notifications",
                                },
                                {
                                    title: "Definir valores",
                                    href: "/(config)/(message)/values",
                                },
                                {
                                    title: "Permissões",
                                    href: "/(config)/(message)/permissions",
                                },
                                {
                                    title: "Conversas",
                                    href: "/(config)/(message)/chatoptions",
                                },
                            ]}
                        />

                        <Text
                            my="$4"
                            fontSize={21}
                            fontFamily="$heading"
                            color="#000"
                            lineHeight={24}
                        >
                            Conta
                        </Text>
                        <ConfigCard
                            items={[
                                {
                                    title: "Tipo de conta",
                                    href: "/(config)/(account)/accountType",
                                },
                                {
                                    title: "Privacidade",
                                    href: "/(config)/(account)/privacy",
                                },
                                {
                                    title: "Segurança",
                                    href: "/(config)/(account)/security",
                                },
                            ]}
                        />

                        <Text
                            my="$4"
                            fontSize={21}
                            fontFamily="$heading"
                            color="#000"
                            lineHeight={24}
                        >
                            Aplicativo
                        </Text>
                        <ConfigCard
                            items={[
                                {
                                    title: "Ajuda",
                                    href: "/(config)/(app)/help",
                                },
                                {
                                    title: "Permissões do dispositivo",
                                    href: "/(config)/(message)/permissions",
                                },
                                {
                                    title: "Idioma",
                                    href: "/(config)/(app)/languages",
                                },
                                {
                                    title: "Convidar amigos",
                                    href: "/(config)/(app)/invitefriends",
                                },
                                {
                                    title: "Sobre",
                                    href: "/(config)/(app)/about",
                                },
                                {
                                    title: "Sair",
                                    color: "$negative",
                                    action: () => setModalVisible(true),
                                },
                            ]}
                        />
                    </VStack>
                </ScrollView>
            </VStack>

            <ConfirmationModal
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={handleSignOut}
                title="Deseja realmente sair?"
                message="Você realmente deseja sair da sua conta?"
            />
        </BaseContainer>
    );
};

export default ConfigScreen;
