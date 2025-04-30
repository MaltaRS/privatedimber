import React, { Fragment, useState } from "react";

import { Keyboard } from "react-native";

import { useRouter } from "expo-router";

import {
    HStack,
    ScrollView,
    VStack,
    Text,
    FlatList,
} from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";
import { Category, CategoryTabs } from "@/components/tabs/explore/CategoryTabs";
import { FavoriteCard } from "@/components/tabs/explore/FavoriteCard";
import { SearchInput } from "@/components/tabs/explore/SearchInput";
import { ExploreCard } from "@/components/tabs/explore/ExploreCard";
import { ExploreCardSkeleton } from "@/components/tabs/explore/ExploreCardSkeleton";
import { FavoriteCardSkeleton } from "@/components/tabs/explore/FavoriteCardSkeleton";

import { useNotifications } from "@/hooks/NotificationHook";

import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

import api from "@/utils/api";

import {
    useInfiniteQuery,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { Search } from "lucide-react-native";

import { toast } from "burnt";

import {
    GetFavorites,
    GetMostPopular,
} from "@/connection/explore/ExploreConnection";

import { useOnlineUsersStore } from "@/stores/onlineUsersStore";

const ExploreScreen = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { notificationsCount } = useNotifications();

    const { data: userFavorites, isLoading: isLoadingFavorites } = useQuery({
        queryKey: ["userFavorites"],
        queryFn: GetFavorites,
    });

    const {
        data: popularData,
        fetchNextPage: fetchNextPopularPage,
        isLoading: isLoadingPopularUsers,
    } = useInfiniteQuery({
        queryKey: ["popularUsers"],
        queryFn: GetMostPopular,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });

    const popularUsers =
        popularData?.pages.map((page) => page.popularUsers).flat() ?? [];

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

    const [likedIds, setLikedIds] = useState<string[]>([]);

    const categories: Category[] = [
        {
            name: "Geral",
            filterName: "Geral",
        },
        {
            name: "Beleza",
            filterName: "Beleza",
        },
        {
            name: "Tecnologia",
            filterName: "Tecnologia",
        },
        {
            name: "Finanças e Investimentos",
            filterName: "Finanças e Investimentos",
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState<string>(
        categories[0].filterName,
    );

    const hasMorePopularUsers =
        popularData?.pages[popularData.pages.length - 1].nextPage !== null;

    const GetPopularUsers = async () => {
        if (!hasMorePopularUsers) return;

        fetchNextPopularPage();
    };

    const HandleLike = async (id: string) => {
        if (likedIds.includes(id)) {
            return;
        }

        setLikedIds((prev) => [...prev, id]);

        try {
            const isFavorited = popularUsers?.some(
                (item) => String(item.id) === String(id) && item.isFavorited,
            );

            if (isFavorited) {
                await api.delete(`/user/favorites/${id}`);

                queryClient.setQueryData(["popularUsers"], (prev: any) => ({
                    ...prev,
                    pages: prev.pages.map((page: any) => ({
                        ...page,
                        popularUsers: page.popularUsers.map((item: any) =>
                            item.id === id
                                ? { ...item, isFavorited: false }
                                : item,
                        ),
                    })),
                }));

                queryClient.setQueryData(["userFavorites"], (prev: any) =>
                    prev.filter((item: any) => item.id !== id),
                );

                return;
            }

            await api.post("/user/favorites", {
                userId: id,
            });

            queryClient.setQueryData(["popularUsers"], (prev: any) => ({
                ...prev,
                pages: prev.pages.map((page: any) => ({
                    ...page,
                    popularUsers: page.popularUsers.map((item: any) =>
                        item.id === id ? { ...item, isFavorited: true } : item,
                    ),
                })),
            }));

            const newFavorite = popularUsers?.find(
                (item) => String(item.id) === String(id),
            );

            if (newFavorite) {
                queryClient.setQueryData(["userFavorites"], (prev: any) => [
                    newFavorite,
                    ...(prev || []),
                ]);
            }
        } catch (error) {
            console.error("Erro ao (des)favoritar:", error);
            toast({
                title: "Erro ao processar sua solicitação!",
                haptic: "error",
                duration: 2,
                preset: "error",
                from: "top",
            });
        } finally {
            setLikedIds((prev) => prev.filter((likedId) => likedId !== id));
        }
    };

    const onlineUsers = useOnlineUsersStore((state) => state.onlineUsers);

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
                    onFocus={() => {
                        setIsSearching(true);
                    }}
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
                    type="lightBlue"
                />
            )}
            {!isSearching && (
                <Fragment>
                    <VStack gap="$1">
                        {userFavorites &&
                        userFavorites?.length !== 0 &&
                        !isLoadingFavorites ? (
                            <Fragment>
                                <Text
                                    pt="$1"
                                    fontFamily="$novaTitle"
                                    fontSize={20}
                                    color="#000"
                                    lineHeight={28}
                                >
                                    Favoritos
                                </Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <HStack gap="$4">
                                        {userFavorites.map((item, index) => {
                                            const isOnline =
                                                onlineUsers.includes(
                                                    Number(item?.id),
                                                );

                                            return (
                                                <FavoriteCard
                                                    key={index}
                                                    name={item.name}
                                                    icon={item.icon || ""}
                                                    isOnline={isOnline}
                                                    onPress={() =>
                                                        router.push(
                                                            `/(profile)/${item.uuid}`,
                                                        )
                                                    }
                                                />
                                            );
                                        })}
                                    </HStack>
                                </ScrollView>
                            </Fragment>
                        ) : userFavorites?.length === 0 ? null : (
                            <Fragment>
                                <Text
                                    pt="$1"
                                    fontFamily="$novaTitle"
                                    fontSize={20}
                                    color="#000"
                                    lineHeight={28}
                                >
                                    Favoritos
                                </Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <HStack gap="$4">
                                        {Array(4)
                                            .fill(null)
                                            .map((_, index) => (
                                                <FavoriteCardSkeleton
                                                    key={index}
                                                />
                                            ))}
                                    </HStack>
                                </ScrollView>
                            </Fragment>
                        )}
                    </VStack>
                    <VStack gap="$1" flex={1}>
                        <Text
                            pb="$1"
                            fontFamily="$novaTitle"
                            fontSize={20}
                            color="#0f1010"
                            lineHeight={28}
                        >
                            Mais populares
                        </Text>
                        {popularUsers.length === 0 && !isLoadingPopularUsers ? (
                            <VStack
                                flex={1}
                                py="$10"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Search size={24} color="#9CA3AF" />
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
                        ) : (
                            <FlatList
                                data={
                                    isLoadingPopularUsers
                                        ? Array(6).fill(null)
                                        : popularUsers
                                }
                                keyExtractor={(item: any, index) =>
                                    item?.id?.toString() || index.toString()
                                }
                                refreshing={
                                    isLoadingPopularUsers &&
                                    popularUsers.length > 0
                                }
                                onRefresh={() => {
                                    queryClient.invalidateQueries({
                                        queryKey: ["popularUsers"],
                                    });
                                }}
                                renderItem={({ item }: any) =>
                                    isLoadingPopularUsers ? (
                                        <ExploreCardSkeleton />
                                    ) : (
                                        <ExploreCard
                                            key={item.uuid}
                                            id={item.id}
                                            icon={item.icon || ""}
                                            name={item.name}
                                            tags={item.tags ?? []}
                                            price={item.price ?? "R$ 100,00"}
                                            isChecked={item.isChecked ?? false}
                                            liked={item.isFavorited ?? false}
                                            onLike={(id) => HandleLike(id)}
                                            onPress={() =>
                                                router.push(
                                                    `/(profile)/${item.uuid}`,
                                                )
                                            }
                                        />
                                    )
                                }
                                numColumns={2}
                                columnWrapperStyle={{
                                    justifyContent: "space-between",
                                }}
                                mb="$1"
                                onEndReached={GetPopularUsers}
                                onEndReachedThreshold={0.5}
                                showsVerticalScrollIndicator={false}
                            />
                        )}
                    </VStack>
                </Fragment>
            )}
        </BaseContainer>
    );
};

export default ExploreScreen;
