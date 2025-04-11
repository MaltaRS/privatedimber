import { Fragment, useEffect, useRef, useState } from "react";

import { ScrollView } from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
    Box,
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

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/Context/AuthProvider";
import { ConversationPriority, useChatContext } from "@/Context/ChatProvider";

import { useOnlineUsersStore } from "@/stores/onlineUsersStore";

import { findConversationById } from "@/connection/conversations/ConversationConnection";
import { InternalMessages } from "@/components/chats/InternalMessages";
import { AttachmentsMenu } from "@/components/chats/attachmentsMenu";
import { SendMessageForm } from "@/components/chats/SendMessageForm";
import { Message } from "@/components/tabs/conversations/Message";
import { Confirmation } from "@/components/payment/confirmation";
import { BaseContainer } from "@/components/BaseContainer";
import { GoBack } from "@/components/utils/GoBack";

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

    const [sendToPayment, setSendToPayment] = useState(false);

    const { conversationId } = useLocalSearchParams<{
        conversationId: string;
    }>();

    const { data: contactConversation, isLoading } = useQuery({
        queryKey: ["conversationMessage", conversationId],
        queryFn: () => findConversationById(conversationId),
        staleTime: 20000,
    });

    const {
        joinConversation,
        leaveConversation,
        sendMessage,
        gaveAnswerRight,
        finishConversation,
        markMessagesAsRead,
        changeConversationPriority,
    } = useChatContext();

    const [formActive, setFormActive] = useState(false);

    const [message, setMessage] = useState("");

    const [needAnswerOpen, setNeedAnswerOpen] = useState<boolean | undefined>(
        undefined,
    );

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

        markMessagesAsRead({ conversationId });

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
                    name: message.document
                        ? "Documento"
                        : message.image
                          ? "Imagem"
                          : "Vídeo",
                    amount: 1000,
                    quantity: 1,
                })),
            ]);
        }
    }, [
        user,
        isLoading,
        contactConversation,
        conversationId,
        markMessagesAsRead,
    ]);

    const contact = contactConversation?.contact;

    const onlineUsers = useOnlineUsersStore((state) => state.onlineUsers);
    const isOnline = onlineUsers.includes(Number(contact?.id));

    return (
        <BaseContainer px="$0" pt={27}>
            <HStack
                gap="$3"
                px="$3"
                py="$2"
                alignItems="center"
                borderColor="$gray300"
                bgColor="$white"
                borderBottomWidth={1}
            >
                <GoBack
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
                />
                <Pressable
                    gap="$3"
                    alignItems="center"
                    flexDirection="row"
                    onPress={() => {
                        if (!contact || isLoading) return;

                        router.push(`/myprofile?userUuid=${contact.uuid}`);
                    }}
                >
                    {isLoading && <Spinner size="small" />}
                    {contact && (
                        <Fragment>
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
                                    R$ {contact.price}
                                </Text>
                            </VStack>
                        </Fragment>
                    )}
                </Pressable>
            </HStack>
            <VStack flex={1}>
                {formActive ? (
                    <SendMessageForm
                        setPaymentItems={setPaymentItems}
                        sendMessage={sendMessage}
                        setFormActive={setFormActive}
                        conversationId={conversationId}
                        recipientSettings={{
                            chatSettings:
                                contactConversation?.contactChatSettings ?? {},
                        }}
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
                                        handleSendToPayment={() => {
                                            setSendToPayment(true);
                                        }}
                                        sendToPayment={sendToPayment}
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
                                        changePriority={(
                                            priority: ConversationPriority,
                                        ) =>
                                            changeConversationPriority({
                                                conversationId,
                                                priority,
                                            })
                                        }
                                        paymentItems={paymentItems}
                                        contactName={contact?.name}
                                        needAnswerOpen={needAnswerOpen}
                                        setNeedAnswerOpen={setNeedAnswerOpen}
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
                                        <AttachmentsMenu
                                            conversationId={conversationId}
                                            sendMessage={sendMessage}
                                        />
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
                                                        setMessage("");

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
                                        <Text
                                            fontSize={16}
                                            fontFamily="$arialHeading"
                                            color="$primaryDefault"
                                        >
                                            {Math.abs(
                                                (contactConversation?.totalAnswers ??
                                                    3) - 3,
                                            )}
                                            /3
                                        </Text>
                                    </HStack>
                                )}
                        </ImageBackground>
                    </VStack>
                )}
            </VStack>
            {sendToPayment && (
                <Confirmation
                    contact={contactConversation?.contact}
                    conversationId={conversationId}
                    paymentItems={paymentItems}
                    setSendToPayment={setSendToPayment}
                />
            )}
        </BaseContainer>
    );
};

export default ChatsScreen;
