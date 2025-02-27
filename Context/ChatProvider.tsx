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

export type SendMessageParams = {
    conversationId: string;
    content: string;
    image?: string;
    document?: string;
    video?: string;
    shouldDeliver?: boolean;
};

export type ConversationPriority = "LOW" | "MEDIUM" | "HIGH";

export type ChangeConversationPriorityParams = {
    conversationId: string;
    priority: ConversationPriority;
};

type ChatContextData = {
    joinConversation: (params: { conversationId: string }) => void;
    leaveConversation: (params: { conversationId: string }) => void;
    sendMessage: (params: SendMessageParams) => void;
    gaveAnswerRight: (params: { conversationId: string }) => void;
    finishConversation: (params: { conversationId: string }) => void;
    markMessagesAsRead: (params: { conversationId: string }) => void;
    changeConversationPriority: (
        params: ChangeConversationPriorityParams,
    ) => void;
};

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export function ChatProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket || !user) return;

        function handleNewMessage(newMessage: any) {
            queryClient.setQueryData(
                ["conversations"],
                (oldConversations: any) => {
                    queryClient.invalidateQueries({
                        queryKey: [
                            "conversationMessage",
                            newMessage.conversationId.toString(),
                        ],
                    });

                    if (!oldConversations) return [];

                    const updatedConversations = [
                        ...oldConversations.conversations,
                    ];

                    const chatIndex = updatedConversations.findIndex(
                        (chat) => chat.id === newMessage.conversationId,
                    );

                    const alreadyExists = updatedConversations[
                        chatIndex
                    ].messages.some((msg: any) => msg.id === newMessage.id);

                    if (alreadyExists) {
                        console.log("Mensagem já existe no array de mensagens");

                        return {
                            ...oldConversations,
                            conversations: updatedConversations,
                        };
                    }

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
                    }
                    return {
                        ...oldConversations,
                        conversations: updatedConversations,
                    };
                },
            );
        }

        function handleConversationCreated(newConversation: any) {
            queryClient.setQueryData(
                ["conversations"],
                (oldConversations: any) => {
                    if (!oldConversations)
                        return {
                            ...oldConversations,
                            conversations: [newConversation],
                        };

                    if (
                        oldConversations.conversations.some(
                            (c: any) => c.id === newConversation.id,
                        )
                    )
                        return oldConversations;

                    return {
                        ...oldConversations,
                        conversations: [
                            newConversation,
                            ...oldConversations.conversations,
                        ],
                    };
                },
            );

            socket?.emit("joinConversation", {
                conversationId: newConversation.id,
            });
        }

        const handleNewAnswerRight = (data: {
            conversationId: string;
            userId: number;
        }) => {
            const { conversationId, userId } = data;

            if (userId !== Number(user.id)) return;

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

        const handleConversationFinished = (data: {
            conversationId: string;
        }) => {
            const { conversationId } = data;

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
                        if (
                            !msg.readAt &&
                            msg.senderId !== userId &&
                            !!msg.deliveredAt
                        ) {
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

        function handlePriorityChanged(data: {
            conversationId: number;
            priority: ConversationPriority;
        }) {
            const { conversationId, priority } = data;

            queryClient.setQueryData(
                ["conversationMessage", String(conversationId)],
                (oldData: any) => {
                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        priority,
                    };
                },
            );
        }

        socket.on("newMessage", handleNewMessage);
        socket.on(`conversationCreated_${user.id}`, handleConversationCreated);

        socket.on("newAnswerRight", handleNewAnswerRight);
        socket.on("conversationFinished", handleConversationFinished);
        socket.on("markedAsRead", handleMarkedAsRead);
        socket.on("priorityChanged", handlePriorityChanged);

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.off(
                `conversationCreated_${user.id}`,
                handleConversationCreated,
            );

            socket.off("newAnswerRight", handleNewAnswerRight);
            socket.off("conversationFinished", handleConversationFinished);
            socket.off("markedAsRead", handleMarkedAsRead);
            socket.off("priorityChanged", handlePriorityChanged);
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
            video,
            document,
            shouldDeliver,
        }: SendMessageParams) => {
            if (!socket) return;
            if (!content.trim() && !image && !video && !document) return;
            socket.emit("sendMessage", {
                conversationId: Number(conversationId),
                content,
                image: image ?? null,
                video: video ?? null,
                documentUri: document ?? null,
                shouldDeliver,
            });
        },
        [socket],
    );

    const gaveAnswerRight = useCallback(
        ({ conversationId }: { conversationId: string }) => {
            if (!socket) return;
            socket.emit("giveAnswerRight", { conversationId });

            queryClient.setQueryData(
                ["conversationMessage", conversationId],
                (oldData: any) => {
                    if (oldData) {
                        return {
                            ...oldData,
                            contactAnswersCount:
                                oldData.contactAnswersCount + 1,
                        };
                    }
                },
            );
        },
        [socket],
    );

    const changeConversationPriority = useCallback(
        ({
            conversationId,
            priority,
        }: {
            conversationId: string;
            priority: ConversationPriority;
        }) => {
            if (!socket) return;
            socket.emit("changeConversationPriority", {
                conversationId: Number(conversationId),
                priority,
            });
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
            changeConversationPriority,
        }),
        [
            joinConversation,
            leaveConversation,
            sendMessage,
            gaveAnswerRight,
            finishConversation,
            markMessagesAsRead,
            changeConversationPriority,
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
