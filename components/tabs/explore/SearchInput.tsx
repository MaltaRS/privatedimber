import React, { Fragment, useCallback, useEffect, useState } from "react";

import { useRouter } from "expo-router";

import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Button,
    ButtonGroup,
    ButtonText,
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

import { SavedSearchCard } from "../search/savedSearchs";
import { Filter } from "./Filter";

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
            {showConfirmation && (
                <AlertDialog
                    isOpen={showConfirmation}
                    onClose={() => setShowConfirmation(false)}
                >
                    <AlertDialogBackdrop backgroundColor="#000" />
                    <AlertDialogContent bgColor="$gray100">
                        <AlertDialogHeader alignItems="center">
                            <Text
                                textAlign="center"
                                fontSize="$lg"
                                fontWeight="bold"
                            >
                                Limpar histórico de buscas
                            </Text>
                            <AlertDialogCloseButton>
                                <X size={20} color="#000" />
                            </AlertDialogCloseButton>
                        </AlertDialogHeader>
                        <AlertDialogBody mb="$2">
                            <Text textAlign="center">
                                Você realmente deseja limpar o historico de
                                buscas?
                            </Text>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <ButtonGroup gap="$4">
                                <Button
                                    flex={1}
                                    action="negative"
                                    onPress={() => {
                                        setShowConfirmation(false);
                                    }}
                                >
                                    <ButtonText textAlign="center">
                                        Cancelar
                                    </ButtonText>
                                </Button>
                                <Button
                                    flex={1}
                                    bg="$primaryDefault"
                                    action="negative"
                                    onPress={() => {
                                        DeleteAllRecentSearchs();
                                        setShowConfirmation(false);
                                    }}
                                >
                                    <ButtonText textAlign="center">
                                        Sim
                                    </ButtonText>
                                </Button>
                            </ButtonGroup>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
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
                            <Search size={20} color="#6B7280" />
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
                            <VStack gap="$4" w="$full">
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
                                            fontSize={21}
                                            color="#000"
                                            fontWeight="bold"
                                        >
                                            Recentes
                                        </Text>
                                        <Text
                                            fontSize={16}
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
                                        fontSize={21}
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
                                        <VStack>
                                            {recentSearchs.map(
                                                (recentSearch, index) => (
                                                    <SavedSearchCard
                                                        id={recentSearch.id}
                                                        name={recentSearch.name}
                                                        icon={recentSearch.icon}
                                                        price={100}
                                                        index={index}
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
                                            (searchResult, index) => (
                                                <Pressable
                                                    onPress={() =>
                                                        HandleUserSelect(
                                                            searchResult,
                                                        )
                                                    }
                                                    w="$full"
                                                    key={index}
                                                >
                                                    <HStack
                                                        gap="$1"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        p="$1"
                                                        w="$full"
                                                    >
                                                        <HStack gap="$2">
                                                            <Avatar
                                                                width={60}
                                                                height={60}
                                                                rounded="$lg"
                                                                bgColor="$primaryDark"
                                                            >
                                                                <AvatarFallbackText>
                                                                    {
                                                                        searchResult.name
                                                                    }
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
                                                                    {
                                                                        searchResult.name
                                                                    }
                                                                </Text>
                                                            </VStack>
                                                        </HStack>
                                                    </HStack>
                                                </Pressable>
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
