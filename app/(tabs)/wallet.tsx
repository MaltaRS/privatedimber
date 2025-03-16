import { useState } from "react";

import { View, TouchableOpacity, Image } from "react-native";

import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useNotifications } from "@/hooks/NotificationHook";

import {
    Text,
    VStack,
    HStack,
    Divider,
    Heading,
    Spinner,
    FlatList,
} from "@/gluestackComponents";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";
import {
    findTransactions,
    Transaction,
} from "@/connection/transactions/TransactionConnection";

import AntDesign from "@expo/vector-icons/AntDesign";

import iconsake from "@/assets/images/iconsake.png";
import iconhand from "@/assets/images/iconhand.png";
import iconcartwallet from "@/assets/images/iconcartwallet.png";
import iconlistpay from "@/assets/images/iconlistpay.png";

import { formatCurrency } from "@/utils/formatters";
import { getBalance } from "@/connection/wallet/WalletConnection";

const WalletScreen = () => {
    const router = useRouter();
    const [isBalanceHidden, setIsBalanceHidden] = useState(false);
    const { notificationsCount } = useNotifications();

    const { data: balanceData, isLoading: isBalanceLoading } = useQuery({
        queryKey: ["balance"],
        queryFn: getBalance,
        staleTime: 1000 * 60,
    });

    const {
        data: queryTransactions,
        fetchNextPage: fetchNextTransactions,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["transactions"],
        queryFn: ({ pageParam }) => findTransactions(pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage?.nextPage !== null ? lastPage.nextPage : undefined;
        },
        staleTime: 1000 * 60 * 5,
    });

    const transactions =
        queryTransactions?.pages
            ?.filter((page) => page && page.transactions)
            .flatMap((page) => page.transactions) ?? [];

    const hasMore =
        queryTransactions?.pages?.[queryTransactions.pages.length - 1]
            ?.nextPage !== null;

    const fetchMoreTransactions = async () => {
        if (!hasMore || isLoading) return;
        await fetchNextTransactions();
    };

    const HeaderInfosWallet = () => {
        const formattedBalance = balanceData
            ? formatCurrency(balanceData.balance / 100)
            : "0,00";

        return (
            <VStack
                alignItems="center"
                justifyContent="center"
                style={{ marginTop: 30 }}
            >
                <TouchableOpacity
                    onPress={() => router.push("/totalbalance")}
                    style={{
                        width: 102,
                        height: 28,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: "#999",
                    }}
                >
                    <Text fontSize={13} color="#999" bold>
                        Saldo Total
                    </Text>
                </TouchableOpacity>

                <HStack
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 30,
                    }}
                >
                    {isBalanceLoading ? (
                        <Spinner size="large" />
                    ) : (
                        <Heading size="4xl">
                            {isBalanceHidden
                                ? "****"
                                : `R$ ${formattedBalance}`}
                        </Heading>
                    )}

                    <TouchableOpacity
                        onPress={() => setIsBalanceHidden(!isBalanceHidden)}
                    >
                        <AntDesign
                            name="eye"
                            size={24}
                            color="#999"
                            marginLeft={10}
                        />
                    </TouchableOpacity>
                </HStack>

                <HStack>
                    <Text size="md">Disponível para uso</Text>

                    <Text bold size="md" style={{ marginLeft: 5 }}>
                        {isBalanceHidden ? "****" : `R$ ${formattedBalance}`}
                    </Text>
                </HStack>
            </VStack>
        );
    };

    const MiniButtonsWallet = ({
        name,
        icon,
        nav,
    }: {
        name: string;
        icon: any;
        nav: string;
    }) => {
        return (
            <VStack alignItems="center" justifyContent="center">
                <TouchableOpacity
                    onPress={() => {
                        try {
                            router.push(nav as any);
                        } catch (error) {
                            console.error("Navigation error:", error);
                        }
                    }}
                    style={{
                        borderRadius: 300,
                        backgroundColor: "#F9F9F9",
                        width: 56,
                        height: 56,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image source={icon} style={{ width: 56, height: 56 }} />
                </TouchableOpacity>

                <Text style={{ fontSize: 15 }}>{name}</Text>
            </VStack>
        );
    };

    const ContainerMiniButtonsWallet = () => {
        return (
            <HStack
                alignItems="center"
                justifyContent="center"
                pt="$6"
                gap="25"
            >
                <MiniButtonsWallet name="Sacar" icon={iconsake} nav="/sake" />

                <MiniButtonsWallet
                    name="Cartões"
                    icon={iconcartwallet}
                    nav="/mycarts"
                />

                <MiniButtonsWallet
                    name="Doar"
                    icon={iconhand}
                    nav="/listinstituition"
                />
            </HStack>
        );
    };

    const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
        if (!transaction) return null;

        const isNegative = transaction.amount < 0;
        const formattedAmount = formatCurrency(
            Math.abs(transaction.amount / 100 || 0),
        );

        return (
            <View>
                <HStack
                    style={{
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "space-between",
                        marginTop: 20,
                    }}
                    className="bg-white mr-4"
                >
                    <HStack
                        style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Image
                            source={iconlistpay}
                            style={{ width: 25, height: 25, marginRight: 2 }}
                        />
                        <VStack style={{ marginLeft: 12 }}>
                            <Text fontSize={15.5} bold color="#1F2937">
                                {transaction.description || "Transação"}
                            </Text>
                            <Text fontSize={14.5} style={{ color: "#7D8697" }}>
                                Envio para {transaction.destinationName || ""}
                            </Text>
                        </VStack>
                    </HStack>

                    <Text
                        bold
                        fontSize={16}
                        color={isNegative ? "#374151" : "#10B981"}
                    >
                        {isNegative ? `-${formattedAmount}` : formattedAmount}
                    </Text>
                </HStack>
                <View
                    style={{
                        marginTop: 20,
                        width: "100%",
                        height: 2,
                        backgroundColor: "#f1f1f1",
                        borderRadius: 10,
                    }}
                />
            </View>
        );
    };

    const ContainerListPayWallet = () => {
        return (
            <VStack style={{ width: "100%", marginTop: 30, flex: 1 }}>
                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Heading size="xl">Extrato</Heading>

                    <TouchableOpacity
                        onPress={() => router.push("/extractspay")}
                    >
                        <Text color="#00A8FF">Ver extrato</Text>
                    </TouchableOpacity>
                </HStack>

                <VStack flex={1}>
                    {isLoading && transactions.length === 0 ? (
                        <VStack
                            alignItems="center"
                            justifyContent="center"
                            flex={1}
                            mt="$4"
                        >
                            <Spinner size="large" />
                        </VStack>
                    ) : transactions.length === 0 ? (
                        <VStack
                            alignItems="center"
                            justifyContent="center"
                            flex={1}
                            mt="$4"
                        >
                            <Text
                                fontSize={16}
                                textAlign="center"
                                color="#6B7280"
                            >
                                Nenhuma transação encontrada
                            </Text>
                        </VStack>
                    ) : (
                        <FlatList
                            data={transactions}
                            keyExtractor={(item: any) =>
                                item.id?.toString() || Math.random().toString()
                            }
                            renderItem={({ item }: { item: any }) => (
                                <TransactionCard transaction={item} />
                            )}
                            onEndReached={fetchMoreTransactions}
                            onEndReachedThreshold={0.5}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={
                                isLoading ? (
                                    <VStack
                                        alignItems="center"
                                        justifyContent="center"
                                        py="$4"
                                    >
                                        <Spinner size="small" />
                                    </VStack>
                                ) : null
                            }
                        />
                    )}
                </VStack>
            </VStack>
        );
    };

    return (
        <BaseContainer>
            <StatusBar style="auto" />
            <MainTitle
                title="Carteira"
                onPress={() => router.push("/notifications")}
                notificationsCount={notificationsCount}
            />
            <HeaderInfosWallet />
            <ContainerMiniButtonsWallet />
            <Divider bgColor="$gray300" marginTop="$6" />
            <ContainerListPayWallet />
        </BaseContainer>
    );
};

export default WalletScreen;
