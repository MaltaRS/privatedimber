import React, { useEffect, useRef, useState } from "react";

import { ScrollView } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Chats } from "phosphor-react-native";
import { MoveLeft, Plus } from "lucide-react-native";

import {
    Avatar,
    AvatarBadge,
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

import { useMutation, useQuery } from "@tanstack/react-query";

import { findConversationById } from "@/connection/conversations/ConversationConnection";
import { createPaymentIntent } from "@/connection/stripe/StripeConnection";

import { Colors } from "@/constants/Colors";

import { useAuth } from "@/Context/AuthProvider";
import { useChatContext } from "@/Context/ChatProvider";

import { InternalMessages } from "@/components/chats/InternalMessages";
import { SendMessageForm } from "@/components/chats/SendMessageForm";
import { Message } from "@/components/tabs/conversations/Message";
import { PaymentSheetComponent } from "@/components/payment";
import { BaseContainer } from "@/components/BaseContainer";

import { toast } from "burnt";

import { useOnlineUsersStore } from "@/stores/onlineUsersStore";

export type PaymentItems = {
    name: string;
    description?: string;
    amount: number;
    quantity: number;
}[];

const ChatsScreen = () => {
    const router = useRouter();
    const { user } = useAuth();

    const [paymentItems, setPaymentItems] = useState<PaymentItems>([]);

    const { conversationId } = useLocalSearchParams<{
        conversationId: string;
    }>();

    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const { data: contactConversation, isLoading } = useQuery({
        queryKey: ["conversationMessage", conversationId],
        queryFn: () => findConversationById(conversationId),
        staleTime: Infinity,
    });

    const {
        mutate: handleCreatePaymentIntent,
        isPending: isCreatingPaymentIntent,
    } = useMutation({
        mutationFn: createPaymentIntent,
        onSuccess: (data) => {
            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
            } else {
                toast({
                    title: "Não foi possivel criar o pagamento!",
                    preset: "error",
                });
            }
        },
        onError: (err: any) => {
            console.error("Erro ao criar Payment Intent:", err);
            toast({
                title: "Não foi possivel criar o pagamento!",
                preset: "error",
            });
        },
    });

    const {
        joinConversation,
        leaveConversation,
        sendMessage,
        gaveAnswerRight,
        finishConversation,
        markMessagesAsRead,
    } = useChatContext();

    const [formActive, setFormActive] = useState(false);

    const [message, setMessage] = useState("");

    const scrollViewRef = useRef<ScrollView | null>(null);

    const likeAnswer = (need: boolean) => {
        setPaymentItems((prev) => [
            ...prev,
            {
                name: "Resposta",
                amount: 1000,
                quantity: need ? 1 : 0,
            },
        ]);
    };

    const HandleCreatePaymentIntent = () => {
        const paymentItemsTotal = paymentItems.reduce(
            (acc, item) => acc + item.amount * item.quantity,
            0,
        );

        handleCreatePaymentIntent(paymentItemsTotal);
    };

    useEffect(() => {
        if (!conversationId) return;

        joinConversation({ conversationId });

        markMessagesAsRead({ conversationId });
        return () => {
            leaveConversation({ conversationId });
        };
    }, [
        conversationId,
        joinConversation,
        leaveConversation,
        markMessagesAsRead,
    ]);

    useEffect(() => {
        if (!scrollViewRef.current) return;
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [
        contactConversation?.answersCount,
        contactConversation?.isFinished,
        contactConversation?.messages,
    ]);

    useEffect(() => {
        const messages = contactConversation?.messages ?? [];

        if (
            (messages.length ?? 0) === 0 &&
            (contactConversation?.isCreator ?? true) &&
            !isLoading
        ) {
            setFormActive(true);
        } else if (
            messages.every(
                (message) =>
                    message.senderId === user?.id &&
                    message.deliveredAt === null,
            )
        ) {
            setPaymentItems([
                {
                    name: "Mensagem",
                    amount: 10000,
                    quantity: 1,
                },
                ...messages.slice(1).map((message) => ({
                    name: "Imagem",
                    amount: 1000,
                    quantity: 1,
                })),
            ]);
        }
    }, [isLoading, contactConversation, user]);

    const contact = contactConversation?.contact;

    const onlineUsers = useOnlineUsersStore((state) => state.onlineUsers);
    const isOnline = onlineUsers.includes(Number(contact?.id));

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
                                {isOnline && <AvatarBadge bgColor="#339058" />}
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
                        setPaymentItems={setPaymentItems}
                        sendMessage={sendMessage}
                        setFormActive={setFormActive}
                        conversationId={conversationId}
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
                                                    message={message}
                                                    contact={contact}
                                                    isFirst={index === 0}
                                                    user={user}
                                                />
                                            ),
                                        )}
                                    <InternalMessages
                                        handleCreatePaymentIntent={
                                            HandleCreatePaymentIntent
                                        }
                                        likeToAnswer={likeAnswer}
                                        contactConversation={
                                            contactConversation
                                        }
                                        gaveRightAnswer={() =>
                                            gaveAnswerRight({
                                                conversationId,
                                            })
                                        }
                                        finishChat={() =>
                                            finishConversation({
                                                conversationId,
                                            })
                                        }
                                        paymentItems={paymentItems}
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
                                                            conversationId,
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
            {clientSecret && (
                <PaymentSheetComponent
                    clientSecret={clientSecret}
                    autoPresent={true}
                    onSuccess={() => {
                        console.log("Pagamento finalizado!");
                    }}
                    onError={(err) => {
                        console.log("Erro no pagamento:", err);
                    }}
                />
            )}
        </BaseContainer>
    );
};

export default ChatsScreen;
