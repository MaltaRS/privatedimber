import React, { useState } from "react";
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    HStack,
    Pressable,
    ScrollView,
    Text,
    View,
    VStack,
} from "@/gluestackComponents";

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
        <HStack pt="$1" justifyContent="space-between"
                width="100%" position="relative" >
        <GoBack onPress={() => router.push("/explore")} />

            <Text fontFamily="$heading" size="lg" color="#000"  pt="$2" textAlign="center" flex={1}>
                {title}
                 <View style={{ width: 50, }} /> 
                          
            </Text>
        </HStack>
    );

    return (
        <BaseContainer>
            <VStack gap="$4">
                <HeaderContainer title="Configurações" />

                <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 46 }}>
                    <VStack p="$1" pt="$2" gap="$2">
                        {/* Perfil do Usuário */}
                        <Pressable
                            onPress={() => router.push("/myprofile")}
                            style={{
                                borderRadius: 16,
                                elevation: 2,
                                backgroundColor: "#fff",
                                padding: 16,
                            }}
                        >
                            <HStack alignItems="center" justifyContent="space-between">
                                <HStack gap="$5" alignItems="center">
                                    <Avatar width={56} height={56}>
                                        <AvatarFallbackText>{user?.name || "Usuário"}</AvatarFallbackText>
                                        {user?.icon && <AvatarImage source={{ uri: user.icon }} alt={user.name} />}
                                    </Avatar>
                                    <VStack gap="$1">
                                        <Text size="lg" fontFamily="$heading" color="#000" lineHeight={24}>
                                            {user?.name || "Usuário"}
                                        </Text>
                                        <Text fontSize={17} color="#6B7280" fontFamily="$body" lineHeight={20}>
                                            Ver perfil
                                        </Text>
                                    </VStack>
                                </HStack>
                                <ChevronRight size={24} color={Colors.gray500} strokeWidth={3} />
                            </HStack>
                        </Pressable>

                        {/* Configurações de Mensagens */}
                        <Text my="$4" fontSize={21} fontFamily="$heading" color="#000" lineHeight={24}>
                            Mensagens
                        </Text>
                        <ConfigCard
                            items={[
                                { title: "Notificações", href: "/confignotific" },
                                { title: "Definir valores", href: "/configdefinedvaluemsg" },
                                { title: "Permissões", href: "/permisions" },
                                { title: "Conversas", href: "/configchatoptions" },
                            ]}
                        />

                        {/* Configurações de Conta */}
                        <Text my="$4" fontSize={21} fontFamily="$heading" color="#000" lineHeight={24}>
                            Conta
                        </Text>
                        <ConfigCard
                            items={[
                                { title: "Tipo de conta", href: "/config/accountType" },
                                { title: "Privacidade", href: "/privacit" },
                                { title: "Segurança", href: "/configsecurity" },
                            ]}
                        />

                        {/* Configurações do Aplicativo */}
                        <Text my="$4" fontSize={21} fontFamily="$heading" color="#000" lineHeight={24}>
                            Aplicativo
                        </Text>
                        <ConfigCard
                            items={[
                                { title: "Ajuda", href: "/help" },
                                { title: "Permissões do dispositivo", href: "/permisions" },
                                { title: "Idioma", href: "/languages" },
                                { title: "Convidar amigos", href: "/sharedimber" },
                                { title: "Sobre", href: "/aboutconfig" },
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

            <StatusBar style="auto" />

            {/* Modal de confirmação para sair */}
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
