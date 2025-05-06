import { Fragment, useEffect, useState } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Alert } from "react-native";

import {
    Text,
    VStack,
    HStack,
    ScrollView,
    Box,
    Pressable,
    Spinner,
} from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";
import { TabButton } from "@/components/utils/TabButton";
import ProfileStatistics from "@/components/ProfileStatistics";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileAbout } from "@/components/profile/ProfileAbout";
import { SocialLinks } from "@/components/profile/SocialLinks";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { BlockUser } from "@/components/tabs/conversations/BlockUser";

import { useAuth, User } from "@/Context/AuthProvider";
import { useSocket } from "@/Context/SocketProvider";
import { useBlockUser } from "@/hooks/BlockUser";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
    GetUserProfile,
    isUserBlocked,
} from "@/connection/auth/UserConnection";

import { formatCentsToMoney } from "@/utils/money";
import { handleFavorite } from "@/utils/favorites";

import { toast } from "burnt";

interface ExtendedUser extends User {
    isFavorited?: boolean;
    price: number | null;
    isBlocked?: boolean;
}

export default function ProfileScreen() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { userUuid } = useLocalSearchParams<{ userUuid: string }>();

    const { user } = useAuth();
    const { block, unblock } = useBlockUser();

    const { socket } = useSocket();

    const [creatingConversation, setCreatingConversation] = useState(false);
    const [showBlockModal, setShowBlockModal] = useState(false);

    let shouldGetUserData = false;
    if (userUuid && user?.uuid !== userUuid) {
        shouldGetUserData = true;
    }

    const { data: userData, isLoading } = useQuery({
        queryKey: ["user", userUuid],
        queryFn: () => GetUserProfile(userUuid),
        enabled: shouldGetUserData,
    });

    const { data: isBlocked } = useQuery({
        queryKey: ["isBlocked", userUuid],
        queryFn: () => isUserBlocked(userUuid),
        enabled: shouldGetUserData,
    });

    const validatedUser = shouldGetUserData
        ? ({
              ...userData?.user,
              isFavorited: userData?.isFavorited,
              price: userData?.user?.price || null,
              verifiedAt: userData?.user?.verifiedAt || null,
              isBlocked: !!isBlocked,
          } as ExtendedUser)
        : ({ ...user, price: user?.price || null } as ExtendedUser);

    const [activeTab, setActiveTab] = useState("tab1");

    const handleCreateConversation = () => {
        if (!socket || !validatedUser || creatingConversation) return;

        setCreatingConversation(true);

        socket.emit(
            "CreateConversation",
            { participantId: validatedUser.id },
            (response: any) => {
                if (response.error) {
                    console.error(
                        "Error creating conversation: ",
                        response.error,
                    );
                    Alert.alert(
                        "Erro",
                        "Erro ao criar conversa, tente novamente mais tarde!",
                    );
                } else {
                    queryClient.invalidateQueries({
                        queryKey: ["conversations"],
                    });

                    router.replace(`/(conversations)/${response.id}`);
                }
            },
        );
    };

    const handleBlock = () => {
        if (!validatedUser.id) return;

        if (validatedUser.isBlocked) {
            unblock.mutate(validatedUser.id.toString(), {
                onSuccess: () => {
                    queryClient.setQueryData(["isBlocked", userUuid], false);
                    setShowBlockModal(false);
                    toast({
                        title: "Usuário desbloqueado com sucesso",
                        haptic: "success",
                    });
                },
            });
        } else {
            block.mutate(validatedUser.id.toString(), {
                onSuccess: () => {
                    queryClient.setQueryData(["isBlocked", userUuid], true);
                    setShowBlockModal(false);
                    toast({
                        title: "Usuário bloqueado com sucesso",
                        haptic: "success",
                    });
                },
            });
        }
    };

    if (shouldGetUserData && userData == null && !isLoading) {
        return (
            <BaseContainer>
                <HeaderContainer title="Perfil" />

                <VStack flex={1} alignItems="center" justifyContent="center">
                    <Text
                        fontSize="$lg"
                        fontWeight="$medium"
                        textAlign="center"
                    >
                        Perfil não encontrado, ou desabilitado pelo usuário ou
                        plataforma para receber mensagens
                    </Text>
                </VStack>
            </BaseContainer>
        );
    }

    if (isLoading) {
        return (
            <BaseContainer>
                <VStack flex={1}>
                    <HeaderContainer title="Perfil" />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 86 }}
                    >
                        <ProfileSkeleton />
                    </ScrollView>
                </VStack>
            </BaseContainer>
        );
    }

    return (
        <BaseContainer>
            <VStack flex={1}>
                <HeaderContainer title="Perfil" />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 86,
                    }}
                >
                    <VStack mt="$2">
                        <ProfileHeader
                            name={validatedUser.name}
                            username={validatedUser.username}
                            icon={validatedUser.icon}
                            bio={validatedUser.bio}
                            lastAccessAt={
                                validatedUser.lastAccessAt
                                    ? validatedUser.lastAccessAt
                                    : undefined
                            }
                            verifiedAt={
                                validatedUser.verifiedAt
                                    ? validatedUser.verifiedAt
                                    : null
                            }
                            shouldGetUserData={shouldGetUserData}
                            isFavorited={validatedUser.isFavorited}
                            onFavorite={() => {
                                if (!validatedUser.id) return;
                                handleFavorite({
                                    id: String(validatedUser.id),
                                    userUuid,
                                    isFavorited: !!validatedUser.isFavorited,
                                    queryClient,
                                    onSuccess: () => {
                                        queryClient.invalidateQueries({
                                            queryKey: ["popularUsers"],
                                        });
                                        queryClient.invalidateQueries({
                                            queryKey: ["userFavorites"],
                                        });
                                    },
                                });
                            }}
                            userId={validatedUser.id?.toString()}
                            isBlocked={validatedUser.isBlocked}
                            onBlock={() => setShowBlockModal(true)}
                            onPayments={() => {
                                // Handle payments
                            }}
                            onReport={() => {
                                // Handle report
                            }}
                        />

                        <HStack bg="$gray100" borderRadius="$full" mt="$6">
                            <HStack
                                backgroundColor="$gray100"
                                p={4}
                                borderRadius="$full"
                                alignItems="center"
                                justifyContent="center"
                                alignSelf="center"
                                width="$full"
                            >
                                <TabButton
                                    title="Sobre"
                                    isActive={activeTab === "tab1"}
                                    onPress={() => setActiveTab("tab1")}
                                />
                                <TabButton
                                    title="Estatísticas"
                                    isActive={activeTab === "tab2"}
                                    onPress={() => setActiveTab("tab2")}
                                />
                            </HStack>
                        </HStack>

                        {activeTab === "tab1" ? (
                            <Fragment>
                                <ProfileAbout
                                    content={validatedUser.about}
                                    tags={validatedUser.tags}
                                    interests={validatedUser.interests}
                                />
                                <Box
                                    my="$2"
                                    width="100%"
                                    height={6}
                                    bg="$gray100"
                                    borderRadius="$sm"
                                />
                                <SocialLinks links={validatedUser.links} />
                            </Fragment>
                        ) : (
                            <ProfileStatistics />
                        )}
                    </VStack>
                </ScrollView>

                {shouldGetUserData && (
                    <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="$white"
                        width="100%"
                        borderTopColor="$gray200"
                        pb="$2"
                    >
                        <Pressable
                            onPress={handleCreateConversation}
                            bg="$primaryDefault"
                            width="100%"
                            borderRadius="$full"
                            flexDirection="row"
                            alignItems="center"
                            p="$4"
                            justifyContent={
                                creatingConversation
                                    ? "center"
                                    : "space-between"
                            }
                        >
                            {creatingConversation ? (
                                <VStack
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Spinner size="small" color="$white" />
                                </VStack>
                            ) : (
                                <Fragment>
                                    <Text
                                        color="$white"
                                        fontSize="$lg"
                                        fontWeight="$medium"
                                    >
                                        Enviar mensagem
                                    </Text>
                                    <Text
                                        color="$white"
                                        fontSize="$lg"
                                        fontWeight="$medium"
                                    >
                                        {validatedUser.price === null
                                            ? "R$ 100,00"
                                            : formatCentsToMoney(
                                                  validatedUser.price,
                                              )}
                                    </Text>
                                </Fragment>
                            )}
                        </Pressable>
                    </Box>
                )}
            </VStack>

            {validatedUser.id && (
                <BlockUser
                    blockedId={validatedUser.id.toString()}
                    blockedName={validatedUser.name}
                    onClose={() => setShowBlockModal(false)}
                    onBlock={handleBlock}
                    isBlocked={validatedUser.isBlocked}
                    showTrigger={false}
                    isOpen={showBlockModal}
                />
            )}
        </BaseContainer>
    );
}
