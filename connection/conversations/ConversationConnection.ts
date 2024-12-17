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
    createdAt: string;
    needReply: boolean;
    messages: Message[];
};

export type Message = {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    image?: string;
    audio?: string;
    deliveredAt?: string;
    readAt?: string;
    expiresAt?: string;
    createdAt: string;
};

export type MessagesPayload = {
    contact: User;
    messages: Message[];
    answersCount: number;
    contactAnswersCount: number;
    isCreator: boolean;
};

export const findConversations = async () => {
    const { data } = await api.get<Conversation[]>("/conversation");

    return data.reverse();
};

export const findConversationById = async (conversationId: string) => {
    const { data } = await api.get<MessagesPayload>(
        `/conversation/${conversationId}/messages`,
    );

    return {
        ...data,
        messages: data.messages.reverse(),
    };
};
