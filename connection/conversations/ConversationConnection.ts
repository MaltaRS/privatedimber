import { User } from "@/Context/AuthProvider";

import api from "@/utils/api";

export type Conversation = {
    id: string;
    participant: {
        id: string;
        name: string;
        email: string;
        icon: string | null;
        verifiedAt: string | null;
    };
    paidPrice: number;
    apresentationImage: boolean;
    apresentationVideo: boolean;
    apresentationDocument: boolean;
    createdAt: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
    needReply: boolean;
    messages: Message[];
};

export type Message = {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    image?: string;
    video?: string;
    audio?: string;
    document?: string;
    deliveredAt?: string;
    readAt?: string;
    expiresAt?: string;
    createdAt: string;
};

export type MessagesPayload = {
    contact: User;
    messages: Message[];
    answersCount: number;
    totalAnswers: number;
    contactTotalAnswers: number;
    contactAnswersCount: number;
    isCreator: boolean;
    needReply: boolean;
    isFinished: boolean;
};

export type ConversationsResponse = {
    conversations: Conversation[];
    totalConversations: number;
    nextPage: number | null;
};

export const findConversations = async (
    pageParam: number,
    filter: string,
): Promise<ConversationsResponse> => {
    const { data } = await api.get<ConversationsResponse>("/conversation", {
        params: {
            offset: pageParam,
            ...(filter !== "" && { filter }),
        },
    });

    return data;
};

export const findConversationById = async (conversationId: string) => {
    const { data } = await api.get<MessagesPayload>(
        `/conversation/${conversationId}/messages`,
    );

    return data;
};

export const clearConversation = async (conversationId: string) => {
    await api.patch(`/conversation/${conversationId}/clear-messages`);
};

export const deleteConversation = async (conversationId: string) => {
    await api.delete(`/conversation/${conversationId}/delete-conversation`);
};
