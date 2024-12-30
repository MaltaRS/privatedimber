import React, { useCallback, useEffect, useRef, useState } from "react";

import { ScrollView } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Chats } from "phosphor-react-native";
import { MoveLeft, Plus } from "lucide-react-native";

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Box,
    Divider,
    HStack,
    ImageBackground,
    Input,
    InputField,
    InputSlot,
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
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/Context/AuthProvider";
import { InternalMessages } from "@/components/chats/InternalMessages";

const ChatsScreen = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { socket } = useSocket();
    const { user } = useAuth();

    const { conversationId } = useLocalSearchParams<{
        conversationId: string;
    }>();

    const { data: contactConversation, isLoading } = useQuery({
        queryKey: ["conversationMessage", conversationId],
        queryFn: () => findConversationById(conversationId),
        staleTime: Infinity,
    });

    const [formActive, setFormActive] = useState(false);

    const [message, setMessage] = useState("");

    const scrollViewRef = useRef<ScrollView | null>(null);

    const handleNewMessage = useCallback(
        (newMessage: any) => {
            queryClient.setQueryData(
                ["conversationMessage", conversationId],
                (oldData: any) => {
                    const loggedUserMessage = newMessage.senderId === user?.id;

                    if (oldData) {
                        return {
                            ...oldData,
                            messages: [...oldData.messages, newMessage],
                            contactAnswersCount:
                                !loggedUserMessage && !oldData.isCreator
                                    ? oldData.contactAnswersCount - 1
                                    : oldData.contactAnswersCount,
                            answersCount:
                                loggedUserMessage && oldData.isCreator
                                    ? oldData.answersCount - 1
                                    : oldData.answersCount,
                            needReply: oldData.messages.lenght === 0,
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
        [conversationId, queryClient, scrollViewRef, user],
    );

    const handleNewAnswerRight = useCallback(
        (conversationId: string) => {
            queryClient.setQueryData(
                ["conversationMessage", conversationId],
                (oldData: any) => {
                    if (oldData) {
                        return {
                            ...oldData,
                            answersCount: oldData.answersCount + 1,
                        };
                    }
                },
            );

            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
        },
        [queryClient, scrollViewRef],
    );

    const handleConversationFinished = useCallback(
        (conversationId: string) => {
            queryClient.setQueryData(
                ["conversationMessage", conversationId],
                (oldData: any) => {
                    if (oldData) {
                        return {
                            ...oldData,
                            isFinished: true,
                        };
                    }
                },
            );

            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }
        },
        [queryClient, scrollViewRef],
    );

    useEffect(() => {
        if (!socket) return;

        socket.emit("joinConversation", { conversationId });

        socket.on("newMessage", handleNewMessage);

        socket.on(`newAnswerRight_${user?.id}`, () =>
            handleNewAnswerRight(conversationId),
        );

        socket.on("conversationFinished", () => {
            handleConversationFinished(conversationId);
        });

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.emit("leaveConversation", { conversationId });
            socket.off(`newAnswerRight_${user?.id}`, handleNewAnswerRight);
            socket.off("conversationFinished", handleConversationFinished);
        };
    }, [
        socket,
        conversationId,
        handleNewMessage,
        handleNewAnswerRight,
        handleConversationFinished,
        user,
    ]);

    const sendMessage = useCallback(
        async ({
            content,
            image,
            document,
        }: {
            content: string;
            image?: string;
            document?: string;
        }) => {
            console.log("sendMessage", content, image, document);

            if (!socket || (content.trim() === "" && !image && !document))
                return;

            socket.emit("sendMessage", {
                conversationId: Number(conversationId),
                content,
                image: image ?? document ?? null,
            });
        },
        [socket, conversationId],
    );

    const gaveAnswerRight = useCallback(
        async (conversationId: string) => {
            if (!socket) return;

            socket.emit("giveAnswerRight", { conversationId });
        },
        [socket],
    );

    const finishConversation = useCallback(
        async (conversationId: string) => {
            if (!socket) return;

            socket.emit("finishConversation", { conversationId });
        },
        [socket],
    );

    useEffect(() => {
        if (scrollViewRef.current) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: false });
            }, 0);
        }
    }, [contactConversation]);

    useEffect(() => {
        if (
            (contactConversation?.messages.length ?? 0) === 0 &&
            (contactConversation?.isCreator ?? true) &&
            !isLoading
        ) {
            setFormActive(true);
        }
    }, [isLoading, contactConversation]);

    const contact = contactConversation?.contact;

    return (
        <BaseContainer px="$0">
            <HStack gap="$3" px="$3" alignItems="center">
                <Pressable
                    p="$1"
                    alignItems="center"
                    justifyContent="center"
                    rounded="$full"
                    onPress={() => {
                        if (
                            formActive &&
                            (contactConversation?.messages.length ?? 0) > 0
                        ) {
                            setFormActive(false);
                            return;
                        }
                        router.back();
                    }}
                >
                    <MoveLeft size={24} color={Colors.gray700} />
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
                                    color="$black"
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
                    <VStack flex={1}>
                        <ImageBackground
                            source={require("@/assets/images/chatBackground.png")}
                            w="$full"
                            h="$full"
                            resizeMode="cover"
                            zIndex={2}
                        >
                            {!contactConversation && isLoading ? (
                                <VStack
                                    px="$3"
                                    alignItems="center"
                                    justifyContent="center"
                                    flex={1}
                                >
                                    <Spinner size="large" />
                                </VStack>
                            ) : !contactConversation ? (
                                <VStack
                                    px="$3"
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
                                    contentContainerStyle={{
                                        zIndex: 3,
                                        paddingHorizontal: 12,
                                    }}
                                >
                                    {contact &&
                                        contactConversation.messages.map(
                                            (message, index) => (
                                                <Message
                                                    key={index}
                                                    senderId={message.senderId}
                                                    content={message.content}
                                                    timestamp={
                                                        message.deliveredAt ??
                                                        message.createdAt
                                                    }
                                                    read={!!message.readAt}
                                                    image={message.image}
                                                    audio={message.audio}
                                                    contact={contact}
                                                    isFirst={index === 0}
                                                    user={user}
                                                />
                                            ),
                                        )}
                                    <InternalMessages
                                        needReplyMessage={
                                            contactConversation.needReply
                                        }
                                        asnwersCount={
                                            contactConversation.answersCount
                                        }
                                        contactAnswersCount={
                                            contactConversation.contactAnswersCount
                                        }
                                        messages={contactConversation.messages}
                                        gaveRightAnswer={() =>
                                            gaveAnswerRight(conversationId)
                                        }
                                        finishChat={() =>
                                            finishConversation(conversationId)
                                        }
                                        isCreator={
                                            contactConversation.isCreator
                                        }
                                        isFinished={
                                            contactConversation.isFinished
                                        }
                                        contactName={contact?.name}
                                    />
                                </ScrollView>
                            )}
                            {(contactConversation?.answersCount ?? 1) > 0 &&
                                (contactConversation?.messages.length ?? 0) >
                                    0 &&
                                !contactConversation?.isFinished && (
                                    <HStack
                                        bgColor="$gray100"
                                        px="$2"
                                        py="$3"
                                        zIndex={4}
                                        justifyContent="space-between"
                                        alignItems="center"
                                        borderTopWidth={0.5}
                                        borderTopColor="$gray300"
                                        gap="$2"
                                    >
                                        <Box
                                            p="$2"
                                            bgColor="$white"
                                            rounded="$full"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Plus
                                                size={24}
                                                color={Colors.gray700}
                                            />
                                        </Box>
                                        <Input
                                            flex={1}
                                            variant="rounded"
                                            bgColor="$white"
                                            size="xl"
                                            borderWidth={0}
                                            alignItems="center"
                                        >
                                            <InputField
                                                pl="$5"
                                                bgColor="$white"
                                                placeholder="Mensagem..."
                                                placeholderTextColor="#6B7280"
                                                size="lg"
                                                value={message}
                                                onChangeText={setMessage}
                                            />
                                            <InputSlot>
                                                <Pressable
                                                    rounded="$full"
                                                    px="$4"
                                                    py="$2"
                                                    mr="$1"
                                                    bgColor="$primaryDefault"
                                                    onPress={() => {
                                                        sendMessage({
                                                            content: message,
                                                        });
                                                    }}
                                                >
                                                    <Text
                                                        color="white"
                                                        fontWeight="$bold"
                                                    >
                                                        Enviar
                                                    </Text>
                                                </Pressable>
                                            </InputSlot>
                                        </Input>
                                    </HStack>
                                )}
                        </ImageBackground>
                    </VStack>
                )}
            </VStack>
        </BaseContainer>
    );
};

export default ChatsScreen;
