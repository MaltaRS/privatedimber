import { useCallback, useEffect, useRef, useState } from "react";

import { ScrollView } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { CaretLeft, Chats } from "phosphor-react-native";

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Box,
    Divider,
    HStack,
    Pressable,
    Spinner,
    Text,
    VStack,
} from "@/gluestackComponents";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { findConversationById } from "@/connection/conversations/ConversationConnection";

import { useSocket } from "@/Context/SocketProvider";

import { Message } from "@/components/tabs/conversations/Message";
import { BaseContainer } from "@/components/BaseContainer";
import { SendMessageForm } from "@/components/chats/SendMessageForm";

export type DimberMessage = {
    id: string;
    content: string;
    createdAt: string;
    senderId: string;
    conversationId: string;
    buttons: {
        width: string;
        text: string;
        action: () => void;
    }[];
};

const ChatsScreen = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { socket } = useSocket();

    const [formActive, setFormActive] = useState(false);

    const { conversationId } = useLocalSearchParams<{
        conversationId: string;
    }>();

    const scrollViewRef = useRef<ScrollView | null>(null);

    const {
        data: contactConversation,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["conversationMessage", conversationId],
        queryFn: () => findConversationById(conversationId),
        staleTime: Infinity,
    });

    const handleNewMessage = useCallback(
        (newMessage: any) => {
            queryClient.setQueryData(
                ["conversationMessage", conversationId],
                (oldData: any) => {
                    if (oldData) {
                        return {
                            ...oldData,
                            messages: [...oldData.messages, newMessage],
                        };
                    } else {
                        return {
                            messages: [newMessage],
                        };
                    }
                },
            );

            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
        },
        [conversationId, queryClient, scrollViewRef],
    );

    useEffect(() => {
        if (!socket) return;

        socket.emit("joinConversation", { conversationId });

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.emit("leaveConversation", { conversationId });
        };
    }, [socket, conversationId, handleNewMessage]);

    const sendMessage = useCallback(
        async (content: string) => {
            if (!socket || content.trim() === "") return;

            socket.emit("sendMessage", {
                conversationId: Number(conversationId),
                content,
            });
        },
        [socket, conversationId],
    );

    useEffect(() => {
        if (scrollViewRef.current) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: false });
            }, 0);
        }
    }, [contactConversation]);

    const contact = contactConversation?.contact;

    const appMessages: DimberMessage[] = [
        {
            id: "1",
            content:
                "Deseja comprar o direito a uma resposta do famoso? Ao confirmar, será acrescentado um valor de *R$ 200,00* à sua conta.",
            createdAt: "2021-09-01T12:00:00",
            senderId: "2",
            conversationId: conversationId,
            buttons: [
                {
                    width: "50%",
                    text: "Não, obrigado",
                    action: () => {},
                },
                {
                    width: "50%",
                    text: "Sim, quero!",
                    action: () => {
                        setFormActive(true);
                    },
                },
            ],
        },
    ];

    return (
        <BaseContainer px="$0">
            <HStack gap="$3" px="$3" alignItems="center">
                <Pressable
                    p="$1"
                    alignItems="center"
                    justifyContent="center"
                    rounded="$full"
                    onPress={() => {
                        if (formActive) {
                            setFormActive(false);
                            return;
                        }
                        router.back();
                    }}
                >
                    <CaretLeft size={24} />
                </Pressable>
                <HStack gap="$3" alignItems="center">
                    {isLoading && <Spinner size="small" />}
                    {contact && (
                        <>
                            <Avatar width={44} height={44} rounded="$full">
                                <AvatarFallbackText>
                                    {contact.name}
                                </AvatarFallbackText>
                                {contact.icon && (
                                    <AvatarImage
                                        source={{
                                            uri: contact.icon,
                                        }}
                                        alt={`Foto de perfil de ${contact.name}`}
                                    />
                                )}
                            </Avatar>
                            <VStack gap={2}>
                                <Text
                                    size="md"
                                    fontFamily="$title"
                                    color="$black"
                                >
                                    {contact.name}
                                </Text>
                                <Text
                                    fontSize={15}
                                    fontFamily="$arialHeading"
                                    color="$primaryDefault"
                                >
                                    R$ 100,00
                                </Text>
                            </VStack>
                        </>
                    )}
                </HStack>
            </HStack>
            <Divider mt="$3" bgColor="$gray300" zIndex={5} />
            <VStack flex={1}>
                {formActive ? (
                    <SendMessageForm
                        sendMessage={sendMessage}
                        setFormActive={setFormActive}
                    />
                ) : (
                    <VStack px="$3" flex={1}>
                        {!contactConversation && isLoading ? (
                            <VStack
                                alignItems="center"
                                justifyContent="center"
                                flex={1}
                            >
                                <Spinner size="large" />
                            </VStack>
                        ) : !contactConversation ? (
                            <VStack
                                alignItems="center"
                                justifyContent="center"
                                flex={1}
                                mb="$4"
                            >
                                <Chats size={30} color="#6B7280" />
                                <Box>
                                    <Text fontSize="$lg" color="#6B7280">
                                        Nenhuma mensagem encontrada
                                    </Text>
                                </Box>
                            </VStack>
                        ) : (
                            <ScrollView
                                ref={scrollViewRef}
                                showsVerticalScrollIndicator={false}
                            >
                                {contact &&
                                    contactConversation.messages.map(
                                        (message, index) => (
                                            <Message
                                                key={index}
                                                senderId={message.senderId}
                                                content={message.content}
                                                contact={contact}
                                                isFirst={index === 0}
                                            />
                                        ),
                                    )}
                                {appMessages.map(
                                    (message: DimberMessage, index: number) => (
                                        <Message
                                            key={index}
                                            senderId={message.senderId}
                                            content={message.content}
                                            contact={contact!}
                                            isFirst={index === 0}
                                            dimberMessage={{
                                                buttons: message.buttons,
                                            }}
                                        />
                                    ),
                                )}
                            </ScrollView>
                        )}
                    </VStack>
                )}
            </VStack>
        </BaseContainer>
    );
};

export default ChatsScreen;
