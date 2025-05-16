import { Fragment, useEffect, useState } from "react";

import { useRouter } from "expo-router";

import {
    HStack,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    Pressable,
    ScrollView,
    Spinner,
    Text,
    VStack,
} from "@/gluestackComponents";

import { useSocket } from "@/Context/SocketProvider";

import { ArrowLeft, Search, SlidersHorizontal, X } from "lucide-react-native";

import { SavedSearchCard } from "../search/savedSearchs";
import { Filter } from "./Filter";

import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

import { SecureStoreUnencrypted } from "@/utils/SecureStorage";
import {
    SearchUsers,
    ExploreUser,
} from "@/connection/explore/ExploreConnection";

import { useQuery } from "@tanstack/react-query";

type ExtendedUser = ExploreUser;

type SearchInputProps = {
    isSearching: boolean;
    onFocus: () => void;
    onCancel: () => void;
};

export const SearchInput = ({
    isSearching,
    onFocus,
    onCancel,
}: SearchInputProps) => {
    const router = useRouter();
    const { socket } = useSocket();

    const [value, setValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    const { data: searchResults = [], isLoading } = useQuery({
        queryKey: ["search", debouncedValue],
        queryFn: () => SearchUsers(debouncedValue),
        enabled: debouncedValue.length > 0,
    });

    const [recentSearchs, setRecentSearchs] = useState<ExtendedUser[]>([]);

    const [showConfirmation, setShowConfirmation] = useState(false);

    const [filterOpen, setFilterOpen] = useState(false);

    const GetRecentSearchs = () => {
        const recentSearchs = SecureStoreUnencrypted.getItem("recentSearchs");

        if (recentSearchs) {
            setRecentSearchs(JSON.parse(recentSearchs).reverse());
        }
    };

    const DeleteAllRecentSearchs = () => {
        SecureStoreUnencrypted.deleteItem("recentSearchs");
        setRecentSearchs([]);
    };

    const SaveRecentUserSearch = (user: ExtendedUser) => {
        let recentSearchsSaved =
            SecureStoreUnencrypted.getItem("recentSearchs");

        let recentSearchs: ExtendedUser[] = [];

        if (recentSearchsSaved) {
            recentSearchs = JSON.parse(recentSearchsSaved);

            const userExists = recentSearchs.some(
                (recentUser) => recentUser.id === user.id,
            );

            if (userExists) {
                return;
            }
        }

        recentSearchs.push(user);

        SecureStoreUnencrypted.saveItem(
            "recentSearchs",
            JSON.stringify(recentSearchs),
        );

        setRecentSearchs(recentSearchs);
    };

    const HandleUserSelect = async (user: ExtendedUser) => {
        if (!socket) return;

        SaveRecentUserSearch(user);

        router.push(`/(profile)/${user.uuid}`);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (value !== debouncedValue) {
                setDebouncedValue(value);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [value, debouncedValue]);

    useEffect(() => {
        GetRecentSearchs();
    }, []);

    return (
        <VStack gap="$2" mt="$2">
            <ConfirmationModal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={() => {
                    DeleteAllRecentSearchs();
                    setShowConfirmation(false);
                }}
                title="Limpar histórico"
                message="Você realmente deseja limpar o histórico de buscas?"
            />
            <HStack gap="$2" alignItems="center">
                {isSearching && (
                    <Pressable
                        p="$1"
                        w={isSearching ? "10%" : "auto"}
                        alignItems="center"
                        justifyContent="center"
                        rounded="$full"
                        onPress={() => {
                            setValue("");
                            onCancel();
                        }}
                    >
                        <ArrowLeft size={20} color="black" />
                    </Pressable>
                )}
                <Input
                    w={isSearching ? "90%" : "$full"}
                    variant="rounded"
                    bgColor="$gray100"
                    size="xl"
                    borderWidth={0}
                    alignItems="center"
                >
                    <InputSlot bgColor="$gray100" pl="$5" pt="$1">
                        <InputIcon>
                            <Search size={20} color="#00a8ff" />
                        </InputIcon>
                    </InputSlot>
                    <InputField
                        pl="$3"
                        bgColor="$gray100"
                        placeholder="Pesquisar"
                        placeholderTextColor="#6B7280"
                        size="lg"
                        value={value}
                        onChangeText={setValue}
                        onFocus={onFocus}
                    />
                    {!isSearching ? (
                        <InputSlot
                            bgColor="$gray100"
                            pr="$3"
                            pt="$1"
                            onPress={() => {
                                setFilterOpen(true);
                            }}
                        >
                            <InputIcon>
                                <SlidersHorizontal size={20} color="#62656b" />
                            </InputIcon>
                        </InputSlot>
                    ) : (
                        value.trim() !== "" && (
                            <InputSlot
                                bgColor="$gray100"
                                pr="$3"
                                pt="$1"
                                onPress={() => {
                                    setValue("");
                                    setDebouncedValue("");
                                }}
                            >
                                <InputIcon>
                                    <X size={20} color="#62656b" />
                                </InputIcon>
                            </InputSlot>
                        )
                    )}
                </Input>
            </HStack>
            {isSearching ? (
                isLoading ? (
                    <VStack
                        gap="$2"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Spinner size="large" />
                    </VStack>
                ) : (
                    <VStack>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <VStack gap="$4" w="$full" mt="$1">
                                {recentSearchs.length === 0 && value === "" ? (
                                    <Fragment></Fragment>
                                ) : value === "" ? (
                                    <HStack
                                        w="$full"
                                        gap="$2"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Text
                                            fontSize={23}
                                            color="#000"
                                            fontWeight="bold"
                                        >
                                            Recentes
                                        </Text>
                                        <Text
                                            fontSize={19}
                                            fontWeight="bold"
                                            letterSpacing="$xl"
                                            color="$primaryDefault"
                                            mr="$1"
                                            onPress={() =>
                                                setShowConfirmation(true)
                                            }
                                        >
                                            Limpar histórico
                                        </Text>
                                    </HStack>
                                ) : (
                                    <Text
                                        fontSize={23}
                                        color="#000"
                                        fontWeight="bold"
                                    >
                                        Resultado da pesquisa
                                    </Text>
                                )}
                                {value === "" ? (
                                    recentSearchs.length === 0 ? (
                                        <Text
                                            textAlign="center"
                                            color="#000"
                                            mt="$3"
                                            px="$4"
                                        >
                                            Tente buscar por nomes de usuários,
                                            emails ou nomes
                                        </Text>
                                    ) : (
                                        <VStack gap="$2">
                                            {recentSearchs.map(
                                                (recentSearch, index) => (
                                                    <SavedSearchCard
                                                        id={String(
                                                            recentSearch.id,
                                                        )}
                                                        name={recentSearch.name}
                                                        icon={
                                                            recentSearch.icon ??
                                                            ""
                                                        }
                                                        tags={recentSearch.tags}
                                                        index={index}
                                                        isFavorited={
                                                            recentSearch.isFavorited ??
                                                            false
                                                        }
                                                        showFavorite={false}
                                                        onPress={() =>
                                                            HandleUserSelect(
                                                                recentSearch,
                                                            )
                                                        }
                                                        key={index}
                                                    />
                                                ),
                                            )}
                                        </VStack>
                                    )
                                ) : searchResults.length === 0 ? (
                                    <Text
                                        textAlign="center"
                                        color="#000"
                                        mt="$3"
                                        px="$4"
                                    >
                                        Nenhum resultado encontrado, tente
                                        buscar por palavras-chave
                                    </Text>
                                ) : (
                                    <VStack w="$full" gap="$3">
                                        {searchResults.map(
                                            (
                                                searchResult: ExploreUser,
                                                index: number,
                                            ) => (
                                                <SavedSearchCard
                                                    id={String(searchResult.id)}
                                                    name={searchResult.name}
                                                    icon={
                                                        searchResult.icon ?? ""
                                                    }
                                                    isFavorited={
                                                        searchResult.isFavorited ??
                                                        false
                                                    }
                                                    tags={searchResult.tags}
                                                    index={index}
                                                    showFavorite={true}
                                                    onPress={() =>
                                                        HandleUserSelect(
                                                            searchResult,
                                                        )
                                                    }
                                                    key={index}
                                                />
                                            ),
                                        )}
                                    </VStack>
                                )}
                            </VStack>
                        </ScrollView>
                    </VStack>
                )
            ) : (
                <Fragment></Fragment>
            )}
            <Filter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
        </VStack>
    );
};
