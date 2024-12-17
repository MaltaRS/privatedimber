import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";

import { useRouter } from "expo-router";

import {
    HStack,
    ScrollView,
    VStack,
    Text,
    Spinner,
    useToast,
} from "@/gluestackComponents";

import { MagnifyingGlass } from "phosphor-react-native";

import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";
import { CategoryTabs } from "@/components/tabs/explore/CategoryTabs";
import {
    FavoriteCard,
    FavoriteCardProps,
} from "@/components/tabs/explore/FavoriteCard";
import { SearchInput } from "@/components/tabs/explore/SearchInput";
import {
    ExploreCard,
    ExploreCardProps,
} from "@/components/tabs/explore/ExploreCard";

import { useNotifications } from "@/hooks/NotificationHook";

import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

import api from "@/utils/api";
import { mockCategories } from "@/utils/mockDados";

import { useSocket } from "@/Context/SocketProvider";

import { useQueryClient } from "@tanstack/react-query";

import * as Burnt from "burnt";

const ExploreScreen = () => {
    const router = useRouter();
    const toast = useToast();
    const queryClient = useQueryClient();

    const { socket } = useSocket();

    const { notificationsCount } = useNotifications();

    const [isSearching, setIsSearching] = useState(false);

    const animatedSearchStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: withTiming(isSearching ? -58 : 0, {
                    duration: 200,
                }),
            },
        ],
        zIndex: 999,
    }));

    const [loadingStates, setLoadingStates] = useState({
        favoriteCards: false,
        popularUsers: false,
    });

    const [linkingIds, setLinkingIds] = useState<string[]>([]);

    const [categories, setCategories] = useState<string[]>(mockCategories);
    const [selectedCategory, setSelectedCategory] = useState<string>("Geral");

    const [favoriteCards, setFavoriteCards] = useState<FavoriteCardProps[]>([]);

    const [cards, setCards] = useState<Omit<ExploreCardProps, "onLike">[]>([]);

    const GetFavoriteCards = async () => {
        setLoadingStates((prev) => ({ ...prev, favoriteCards: true }));

        //TODO: change the request to tanstack query yeah!

        try {
            const response = await api.get("/user/favorites");

            setFavoriteCards(response.data);
        } catch (error) {
            console.log("Favorites Error: ", error);
        } finally {
            setLoadingStates((prev) => ({ ...prev, favoriteCards: false }));
        }
    };

    const GetPopularUsers = async () => {
        setLoadingStates((prev) => ({ ...prev, popularUsers: true }));

        try {
            const response = await api.get("/user/popular?offset=0");

            setCards(
                response.data.map((item: any) => ({
                    ...item,
                    liked: item.isFavorited,
                })),
            );
        } catch (error) {
            console.log("Popular Error: ", error);
        } finally {
            setLoadingStates((prev) => ({ ...prev, popularUsers: false }));
        }
    };

    const HandleLike = async (id: string) => {
        console.log("HandleLike: ", id);

        if (linkingIds.includes(id)) {
            return;
        }

        setLinkingIds((prev) => [...prev, id]);

        try {
            if (cards.find((card) => card.id === id)?.liked) {
                setCards((prevCards) =>
                    prevCards.map((card) => {
                        if (card.id === id) {
                            return { ...card, liked: !card.liked };
                        }
                        return card;
                    }),
                );

                await api.delete(`/user/favorites/${id}`);

                setFavoriteCards((prevFavorites: any) =>
                    prevFavorites.filter((favorite: any) => favorite.id !== id),
                );

                return;
            }

            setCards((prevCards) =>
                prevCards.map((card) => {
                    if (card.id === id) {
                        return { ...card, liked: !card.liked };
                    }
                    return card;
                }),
            );

            await api.post("/user/favorites", {
                userId: id,
            });

            setFavoriteCards((prevFavorites: any) => {
                const newFavorite = cards.find((card) => card.id === id);
                return [...prevFavorites, newFavorite];
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLinkingIds((prev) =>
                prev.filter((linkingId) => linkingId !== id),
            );
        }
    };

    const CreateConversation = async (participantId: string) => {
        if (!socket) return;

        socket.emit(
            "CreateConversation",
            { participantId },
            (response: any) => {
                console.log("CreateConversation response: ", response);
                if (response.error) {
                    console.error(
                        "Error creating conversation: ",
                        response.error,
                    );
                    Burnt.toast({
                        title: "Erro ao criar conversa, tente novamente mais tarde!",
                        haptic: "error",
                        duration: 3,
                        preset: "error",
                        from: "top",
                    });
                } else {
                    queryClient.invalidateQueries({
                        queryKey: ["conversations"],
                    });

                    router.push(`/(conversations)/${response.id}`);
                }
            },
        );
    };

    useEffect(() => {
        GetFavoriteCards();
        GetPopularUsers();
    }, []);

    return (
        <BaseContainer gap="$2">
            <MainTitle
                title="Explorar"
                onPress={() => router.push("/notifications")}
                notificationsCount={notificationsCount}
                hide={isSearching}
            />
            <Animated.View style={animatedSearchStyle}>
                <SearchInput
                    isSearching={isSearching}
                    onFocus={() => setIsSearching(true)}
                    onCancel={() => {
                        Keyboard.dismiss();
                        setIsSearching(false);
                    }}
                />
            </Animated.View>
            {!isSearching && (
                <CategoryTabs
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={(category) =>
                        setSelectedCategory(category)
                    }
                    type="darkBlue"
                />
            )}
            {!isSearching && (
                <>
                    <VStack gap="$3">
                        {favoriteCards.length !== 0 &&
                        !loadingStates.favoriteCards ? (
                            <>
                                <Text
                                    fontFamily="$heading"
                                    fontSize={18}
                                    color="#000"
                                    onPress={() => {
                                        Burnt.toast({
                                            title: "Favoritos",
                                            haptic: "success",
                                            duration: 3,
                                            preset: "done",
                                            from: "top",
                                        });
                                    }}
                                >
                                    Favoritos
                                </Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <HStack gap="$4">
                                        {favoriteCards.map((item, index) => (
                                            <FavoriteCard
                                                key={index}
                                                name={item.name}
                                                icon={item.icon}
                                                isActive={
                                                    item.isActive ?? false
                                                }
                                            />
                                        ))}
                                    </HStack>
                                </ScrollView>
                            </>
                        ) : favoriteCards.length === 0 ? null : (
                            <VStack
                                alignItems="center"
                                justifyContent="center"
                                py="$4"
                            >
                                <Spinner size="large" />
                            </VStack>
                        )}
                    </VStack>
                    <VStack gap="$3" flex={1} pt="$2" bgColor="#12212">
                        <Text
                            fontFamily="$heading"
                            size="2xl"
                            color="#000"
                            fontWeight="$bold"
                        >
                            Mais populares
                        </Text>
                        {cards.length === 0 ? (
                            <VStack
                                flex={1}
                                py="$10"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <MagnifyingGlass size={24} color="#9CA3AF" />
                                <Text
                                    fontFamily="$heading"
                                    size="lg"
                                    color="#9CA3AF"
                                    fontWeight="$bold"
                                    mt="$4"
                                >
                                    Nenhum usuário encontrado
                                </Text>
                            </VStack>
                        ) : !loadingStates.popularUsers ? (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <HStack gap="$4" flexWrap="wrap">
                                    {cards.map((item, index) => (
                                        <ExploreCard
                                            key={index}
                                            id={item.id}
                                            icon={item.icon}
                                            name={item.name}
                                            tags={item.tags ?? []}
                                            price={item.price ?? "R$ 100,00"}
                                            isChecked={item.isChecked ?? false}
                                            liked={item.liked ?? false}
                                            onLike={(id) => HandleLike(id)}
                                            onPress={() =>
                                                CreateConversation(item.id)
                                            }
                                        />
                                    ))}
                                </HStack>
                            </ScrollView>
                        ) : (
                            <VStack
                                flex={1}
                                py="$10"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Spinner size="large" />
                            </VStack>
                        )}
                    </VStack>
                </>
            )}
        </BaseContainer>
    );
};

export default ExploreScreen;
