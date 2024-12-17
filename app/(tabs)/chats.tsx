import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";

import ArchiveIcon from "@/assets/icons/appIcons/archive.svg";

import {
    Chats,
    MagnifyingGlass,
    UserCircle,
    X,
    XCircle,
} from "phosphor-react-native";

import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogHeader,
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Box,
    Divider,
    HStack,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    ScrollView,
    Spinner,
    Text,
    VStack,
} from "@/gluestackComponents";

import { useNotifications } from "@/hooks/NotificationHook";

import { CategoryTabs } from "@/components/tabs/explore/CategoryTabs";
import { ChatCard } from "@/components/chats/ChatCard";
import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";

import {
    Conversation,
    findConversations,
    Message,
} from "@/connection/conversations/ConversationConnection";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/Context/AuthProvider";
import { useSocket } from "@/Context/SocketProvider";

const ChatsScreen = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { notificationsCount } = useNotifications();
    const { user } = useAuth();
    const { socket } = useSocket();

    const { data: queryChats, isLoading } = useQuery({
        queryKey: ["conversations"],
        queryFn: findConversations,
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [idSelectedChat, setIdSelectedChat] = useState<string | null>(null);

    const selectedChat = queryChats?.find((chat) => chat.id === idSelectedChat);

    const categories = ["Todas", "Não lidas", "Expiradas"];

    const HandleNewMessage = useCallback(
        (newMessage: Message) => {
            console.log("newMessage", newMessage);

            queryClient.setQueryData(
                ["conversations"],
                (oldConversations: any) => {
                    if (!oldConversations) return [];

                    const updatedConversations: Conversation[] = [
                        ...oldConversations,
                    ];
                    const chatIndex = updatedConversations.findIndex(
                        (chat) => chat.id === newMessage.conversationId,
                    );

                    if (chatIndex !== -1) {
                        const isFromTheLoggedUser =
                            newMessage.senderId === user?.id;

                        const messagesArray: Message[] = [];

                        if (isFromTheLoggedUser) {
                            messagesArray.push(newMessage);
                        } else {
                            const lastMessageFromTheUserIndex =
                                updatedConversations[chatIndex].messages
                                    .slice()
                                    .reverse()
                                    .findIndex(
                                        (message) =>
                                            message.senderId === user?.id,
                                    );

                            if (lastMessageFromTheUserIndex !== -1) {
                                const originalIndex =
                                    updatedConversations[chatIndex].messages
                                        .length -
                                    (1 - lastMessageFromTheUserIndex);

                                messagesArray.push(
                                    ...updatedConversations[
                                        chatIndex
                                    ].messages.slice(originalIndex),
                                    newMessage,
                                );
                            } else {
                                messagesArray.push(
                                    ...updatedConversations[chatIndex].messages,
                                    newMessage,
                                );
                            }
                        }

                        updatedConversations[chatIndex] = {
                            ...updatedConversations[chatIndex],
                            messages: messagesArray,
                        };

                        const [updatedChat] = updatedConversations.splice(
                            chatIndex,
                            1,
                        );
                        updatedConversations.unshift(updatedChat);

                        queryClient.invalidateQueries({
                            queryKey: [
                                "conversationMessage",
                                newMessage.conversationId,
                            ],
                        });
                    }
                    return updatedConversations;
                },
            );
        },
        [queryClient, user?.id],
    );

    useEffect(() => {
        if (!socket || !queryChats || !user) return;

        queryChats.forEach((chat) => {
            socket.emit("joinConversation", { conversationId: chat.id });
        });

        socket.on("newMessage", HandleNewMessage);

        socket.on(`conversationCreated_${user.id}`, (newConversation) => {
            console.log("Nova conversa criada:", newConversation);

            queryClient.setQueryData(
                ["conversations"],
                (oldConversations: any) => {
                    if (!oldConversations) return [newConversation];
                    return [newConversation, ...oldConversations];
                },
            );

            socket.emit("joinConversation", {
                conversationId: newConversation.id,
            });
        });

        return () => {
            socket.off("newMessage", HandleNewMessage);

            queryChats.forEach((chat) => {
                socket.emit("leaveConversation", { conversationId: chat.id });
            });

            socket.off(`conversationCreated_${user.id}`);
        };
    }, [queryClient, HandleNewMessage, socket, queryChats, user]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const filteredChats =
        queryChats?.filter((chat) =>
            (chat.participant.name ?? "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
        ) ?? [];

    return (
        <BaseContainer gap="$2">
            <MainTitle
                title="Conversas"
                onPress={() => router.push("/notifications")}
                notificationsCount={notificationsCount}
            />
            <Input
                mt="$2"
                variant="rounded"
                bgColor="#E5E7EB"
                size="xl"
                borderWidth={0}
            >
                <InputSlot bgColor="#E5E7EB" pl="$5" pt="$1">
                    <InputIcon>
                        <MagnifyingGlass size={20} color="#6B7280" />
                    </InputIcon>
                </InputSlot>
                <InputField
                    pl="$3"
                    bgColor="#E5E7EB"
                    placeholder="Pesquisar"
                    placeholderTextColor="#6B7280"
                    size="lg"
                    onChangeText={(text) => handleSearch(text)}
                />
            </Input>
            <VStack gap="$4" flex={1}>
                <CategoryTabs
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={(category) =>
                        setSelectedCategory(category)
                    }
                    type="lightBlue"
                />
                <Box flex={1}>
                    {filteredChats.length === 0 && isLoading ? (
                        <VStack
                            alignItems="center"
                            justifyContent="center"
                            flex={1}
                        >
                            <Spinner size="large" />
                        </VStack>
                    ) : filteredChats.length === 0 ? (
                        <VStack
                            alignItems="center"
                            justifyContent="center"
                            flex={1}
                            mb="$4"
                        >
                            <Chats size={30} color="#6B7280" />
                            <Box>
                                <Text fontSize="$lg" color="#6B7280">
                                    Nenhuma conversa encontrada
                                </Text>
                            </Box>
                        </VStack>
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <VStack mb="$2">
                                {filteredChats.map((chat, index) => (
                                    <ChatCard
                                        key={index}
                                        chat={chat}
                                        name={chat.participant.name}
                                        icon={chat.participant.icon}
                                        isOnline={false}
                                        onLongPress={() => {
                                            setIdSelectedChat(chat.id);
                                        }}
                                    />
                                ))}
                            </VStack>
                        </ScrollView>
                    )}
                </Box>
            </VStack>
            <AlertDialog
                isOpen={idSelectedChat !== null}
                onClose={() => setIdSelectedChat(null)}
            >
                <AlertDialogBackdrop backgroundColor="#000" />
                <AlertDialogContent bgColor="$gray200">
                    <AlertDialogHeader>
                        <HStack
                            gap="$2"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Avatar width={40} height={40} ml="-$1">
                                <AvatarFallbackText rounded="$lg">
                                    {selectedChat?.participant.name}
                                </AvatarFallbackText>
                                {selectedChat?.participant.icon && (
                                    <AvatarImage
                                        rounded="$full"
                                        source={{
                                            uri: selectedChat?.participant.icon,
                                        }}
                                        alt={`Foto de perfil de ${selectedChat?.participant.name}`}
                                    />
                                )}
                            </Avatar>
                            <Text
                                size="lg"
                                fontFamily="$heading"
                                color="$black"
                            >
                                {selectedChat?.participant.name}
                            </Text>
                        </HStack>
                        <AlertDialogCloseButton>
                            <X size={20} />
                        </AlertDialogCloseButton>
                    </AlertDialogHeader>
                    <AlertDialogBody px="$0" mt="-$2" mb="$2">
                        <VStack mx="$3" p="$2" rounded="$xl" bgColor="$gray50">
                            <HStack pb="$3" alignItems="center" gap="$3">
                                <UserCircle size={20} />
                                <Text
                                    fontFamily="$arialBody"
                                    color="$black"
                                    size="lg"
                                >
                                    Ver Perfil
                                </Text>
                            </HStack>
                            <Divider bgColor="$gray300" />
                            <HStack py="$3" alignItems="center" gap="$3">
                                <ArchiveIcon width={20} height={20} />
                                <Text
                                    fontFamily="$arialBody"
                                    color="$black"
                                    size="lg"
                                    fontWeight="$medium"
                                >
                                    Arquivar
                                </Text>
                            </HStack>
                            <Divider bgColor="$gray300" />
                            <HStack py="$3" alignItems="center" gap="$3">
                                <XCircle size={20} />
                                <Text
                                    fontFamily="$arialBody"
                                    color="$black"
                                    size="lg"
                                >
                                    Limpar conversa
                                </Text>
                            </HStack>
                            <Divider bgColor="$gray300" />
                            <HStack py="$3" alignItems="center" gap="$3">
                                <Ionicons
                                    name="trash-outline"
                                    size={20}
                                    color="#D32F2F"
                                />
                                <Text
                                    fontFamily="$arialBody"
                                    color="$negative"
                                    size="lg"
                                >
                                    Apagar conversa
                                </Text>
                            </HStack>
                            <Divider bgColor="$gray300" />
                            <HStack pt="$3" alignItems="center" gap="$3">
                                <Box width={16} ml="$1">
                                    <Octicons
                                        name="circle-slash"
                                        size={16}
                                        color="#D32F2F"
                                    />
                                </Box>
                                <Text
                                    fontFamily="$arialBody"
                                    color="$negative"
                                    size="lg"
                                >
                                    Bloquear
                                </Text>
                            </HStack>
                        </VStack>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </BaseContainer>
    );
};

export default ChatsScreen;
