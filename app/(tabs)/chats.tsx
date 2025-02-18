import { useState } from "react";
import { useRouter } from "expo-router";

import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Box,
    Divider,
    FlatList,
    HStack,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    Pressable,
    Spinner,
    Text,
    VStack,
} from "@/gluestackComponents";

import { useNotifications } from "@/hooks/NotificationHook";

import { findConversations } from "@/connection/conversations/ConversationConnection";

import EmptyChats from "@/assets/icons/appIcons/emptyChat.svg";

import { useInfiniteQuery } from "@tanstack/react-query";

import { useOnlineUsersStore } from "@/stores/onlineUsersStore";

import { CircleUserRound, Search, X } from "lucide-react-native";

import { DeleteConversation } from "@/components/tabs/conversations/DeleteConversation";
import { ClearConversation } from "@/components/tabs/conversations/ClearConversation";
import { BlockUser } from "@/components/tabs/conversations/BlockUser";
import { Category, CategoryTabs } from "@/components/tabs/explore/CategoryTabs";
import { BaseContainer } from "@/components/BaseContainer";
import { ChatCard } from "@/components/chats/ChatCard";
import { MainTitle } from "@/components/MainTitle";

const ChatsScreen = () => {
    const router = useRouter();
    const { notificationsCount } = useNotifications();

    const categories: Category[] = [
        { name: "Todas", filterName: "" },
        { name: "Não lidas", filterName: "unread" },
        { name: "Expiradas", filterName: "expired" },
        { name: "Finalizadas", filterName: "finished" },
    ];

    const [selectedCategory, setSelectedCategory] = useState<string>(
        categories[0].filterName,
    );

    const {
        data: queryChats,
        fetchNextPage: fetchNextChats,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["conversations", selectedCategory],
        queryFn: ({ pageParam }) =>
            findConversations(pageParam, selectedCategory),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });

    const chats =
        queryChats?.pages.map((page) => page.conversations).flat() ?? [];

    const [searchTerm, setSearchTerm] = useState("");

    const [idSelectedChat, setIdSelectedChat] = useState<string | null>(null);

    const selectedChat = chats?.find((chat) => chat.id === idSelectedChat);

    const hasMore =
        queryChats?.pages[queryChats.pages.length - 1].nextPage !== null;

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleCategorySelect = (filterName: string) => {
        setSelectedCategory(
            categories.find((category) => category.filterName === filterName)
                ?.filterName ?? "",
        );
    };

    const fetchMoreConversations = async () => {
        if (!hasMore) return;

        fetchNextChats();
    };

    const filteredChats =
        chats?.filter((chat) =>
            (chat?.participant?.name ?? "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
        ) ?? [];

    const onlineUsers = useOnlineUsersStore((state) => state.onlineUsers);

    return (
        <BaseContainer gap="$2">
            <MainTitle
                title="Conversas"
                onPress={() => router.push("/notifications")}
                notificationsCount={notificationsCount}
            />
            <Input
                mt="$2"
                variant="rounded"
                bgColor="#E5E7EB"
                size="xl"
                borderWidth={0}
            >
                <InputSlot bgColor="#E5E7EB" pl="$5" pt="$1">
                    <InputIcon>
                        <Search size={20} color="#6B7280" />
                    </InputIcon>
                </InputSlot>
                <InputField
                    pl="$3"
                    bgColor="#E5E7EB"
                    placeholder="Pesquisar"
                    placeholderTextColor="#6B7280"
                    size="lg"
                    onChangeText={(text) => handleSearch(text)}
                />
            </Input>
            <VStack gap="$4" flex={1}>
                <CategoryTabs
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategorySelect}
                    type="lightBlue"
                />
                <Box flex={1}>
                    {filteredChats.length === 0 && !isLoading ? (
                        <VStack alignItems="center" flex={1} mt="$4">
                            <EmptyChats width={180} height={180} />
                            <Box>
                                <Text
                                    fontSize={22}
                                    textAlign="center"
                                    color="#000"
                                    fontFamily="$heading"
                                >
                                    Envie uma mensagem e aguarde o início de uma
                                    nova conexão.
                                </Text>
                            </Box>
                        </VStack>
                    ) : (
                        <FlatList
                            data={filteredChats}
                            keyExtractor={(chat: any) => chat.id.toString()}
                            renderItem={({ item }: any) => {
                                const isOnline = onlineUsers.includes(
                                    Number(item.participant.id),
                                );

                                return (
                                    <ChatCard
                                        chat={item}
                                        name={item.participant.name}
                                        icon={item.participant.icon}
                                        isOnline={isOnline}
                                        onLongPress={() =>
                                            setIdSelectedChat(item.id)
                                        }
                                    />
                                );
                            }}
                            mb="$2"
                            onEndReached={fetchMoreConversations}
                            onEndReachedThreshold={0.5}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={
                                isLoading ? (
                                    <VStack
                                        alignItems="center"
                                        justifyContent="center"
                                        flex={1}
                                    >
                                        <Spinner size="large" />
                                    </VStack>
                                ) : null
                            }
                        />
                    )}
                </Box>
            </VStack>
            <Actionsheet
                isOpen={idSelectedChat !== null}
                onClose={() => setIdSelectedChat(null)}
            >
                <ActionsheetBackdrop backgroundColor="#000" />
                <ActionsheetContent bgColor="$gray200">
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator bgColor="#000" />
                    </ActionsheetDragIndicatorWrapper>
                    <ActionsheetItem>
                        <HStack
                            gap="$2"
                            alignItems="center"
                            justifyContent="space-between"
                            w="$full"
                        >
                            <HStack
                                gap="$2"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Avatar width={40} height={40} ml="$2">
                                    <AvatarFallbackText rounded="$lg">
                                        {selectedChat?.participant.name}
                                    </AvatarFallbackText>
                                    {selectedChat?.participant.icon && (
                                        <AvatarImage
                                            rounded="$full"
                                            source={{
                                                uri: selectedChat?.participant
                                                    .icon,
                                            }}
                                            alt={`Foto de perfil de ${selectedChat?.participant.name}`}
                                        />
                                    )}
                                </Avatar>
                                <Text
                                    size="lg"
                                    fontFamily="$heading"
                                    color="$black"
                                >
                                    {selectedChat?.participant.name}
                                </Text>
                            </HStack>
                            <Pressable onPress={() => setIdSelectedChat(null)}>
                                <X size={20} color="#000" />
                            </Pressable>
                        </HStack>
                    </ActionsheetItem>
                    <ActionsheetItem px="$3" mt="-$2" mb="$2">
                        <VStack
                            p="$2"
                            w="$full"
                            rounded="$xl"
                            bgColor="$gray50"
                        >
                            <HStack
                                py="$3"
                                px="$3"
                                alignItems="center"
                                gap="$3"
                            >
                                <CircleUserRound size={20} color="#000" />
                                <Text
                                    fontFamily="$arialBody"
                                    color="$black"
                                    size="lg"
                                >
                                    Ver Perfil
                                </Text>
                            </HStack>
                            <Divider bgColor="$gray300" />
                            <ClearConversation
                                conversationId={selectedChat?.id ?? ""}
                                conversationName={
                                    selectedChat?.participant.name ?? ""
                                }
                                onClose={() => setIdSelectedChat(null)}
                            />
                            <Divider bgColor="$gray300" />
                            <DeleteConversation
                                conversationId={selectedChat?.id ?? ""}
                                conversationName={
                                    selectedChat?.participant.name ?? ""
                                }
                                onClose={() => setIdSelectedChat(null)}
                            />
                            <Divider bgColor="$gray300" />
                            <BlockUser
                                blockedId={selectedChat?.participant.id ?? ""}
                                blockedName={
                                    selectedChat?.participant.name ?? ""
                                }
                                onClose={() => setIdSelectedChat(null)}
                            />
                        </VStack>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>
        </BaseContainer>
    );
};

export default ChatsScreen;
