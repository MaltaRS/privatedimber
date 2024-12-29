import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Box,
    HStack,
    Pressable,
    ScrollView,
    Text,
    VStack,
} from "@/gluestackComponents";

import { useGoogleAuth } from "@/Context/GoogleAuthProvider";
import { useAuth } from "@/Context/AuthProvider";

import { ChevronRight } from "lucide-react-native";

import { Colors } from "@/constants/Colors";

import { ConfigCard } from "@/components/tabs/config/configCard";
import { BaseContainer } from "@/components/BaseContainer";

const ConfigScreen = () => {
    const { user } = useAuth();

    const { signOut } = useGoogleAuth();

    return (
        <BaseContainer bgColor="$gray50">
            <VStack gap="$4">
                <Text
                    size="lg"
                    textAlign="center"
                    fontFamily="$heading"
                    color="#000"
                    lineHeight={24}
                >
                    Configurações
                </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 46,
                    }}
                >
                    <VStack p="$1" pt="$2" gap="$2">
                        <HStack
                            bgColor="#fff"
                            px="$4"
                            py="$3"
                            borderRadius="$xl"
                            alignItems="center"
                            justifyContent="space-between"
                            elevation={2}
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
                                <Pressable>
                                    <ChevronRight
                                        size={24}
                                        color={Colors.gray500}
                                        strokeWidth={3}
                                    />
                                </Pressable>
                            </Box>
                        </HStack>
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
                                    href: "/config/messages",
                                },
                                {
                                    title: "Definir valores",
                                    href: "/config/values",
                                },
                                {
                                    title: "Permissões",
                                    href: "/config/permissions",
                                },
                                {
                                    title: "Conversas",
                                    href: "/config/conversas",
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
                                    href: "/config/accountType",
                                },
                                {
                                    title: "Privacidade",
                                    href: "/config/privacy",
                                },
                                {
                                    title: "Favoritos",
                                    href: "/config/favorites",
                                },
                                {
                                    title: "Sair",
                                    color: "$negative",
                                    action: signOut,
                                },
                            ]}
                        />
                    </VStack>
                </ScrollView>
            </VStack>
        </BaseContainer>
    );
};
export default ConfigScreen;
