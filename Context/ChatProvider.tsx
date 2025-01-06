import {
    createContext,
    useContext,
    useCallback,
    useEffect,
    useMemo,
    ReactNode,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/Context/AuthProvider";
import { useSocket } from "@/Context/SocketProvider";

type ChatContextData = {
    joinConversation: (params: { conversationId: string }) => void;
    leaveConversation: (params: { conversationId: string }) => void;
    sendMessage: (params: {
        conversationId: string | number;
        content: string;
        image?: string;
    }) => void;
    gaveAnswerRight: (params: { conversationId: string }) => void;
    finishConversation: (params: { conversationId: string }) => void;
    markMessagesAsRead: (params: { conversationId: string }) => void;
};

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export function ChatProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket || !user) return;

        function handleNewMessage(newMessage: any) {
            console.log("newMessage", newMessage);

            queryClient.setQueryData(
                ["conversations"],
                (oldConversations: any) => {
                    if (!oldConversations) return [];

                    const updatedConversations = [...oldConversations];
                    const chatIndex = updatedConversations.findIndex(
                        (chat) => chat.id === newMessage.conversationId,
                    );

                    if (chatIndex !== -1) {
                        const isFromTheLoggedUser =
                            newMessage.senderId === user?.id;

                        const messagesArray: any[] = [];

                        if (isFromTheLoggedUser) {
                            messagesArray.push(newMessage);
                        } else {
                            const lastMessageFromTheUserIndex =
                                updatedConversations[chatIndex].messages
                                    .slice()
                                    .reverse()
                                    .findIndex(
                                        (msg: any) => msg.senderId === user?.id,
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
                                newMessage.conversationId.toString(),
                            ],
                        });
                    }
                    return updatedConversations;
                },
            );
        }

        function handleConversationCreated(newConversation: any) {
            console.log("Nova conversa criada:", newConversation);

            queryClient.setQueryData(
                ["conversations"],
                (oldConversations: any) => {
                    if (!oldConversations) return [newConversation];
                    return [newConversation, ...oldConversations];
                },
            );

            socket?.emit("joinConversation", {
                conversationId: newConversation.id,
            });
        }

        const handleNewAnswerRight = (conversationId: string) => {
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
        };

        const handleConversationFinished = (conversationId: string) => {
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
        };

        function handleMarkedAsRead(data: {
            conversationId: number;
            userId: number;
        }) {
            const { conversationId, userId } = data;

            queryClient.setQueryData(
                ["conversationMessage", String(conversationId)],
                (oldData: any) => {
                    if (!oldData) return oldData;

                    const updatedMessages = oldData.messages.map((msg: any) => {
                        if (!msg.readAt && msg.senderId !== userId) {
                            return {
                                ...msg,
                                readAt: new Date().toISOString(),
                            };
                        }
                        return msg;
                    });

                    return {
                        ...oldData,
                        messages: updatedMessages,
                    };
                },
            );
        }

        socket.on("newMessage", handleNewMessage);
        socket.on(`conversationCreated`, handleConversationCreated);

        socket.on("newAnswerRight", handleNewAnswerRight);
        socket.on("conversationFinished", handleConversationFinished);
        socket.on("markedAsRead", handleMarkedAsRead);

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.off(`conversationCreated`, handleConversationCreated);

            socket.off("newAnswerRight", handleNewAnswerRight);
            socket.off("conversationFinished", handleConversationFinished);
            socket.off("markedAsRead", handleMarkedAsRead);
        };
    }, [socket, user, queryClient]);

    const joinConversation = useCallback(
        ({ conversationId }: { conversationId: string }) => {
            if (!socket) return;
            socket.emit("joinConversation", { conversationId });
        },
        [socket],
    );

    const leaveConversation = useCallback(
        ({ conversationId }: { conversationId: string }) => {
            if (!socket) return;
            socket.emit("leaveConversation", { conversationId });
        },
        [socket],
    );

    const sendMessage = useCallback(
        ({
            conversationId,
            content,
            image,
        }: {
            conversationId: number | string;
            content: string;
            image?: string;
        }) => {
            if (!socket) return;
            if (!content.trim() && !image) return;
            socket.emit("sendMessage", {
                conversationId: Number(conversationId),
                content,
                image: image ?? null,
            });
        },
        [socket],
    );

    const gaveAnswerRight = useCallback(
        ({ conversationId }: { conversationId: string }) => {
            if (!socket) return;
            socket.emit("giveAnswerRight", { conversationId });
        },
        [socket],
    );

    const finishConversation = useCallback(
        ({ conversationId }: { conversationId: string }) => {
            if (!socket) return;
            socket.emit("finishConversation", { conversationId });
        },
        [socket],
    );

    const markMessagesAsRead = useCallback(
        ({ conversationId }: { conversationId: string }) => {
            if (!socket) return;
            socket.emit("markAsRead", { conversationId });
        },
        [socket],
    );

    const value = useMemo(
        () => ({
            joinConversation,
            leaveConversation,
            sendMessage,
            gaveAnswerRight,
            finishConversation,
            markMessagesAsRead,
        }),
        [
            joinConversation,
            leaveConversation,
            sendMessage,
            gaveAnswerRight,
            finishConversation,
            markMessagesAsRead,
        ],
    );

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
}

export function useChatContext() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error(
            "useChatContext deve ser usado dentro do ChatProvider!",
        );
    }
    return context;
}
