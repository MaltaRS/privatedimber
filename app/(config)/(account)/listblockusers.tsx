import React, { Fragment, useState } from "react";

import { useRouter } from "expo-router";

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
    Avatar,
    AvatarImage,
    AvatarFallbackText,
} from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";
import { SkeletonBox } from "@/components/utils/SkeletonBox";

import { useBlockedUsers } from "@/hooks/useBlockedUsers";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { unblockUser } from "@/connection/auth/UserConnection";

import { MaterialIcons } from "@expo/vector-icons";

import { toast } from "burnt";

const ListBlockUsersScreen = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data: blockedUsers = [], isLoading, refetch } = useBlockedUsers();

    const [searchTerm, setSearchTerm] = useState("");
    const [isUnblocking, setIsUnblocking] = useState<string | null>(null);

    const removeBlockedUserMutation = useMutation({
        mutationFn: unblockUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blockedUsers"] });
        },
    });

    const filteredUsers = blockedUsers.filter(
        (user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name.toLowerCase().includes(searchTerm.toLowerCase()),
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

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title="Usuários Bloqueados" />

                <VStack p="$1" gap="$4">
                    <Input variant="rounded" size="xl" borderWidth={0}>
                        <InputSlot bgColor="$gray200" pl="$5" pt="$1">
                            <InputIcon>
                                <Search size={20} color="#6B7280" />
                            </InputIcon>
                        </InputSlot>
                        <InputField
                            pl="$3"
                            bgColor="$gray200"
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
                                renderItem={({ item }: { item: any }) => (
                                    <Fragment>
                                        <Pressable
                                            onPress={() =>
                                                router.push(
                                                    `/myprofile?userUuid=${item.uuid}`,
                                                )
                                            }
                                        >
                                            <HStack
                                                w="100%"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                py="$2"
                                                px="$3"
                                            >
                                                <HStack
                                                    alignItems="center"
                                                    gap="$3"
                                                >
                                                    <Avatar
                                                        margin={3}
                                                        borderRadius={10}
                                                        width={60}
                                                        height={60}
                                                        rounded="$full"
                                                    >
                                                        <AvatarFallbackText
                                                            fontSize={30}
                                                        >
                                                            {item.name}
                                                        </AvatarFallbackText>
                                                        <AvatarImage
                                                            source={{
                                                                uri: item.icon,
                                                            }}
                                                            alt={`Foto de perfil de ${item.name}`}
                                                        />
                                                    </Avatar>

                                                    <VStack gap={3}>
                                                        <HStack alignItems="center">
                                                            <Text
                                                                bold
                                                                fontSize={18}
                                                            >
                                                                {item.name}
                                                            </Text>
                                                            {item.verifiedAt && (
                                                                <MaterialIcons
                                                                    style={{
                                                                        paddingLeft: 4,
                                                                    }}
                                                                    name="verified"
                                                                    size={14}
                                                                    color="#00A8FF"
                                                                />
                                                            )}
                                                        </HStack>
                                                        <Text
                                                            fontSize={16}
                                                            color="$gray500"
                                                        >
                                                            @{item.username}
                                                        </Text>
                                                    </VStack>
                                                </HStack>

                                                <Pressable
                                                    onPress={() =>
                                                        handleUnblock(item.id)
                                                    }
                                                    disabled={
                                                        isUnblocking === item.id
                                                    }
                                                >
                                                    <Text
                                                        fontSize={17}
                                                        color="$primaryDefault"
                                                    >
                                                        {isUnblocking ===
                                                        item.id
                                                            ? "Desbloqueando..."
                                                            : "Desbloquear"}
                                                    </Text>
                                                </Pressable>
                                            </HStack>
                                        </Pressable>
                                    </Fragment>
                                )}
                                keyExtractor={(item: any) => item.id.toString()}
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
