import { User } from "@/Context/AuthProvider";
import { ConversationPriority } from "@/Context/ChatProvider";

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
    isPresenting: boolean;
    apresentationImage: boolean;
    apresentationVideo: boolean;
    apresentationDocument: boolean;
    createdAt: string;
    priority: ConversationPriority;
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
    isPresenting: boolean;
    isCreator: boolean;
    isFinished: boolean;
    priority: ConversationPriority;
    needReply: boolean;
    contactSettings: {
        chatSettings: {
            files: boolean;
            images: boolean;
            videos: boolean;
        };
        priceSettings: {
            attachmentPercentage: number;
            videoPercentage: number;
            imagePercentage: number;
        };
    };
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
