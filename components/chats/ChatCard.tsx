import React from "react";

import { useRouter } from "expo-router";

import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
    Box,
    HStack,
    Pressable,
    Text,
    VStack,
} from "@/gluestackComponents";

import {
    Conversation,
    findConversationById,
} from "@/connection/conversations/ConversationConnection";

import { useQueryClient } from "@tanstack/react-query";
import { formatMessageTime } from "@/utils/dateFormat";

import { MessageText } from "./MessageText";

import Read from "@/assets/icons/appIcons/read.svg";
import Camera from "@/assets/icons/appIcons/camera.svg";
import ImageSquare from "@/assets/icons/appIcons/imageSquare.svg";
import ArrowLeft from "@/assets/icons/appIcons/arrowLeft.svg";

import { Colors } from "@/constants/Colors";

import { formatCentsToMoney } from "@/utils/money";
import { Paperclip } from "lucide-react-native";

export type ChatCardProps = {
    icon: string | null;
    name: string;
    chat: Conversation;
    isOnline: boolean;
    isProfessional: boolean;
    onLongPress: () => void;
};

export const ChatCard = ({
    icon,
    name,
    chat,
    isOnline,
    isProfessional,
    onLongPress,
}: ChatCardProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const HandleOpenConversation = async () => {
        await queryClient.prefetchQuery({
            queryKey: ["conversationMessage", chat.id],
            queryFn: () => findConversationById(chat.id),
        });

        router.push(`/(conversations)/${chat.id}`);
    };

    const newMessages = chat.messages;

    const lastMessage = newMessages[newMessages.length - 1] ?? "";

    const lastMessageRead =
        newMessages.length > 0 && !!newMessages[newMessages.length - 1].readAt;

    return (
        <Pressable
            pt="$5"
            px="$2"
            onPress={HandleOpenConversation}
            onLongPress={onLongPress}
        >
            <HStack gap="$4" alignItems="center">
                <Avatar
                    width={56}
                    height={56}
                    ml="-$1"
                    bgColor={
                        !false
                            ? Colors.primaryDefault
                            : chat.priority === "HIGH"
                              ? "#E0A10A"
                              : "#bde6fd"
                    }
                >
                    <AvatarFallbackText rounded="$lg">
                        {name}
                    </AvatarFallbackText>
                    {icon && (
                        <AvatarImage
                            rounded="$full"
                            source={{
                                uri: icon,
                            }}
                            alt={`Foto de perfil de ${name}`}
                        />
                    )}

                    {isOnline && <AvatarBadge bgColor="#339058" />}
                </Avatar>
                <VStack flex={1}>
                    <Text fontFamily="$arialBody" size="lg" color="#000">
                        {!isProfessional
                            ? name
                            : chat.paidPrice > 0
                              ? formatCentsToMoney(chat.paidPrice)
                              : "Não pago"}
                    </Text>
                    <HStack alignItems="center">
                        {newMessages.length > 1 ? (
                            <>
                                <Box
                                    width={5}
                                    height={5}
                                    borderRadius="$full"
                                    bgColor="$primaryDefault"
                                />
                                <Text
                                    fontFamily="$arialBody"
                                    pl={6}
                                    size="sm"
                                    color="$primaryDefault"
                                >
                                    {newMessages.length} novas mensagens
                                </Text>
                            </>
                        ) : lastMessage.image ? (
                            <>
                                <ImageSquare
                                    width={14}
                                    height={14}
                                    color="#6B7280"
                                />
                                <Text
                                    ml="$1"
                                    fontFamily="$arialBody"
                                    size="sm"
                                    color="#6B7280"
                                >
                                    Imagem
                                </Text>
                            </>
                        ) : lastMessage.video ? (
                            <>
                                <Camera
                                    width={16}
                                    height={16}
                                    color="#6B7280"
                                />
                                <Text
                                    ml="$1"
                                    fontFamily="$arialBody"
                                    size="sm"
                                    color="#6B7280"
                                >
                                    Vídeo
                                </Text>
                            </>
                        ) : lastMessage.document ? (
                            <>
                                <Paperclip size={16} color="#6B7280" />
                                <Text
                                    ml="$1"
                                    fontFamily="$arialBody"
                                    size="sm"
                                    color="#6B7280"
                                >
                                    Documento
                                </Text>
                            </>
                        ) : (
                            <>
                                {lastMessageRead && (
                                    <Read
                                        width={16}
                                        height={16}
                                        stroke={Colors.primaryDefault}
                                        style={{
                                            marginTop: 3,
                                            marginRight: 2,
                                        }}
                                    />
                                )}
                                <MessageText
                                    content={
                                        newMessages.length > 0
                                            ? lastMessage.content
                                            : "Envie a primeira mensagem"
                                    }
                                    preview
                                    previewRead={lastMessageRead}
                                />
                            </>
                        )}
                    </HStack>
                </VStack>
                <Text fontFamily="$heading" size="xs" color="#6B7280">
                    {newMessages.length > 0
                        ? formatMessageTime(
                              newMessages[newMessages.length - 1].createdAt,
                          )
                        : formatMessageTime(chat.createdAt)}
                </Text>
            </HStack>
        </Pressable>
    );
};
