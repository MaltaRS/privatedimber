import { useState } from "react";

import { Search, X } from "lucide-react-native";

import {
    VStack,
    HStack,
    Text,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    FlatList,
    Pressable,
    Spinner,
} from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";
import { SkeletonBox } from "@/components/utils/SkeletonBox";
import { useBlockedUsers } from "@/hooks/useBlockedUsers";

import { toast } from "burnt";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { unblockUser } from "@/connection/auth/UserConnection";

const ListBlockUsersScreen = () => {
    const queryClient = useQueryClient();

    const { data: blockedUsers = [], isLoading, refetch } = useBlockedUsers();

    const [searchTerm, setSearchTerm] = useState("");
    const [isUnblocking, setIsUnblocking] = useState<string | null>(null);

    const removeBlockedUserMutation = useMutation({
        mutationFn: unblockUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blockedUsers"] });
        },
    });

    const filteredUsers = blockedUsers.filter((userId) =>
        userId.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleUnblock = async (userId: string) => {
        setIsUnblocking(userId);
        try {
            await removeBlockedUserMutation.mutateAsync(userId);
            toast({
                title: "Usuário desbloqueado",
                message: "O usuário foi desbloqueado com sucesso.",
                haptic: "success",
            });
            refetch();
        } catch (error) {
            console.error("Erro ao desbloquear usuário:", error);
            toast({
                title: "Erro",
                message:
                    "Não foi possível desbloquear o usuário. Tente novamente.",
                haptic: "error",
            });
        } finally {
            setIsUnblocking(null);
        }
    };

    const LoadingSkeleton = () => (
        <VStack gap="$4">
            <VStack gap="$2">
                <SkeletonBox width={220} height={28} />
                <VStack
                    bgColor="$white"
                    pl="$4"
                    borderRadius="$xl"
                    elevation={2}
                >
                    {[1, 2, 3].map((item) => (
                        <HStack
                            key={item}
                            py="$4"
                            pr="$4"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <SkeletonBox width={180} height={24} />
                            <SkeletonBox
                                width={80}
                                height={32}
                                borderRadius="$lg"
                            />
                        </HStack>
                    ))}
                </VStack>
            </VStack>
        </VStack>
    );

    const renderItem = ({ item }: { item: any }) => (
        <HStack
            py="$4"
            px="$4"
            alignItems="center"
            justifyContent="space-between"
            borderBottomWidth={1}
            borderBottomColor="$gray200"
        >
            <Text fontSize={16} color="$gray800">
                {item}
            </Text>
            <Pressable
                onPress={() => handleUnblock(item)}
                disabled={isUnblocking === item}
                bgColor="$red100"
                px="$3"
                py="$1"
                borderRadius="$lg"
            >
                {isUnblocking === item ? (
                    <Spinner size="small" color="$red500" />
                ) : (
                    <Text color="$red500" fontSize={14}>
                        Desbloquear
                    </Text>
                )}
            </Pressable>
        </HStack>
    );

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title="Usuários Bloqueados" />

                <VStack p="$1" gap="$4">
                    <Input
                        variant="rounded"
                        bgColor="$white"
                        size="xl"
                        borderWidth={0}
                    >
                        <InputSlot bgColor="$gray100" pl="$5" pt="$1">
                            <InputIcon>
                                <Search size={20} color="#6B7280" />
                            </InputIcon>
                        </InputSlot>
                        <InputField
                            pl="$3"
                            bgColor="$gray100"
                            placeholder="Pesquisar usuário bloqueado"
                            placeholderTextColor="#6B7280"
                            size="lg"
                            onChangeText={setSearchTerm}
                            value={searchTerm}
                        />
                        {searchTerm ? (
                            <InputSlot pr="$3">
                                <Pressable onPress={() => setSearchTerm("")}>
                                    <X size={20} color="#6B7280" />
                                </Pressable>
                            </InputSlot>
                        ) : null}
                    </Input>

                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : filteredUsers.length === 0 ? (
                        <VStack alignItems="center" py="$8">
                            <Text
                                fontSize={16}
                                color="$gray500"
                                textAlign="center"
                            >
                                {searchTerm
                                    ? "Nenhum usuário bloqueado encontrado para esta pesquisa."
                                    : "Você não tem nenhum usuário bloqueado."}
                            </Text>
                        </VStack>
                    ) : (
                        <VStack
                            bgColor="$white"
                            borderRadius="$xl"
                            elevation={2}
                            overflow="hidden"
                        >
                            <FlatList
                                data={filteredUsers}
                                renderItem={renderItem}
                                keyExtractor={(item: any) => item.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                        </VStack>
                    )}
                </VStack>
            </VStack>
        </BaseContainer>
    );
};

export default ListBlockUsersScreen;
