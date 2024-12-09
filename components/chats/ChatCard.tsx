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

export type ChatCardProps = {
    icon: string | null;
    name: string;
    chat: Conversation;
    isOnline: boolean;
    onLongPress: () => void;
};

export const ChatCard = ({
    icon,
    name,
    chat,
    isOnline,
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

    const lastMessage = newMessages[newMessages.length - 1]?.content ?? "";

    return (
        <Pressable
            pt="$5"
            px="$2"
            onPress={HandleOpenConversation}
            onLongPress={onLongPress}
        >
            <HStack gap="$4" alignItems="center">
                <Avatar width={54} height={54} ml="-$1">
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
                        {name}
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
                        ) : (
                            <MessageText
                                content={
                                    newMessages.length > 0
                                        ? lastMessage
                                        : "Envie a primeira mensagem"
                                }
                                preview
                            />
                        )}
                    </HStack>
                </VStack>
                <Text fontFamily="$arialBody" size="xs" color="#6B7280">
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
