import { Fragment, useCallback, useEffect, useState } from "react";

import { useRouter } from "expo-router";

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    HStack,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    Pressable,
    ScrollView,
    Spinner,
    Text,
    Toast,
    ToastDescription,
    ToastTitle,
    useToast,
    VStack,
} from "@/gluestackComponents";

import { SecureStoreUnencrypted } from "@/utils/SecureStorage";
import api from "@/utils/api";

import { User } from "@/Context/AuthProvider";
import { useSocket } from "@/Context/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";

import { ArrowLeft, Search, SlidersHorizontal, X } from "lucide-react-native";

interface SearchInputProps {
    isSearching: boolean;
    onFocus: () => void;
    onCancel: () => void;
}

export const SearchInput = ({
    isSearching,
    onFocus,
    onCancel,
}: SearchInputProps) => {
    const router = useRouter();
    const toast = useToast();
    const queryClient = useQueryClient();

    const { socket } = useSocket();

    const [isLoading, setIsLoading] = useState(false);

    const [value, setValue] = useState("");
    const [lastValueChecked, setLastValueChecked] = useState("");

    const [searchResults, setSearchResults] = useState<User[]>([]);

    const [recentSearchs, setRecentSearchs] = useState<User[]>([]);

    const GetRecentSearchs = () => {
        const recentSearchs = SecureStoreUnencrypted.getItem("recentSearchs");

        if (recentSearchs) {
            setRecentSearchs(JSON.parse(recentSearchs).reverse());
        }
    };

    const DeleteRecentUserSearch = (userId: string) => {
        const recentSearchs = SecureStoreUnencrypted.getItem("recentSearchs");

        if (recentSearchs) {
            const recentSearchsParsed = JSON.parse(recentSearchs);

            const newRecentSearchs = recentSearchsParsed.filter(
                (user: User) => user.id !== userId,
            );

            SecureStoreUnencrypted.saveItem(
                "recentSearchs",
                JSON.stringify(newRecentSearchs),
            );

            setRecentSearchs(newRecentSearchs);
        }
    };

    const SaveRecentUserSearch = (user: User) => {
        let recentSearchsSaved =
            SecureStoreUnencrypted.getItem("recentSearchs");

        let recentSearchs: User[] = [];

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

    const HandleSearch = useCallback(
        async (search: string) => {
            if (searchResults.length === 0) {
                setIsLoading(true);
            }

            setLastValueChecked(search);

            try {
                const response = await api.get(`/user/search/${search}`);

                setSearchResults(response.data);
            } catch (error) {
                console.error("Error searching: ", error);
            } finally {
                setIsLoading(false);
            }
        },
        [searchResults],
    );

    const HandleUserSelect = async (user: User) => {
        if (!socket) return;

        SaveRecentUserSearch(user);

        socket.emit(
            "CreateConversation",
            { participantId: user.id },
            (response: any) => {
                if (response.error) {
                    console.error(
                        "Error creating conversation: ",
                        response.error,
                    );
                    toast.show({
                        placement: "top",
                        render: ({ id }) => {
                            const toastId = "toast-" + id;
                            return (
                                <Toast nativeID={toastId} action="error">
                                    <VStack space="xs" flex={1}>
                                        <ToastTitle>Erro</ToastTitle>
                                        <ToastDescription>
                                            Ocorreu um erro ao criar a conversa.
                                        </ToastDescription>
                                    </VStack>
                                </Toast>
                            );
                        },
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
        if (!value) return;

        let delayDebounceFn: NodeJS.Timeout;
        if (value !== lastValueChecked && value.trim() !== "") {
            delayDebounceFn = setTimeout(() => {
                HandleSearch(value);
            }, 500);
        }

        return () => clearTimeout(delayDebounceFn);
    }, [lastValueChecked, value, HandleSearch]);

    useEffect(() => {
        GetRecentSearchs();
    }, []);

    return (
        <VStack gap="$2" mt="$2">
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
                    bgColor="#E5E7EB"
                    size="xl"
                    borderWidth={0}
                    alignItems="center"
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
                        value={value}
                        onChangeText={setValue}
                        onFocus={onFocus}
                    />
                    {!isSearching ? (
                        <InputSlot bgColor="#E5E7EB" pr="$3" pt="$1">
                            <InputIcon>
                                <SlidersHorizontal size={20} color="#62656b" />
                            </InputIcon>
                        </InputSlot>
                    ) : (
                        value.trim() !== "" && (
                            <InputSlot
                                bgColor="#E5E7EB"
                                pr="$3"
                                pt="$1"
                                onPress={() => {
                                    setValue("");
                                    setSearchResults([]);
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
                            <VStack gap="$2" w="$full">
                                {recentSearchs.length === 0 && value === "" ? (
                                    <Fragment></Fragment>
                                ) : (
                                    <Text fontSize="$lg" fontWeight="bold">
                                        {value !== ""
                                            ? "Resultado da pesquisa"
                                            : "Recentes"}
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
                                        recentSearchs.map(
                                            (recentSearch, index) => (
                                                <HStack
                                                    gap="$2"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    p="$2"
                                                    key={index}
                                                >
                                                    <HStack gap="$2">
                                                        <Avatar
                                                            width={60}
                                                            height={60}
                                                            rounded="$lg"
                                                        >
                                                            <AvatarFallbackText>
                                                                {
                                                                    recentSearch.name
                                                                }
                                                            </AvatarFallbackText>
                                                            {recentSearch.icon && (
                                                                <AvatarImage
                                                                    rounded="$lg"
                                                                    source={{
                                                                        uri: recentSearch.icon,
                                                                    }}
                                                                    alt={`Foto de perfil de ${recentSearch.name}`}
                                                                />
                                                            )}
                                                        </Avatar>
                                                        <VStack gap="$2">
                                                            <Text>
                                                                {
                                                                    recentSearch.name
                                                                }
                                                            </Text>
                                                        </VStack>
                                                    </HStack>
                                                    <Pressable
                                                        onPress={() =>
                                                            DeleteRecentUserSearch(
                                                                recentSearch.id,
                                                            )
                                                        }
                                                    >
                                                        <X size={20} />
                                                    </Pressable>
                                                </HStack>
                                            ),
                                        )
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
                                    searchResults.map((searchResult, index) => (
                                        <Pressable
                                            onPress={() =>
                                                HandleUserSelect(searchResult)
                                            }
                                            w="$full"
                                            key={index}
                                        >
                                            <HStack
                                                gap="$1"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                p="$1"
                                            >
                                                <HStack gap="$2">
                                                    <Avatar
                                                        width={60}
                                                        height={60}
                                                        rounded="$lg"
                                                    >
                                                        <AvatarFallbackText>
                                                            {searchResult.name}
                                                        </AvatarFallbackText>
                                                        {searchResult.icon && (
                                                            <AvatarImage
                                                                rounded="$lg"
                                                                source={{
                                                                    uri: searchResult.icon,
                                                                }}
                                                                alt={`Foto de perfil de ${searchResult.name}`}
                                                            />
                                                        )}
                                                    </Avatar>
                                                    <VStack gap="$2">
                                                        <Text
                                                            fontFamily="$arialBody"
                                                            size="lg"
                                                        >
                                                            {searchResult.name}
                                                        </Text>
                                                    </VStack>
                                                </HStack>
                                            </HStack>
                                        </Pressable>
                                    ))
                                )}
                            </VStack>
                        </ScrollView>
                    </VStack>
                )
            ) : (
                <Fragment></Fragment>
            )}
        </VStack>
    );
};
