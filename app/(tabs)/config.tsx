import React, { useState } from "react";
import { ScrollView, Pressable, View } from "react-native";
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    HStack,
    VStack,
    Text,
} from "@/gluestackComponents";

import TitleContainer from "@/components/TitleContainer";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";

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

    const HeaderContainer = ({ title }) => (
        <HStack
            pt="$1"
            justifyContent="space-between"
            width="100%"
            position="relative"
        >
            <GoBack onPress={() => router.push("/explore")} />
            <Text
                fontFamily="$medium"
                fontSize={16}
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
                            onPress={() => router.push("/myprofile")}
                            style={{
                                borderRadius: 16,
                                elevation: 1,
                                backgroundColor: "#fff",
                                padding: 16,
                            }}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <HStack gap="$5" alignItems="center">
                                    <Avatar width={56} height={56}>
                                        <AvatarFallbackText>
                                            {user?.name || "Usuário"}
                                        </AvatarFallbackText>
                                        {user?.icon && (
                                            <AvatarImage
                                                source={{ uri: user.icon }}
                                                alt={user.name}
                                            />
                                        )}
                                    </Avatar>
                                    <VStack gap="$1">
                                        <Text
                                            fontFamily="$novaTitle"
                                            fontSize="$lg"
                                            textAlign="center"
                                            lineHeight="24"
                                        >
                                            {user?.name || "Usuário"}
                                        </Text>
                                        <Text
                                            fontSize={16}
                                            color="#6B7280"
                                            fontFamily="$NovaBody"
                                            lineHeight={20}
                                        >
                                            Ver perfil
                                        </Text>
                                    </VStack>
                                </HStack>
                                <ChevronRight
                                    size={20}
                                    color={Colors.gray400}
                                    strokeWidth={2}
                                />
                            </HStack>
                        </Pressable>

                        <TitleContainer name="Mensagens" />
                        <ConfigCard
                            items={[
                                {
                                    title: "Notificações",
                                    href: "/confignotific",
                                },
                                {
                                    title: "Definir valores",
                                    href: "/configdefinedvaluemsg",
                                },
                                { title: "Permissões", href: "/permisions" },
                                {
                                    title: "Conversas",
                                    href: "/configchatoptions",
                                },
                            ]}
                        />

                        <TitleContainer name="Conta" />
                        <ConfigCard
                            items={[
                                {
                                    title: "Tipo de conta",
                                    href: "/config/accountType",
                                },
                                { title: "Privacidade", href: "/privacit" },
                                { title: "Segurança", href: "/configsecurity" },
                            ]}
                        />

                        <TitleContainer name="Aplicativo" />
                        <ConfigCard
                            items={[
                                { title: "Ajuda", href: "/help" },
                                {
                                    title: "Permissões do dispositivo",
                                    href: "/permisions",
                                },
                                { title: "Idioma", href: "/languages" },
                                {
                                    title: "Convidar amigos",
                                    href: "/sharedimber",
                                },
                                { title: "Sobre", href: "/aboutconfig" },
                                {
                                    title: "Sair",
                                    color: "$negative",
                                    action: () => setModalVisible(true),
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
                                    href: "/help",
                                },
                                {
                                    title: "Permissoes do dispositivo",
                                    href: "/permisions",
                                },
                                {
                                    title: "Idioma",
                                    href: "/languages",
                                },
                                {
                                    title: "Convidar amigos",
                                    href: "/sharedimber",
                                },

                                {
                                    title: "Sobre",
                                    href: "/aboutconfig",
                                },
                            ]}
                        />
                    </VStack>
                </ScrollView>
            </VStack>

            <StatusBar style="auto" />

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
