import { Fragment, useState } from "react";
import { Keyboard } from "react-native";
import { useRouter } from "expo-router";
import {
  HStack,
  ScrollView,
  VStack,
  Text,
  Pressable,
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
import { useTranslation } from "react-i18next";
import Feather from '@expo/vector-icons/Feather';

import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Search, Grid, List } from "lucide-react-native";
import {
  GetFavorites,
  GetMostPopular,
} from "@/connection/explore/ExploreConnection";
import { useOnlineUsersStore } from "@/stores/onlineUsersStore";
import { handleFavorite } from "@/utils/favorites";

const ExploreScreen = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
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
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isListView, setIsListView] = useState(false);

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

  const categories: Category[] = [
    { name: "Geral", filterName: "Geral" },
    { name: "Beleza", filterName: "Beleza" },
    { name: "Tecnologia", filterName: "Tecnologia" },
    { name: "Finanças e Investimentos", filterName: "Finanças e Investimentos" },
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
    if (likedIds.includes(id)) return;
    setLikedIds((prev) => [...prev, id]);
    const isFavorited = popularUsers?.some(
      (item) => String(item.id) === String(id) && item.isFavorited,
    );
    await handleFavorite({
      id,
      isFavorited: !!isFavorited,
      queryClient,
      onError: () => setLikedIds((prev) => prev.filter((likedId) => likedId !== id)),
      onSuccess: () => setLikedIds((prev) => prev.filter((likedId) => likedId !== id)),
    });
  };

  const onlineUsers = useOnlineUsersStore((state) => state.onlineUsers);

  return (
    <BaseContainer gap="$2">
      <MainTitle
        title={t("explore.title")}
        onPress={() => router.push("/notifications")}
        notificationsCount={notificationsCount}
        hide={isSearching}
      />

      <Animated.View style={animatedSearchStyle}>
        <HStack alignItems="center" space="md">
          <SearchInput
            flex={1}
            isSearching={isSearching}
            onFocus={() => setIsSearching(true)}
            onCancel={() => {
              Keyboard.dismiss();
              setIsSearching(false);
            }}
          />
          <Pressable onPress={() => setShowFilterModal(true)}>
            <HStack
              alignItems="center"
              px="$3"
              py="$2"
              borderWidth={1}
              borderColor="#E5E7EB"
              borderRadius="$lg"
              bg="#FFF"
            >
              <Text fontSize="$sm" color="#111827">
                {t("explore.filters")}
              </Text>
            </HStack>
          </Pressable>
          <Pressable onPress={() => setIsListView((prev) => !prev)} >
            {isListView ? <Grid size={20} color="#111827" /> : <List size={20} color="#111827" />}
          </Pressable>
        </HStack>
      </Animated.View>

      {!isSearching && (
        <Fragment>
          <VStack gap="$2" >
            {userFavorites && userFavorites?.length !== 0 && !isLoadingFavorites ? (
              <Fragment>
                <HStack alignItems="center" justifyContent="space-between" marginTop={10} >
                  <Text pb="$2" fontFamily="$Inter_600SemiB old" fontSize={18} color="#00A8FF" lineHeight={28} >
                    {t("explore.mostPopular")}
                  </Text>

                  <VStack backgroundColor="#f1f1f1" paddingLeft={10} paddingRight={10} borderRadius={20} >
                  <Text fontFamily="$Inter_600SemiBold" fontSize={15} color="#000" lineHeight={28} >
                    ver todos
                  </Text>
                  </VStack>
                </HStack>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <HStack gap="$4">
                    {userFavorites.map((item, index) => {
                      const isOnline = onlineUsers.includes(Number(item?.id));
                      return (
                        <FavoriteCard
                          key={index}
                          name={item.name}
                          icon={item.icon || ""}
                          isOnline={isOnline}
                          positionRank={index + 1} // MODIFICAÇÃO APLICADA AQUI
                          onPress={() => router.push(`/(profile)/${item.uuid}`)}
                        />
                      );
                    })}
                  </HStack>
                </ScrollView>
              </Fragment>
            ) : userFavorites?.length === 0 ? null : (
              <Fragment>
                <Text pt="$1" fontFamily="$Inter_600SemiBold" size="xs" color="#000" lineHeight={28}>
                  {t("explore.favorites")}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <HStack gap="$4">
                    {Array(4).fill(null).map((_, index) => (
                      <FavoriteCardSkeleton key={index} />
                    ))}
                  </HStack>
                </ScrollView>
              </Fragment>
            )}
          </VStack>

          <VStack gap="$1" flex={1}>
            <HStack alignItems="center" justifyContent="center" marginTop={20} >
              <VStack width={10} height={10} borderRadius={100} backgroundColor="#00A8FF" marginRight={7} />
              <VStack width={10} height={10} borderRadius={100} backgroundColor="#999" marginRight={7} />
              <VStack width={10} height={10} borderRadius={100} backgroundColor="#999" marginRight={7} />
              <VStack width={10} height={10} borderRadius={100} backgroundColor="#999" marginRight={7} />
              <VStack width={10} height={10} borderRadius={100} backgroundColor="#999" marginRight={7} />
            </HStack>

            <Pressable onPress={() => router.push("/(profile)/1234")} > 
              <HStack alignItems="center" justifyContent="space-between" marginTop={30} >
                <Text pb="$2" fontFamily="$Inter_600SemiB old" fontSize={18} color="#00A8FF" lineHeight={28}>
                  {t("explore.mostPopular")}
                </Text>
                <HStack alignItems="center" >
                  <Feather marginRight={5} name="star" size={17} color="#00A8FF" />

                  <VStack backgroundColor="#f1f1f1" paddingLeft={10} paddingRight={10} borderRadius={20} >
                    <Text fontFamily="$Inter_600SemiBold" fontSize={15} color="#000" lineHeight={28} >
                      ver todos
                    </Text>
                  </VStack>
                </HStack>
              </HStack>
            </Pressable>

            {popularUsers.length === 0 && !isLoadingPopularUsers ? (
              <VStack flex={1} py="$10" alignItems="center" justifyContent="center">
                <Search size={24} color="#9CA3AF" />
                <Text fontFamily="$heading" size="lg" color="#9CA3AF" fontWeight="$bold" mt="$4">
                  {t("explore.noUsersFound")}
                </Text>
              </VStack>
            ) : (
              <FlatList
                data={isLoadingPopularUsers ? Array(6).fill(null) : popularUsers}
                keyExtractor={(item: any, index) =>
                  item?.id?.toString() || index.toString()
                }
                refreshing={isLoadingPopularUsers && popularUsers.length > 0}
                onRefresh={() => {
                  queryClient.invalidateQueries({ queryKey: ["popularUsers"] });
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
                      onPress={() => router.push(`/(profile)/${item.uuid}`)}
                      w={isListView ? "100%" : "48.5%"}
                    />
                  )
                }
                numColumns={isListView ? 1 : 2}
                columnWrapperStyle={!isListView ? { justifyContent: "space-between" } : undefined}
                mb="$1"
                onEndReached={GetPopularUsers}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
              />
            )}
          </VStack>
        </Fragment>
      )}

      {showFilterModal && (
        <VStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0,0,0,0.5)"
          justifyContent="center"
          alignItems="center"
          zIndex={1000}
        >
          <VStack
            w="90%"
            bg="#FFF"
            p="$4"
            borderRadius="$2xl"
            shadow="9"
            space="md"
          >
            <Text fontFamily="$heading" fontSize="$lg" color="#111827">
              {t("explore.selectFilters")}
            </Text>

            {categories.map((cat) => (
              <Pressable
                key={cat.name}
                onPress={() => {
                  setSelectedCategory(cat.filterName);
                  setShowFilterModal(false);
                }}
              >
                <Text
                  fontSize="$md"
                  color={selectedCategory === cat.filterName ? "#111827" : "#6B7280"}
                >
                  {cat.name}
                </Text>
              </Pressable>
            ))}

            <Pressable onPress={() => setShowFilterModal(false)} >
              <Text color="#EF4444" fontWeight="$bold" textAlign="right">
                {t("explore.close")}
              </Text>
            </Pressable>
          </VStack>
        </VStack>
      )}
    </BaseContainer>
  );
};

export default ExploreScreen;