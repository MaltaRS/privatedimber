import { FC, ReactNode, useState } from "react";

import { View, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";

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

import { useInfiniteQuery } from "@tanstack/react-query";

import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";
import {
    findTransactions,
    Transaction,
} from "@/connection/transactions/TransactionConnection";

import AntDesign from "@expo/vector-icons/AntDesign";

import IconWithdraw from "@/assets/icons/appIcons/payment.svg";
import IconDonation from "@/assets/icons/appIcons/donation.svg";
import IconCard from "@/assets/icons/appIcons/card.svg";

import { formatCurrency } from "@/utils/formatters";
import { SkeletonBox } from "@/components/utils/SkeletonBox";
import { SvgProps } from "react-native-svg";
import { useBalance } from "@/providers/BalanceProvider";

const WalletScreen = () => {
    const router = useRouter();
    const { notificationsCount } = useNotifications();

    const {
        balance,
        isLoading: isBalanceLoading,
        isBalanceHidden,
        toggleBalanceVisibility,
    } = useBalance();

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
        const formattedBalance =
            balance !== null ? formatCurrency(balance / 100) : "R$ 0,00";

        return (
            <VStack alignItems="center" justifyContent="center" mt={30}>
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
                        <SkeletonBox width={160} height={54} />
                    ) : (
                        <Heading size="4xl">
                            {isBalanceHidden ? "****" : `${formattedBalance}`}
                        </Heading>
                    )}

                    <TouchableOpacity onPress={toggleBalanceVisibility}>
                        <AntDesign
                            name="eye"
                            size={24}
                            color="#999"
                            marginLeft={10}
                        />
                    </TouchableOpacity>
                </HStack>

                <HStack alignItems="center" justifyContent="center">
                    <Text size="md" mb={2}>
                        Disponível para uso
                    </Text>

                    <Text bold size="md" ml="$1">
                        {isBalanceLoading ? (
                            <SkeletonBox width={50} height={18} />
                        ) : isBalanceHidden ? (
                            "****"
                        ) : (
                            `${formattedBalance.replaceAll(" ", "")}`
                        )}
                    </Text>
                </HStack>
            </VStack>
        );
    };

    const MiniButtonsWallet = ({
        name,
        icon: Icon,
        nav,
    }: {
        name: string;
        icon: FC<SvgProps>;
        nav: string;
    }) => {
        const iconWidth = name === "Sacar" ? 80 : 56;
        const iconHeight = name === "Sacar" ? 80 : 56;

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
                    <Icon style={{ width: iconWidth, height: iconHeight }} />
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
                <MiniButtonsWallet
                    name="Sacar"
                    icon={IconWithdraw}
                    nav="/withdrawal"
                />

                <MiniButtonsWallet
                    name="Cartões"
                    icon={IconCard}
                    nav="/mycards"
                />

                <MiniButtonsWallet
                    name="Doar"
                    icon={IconDonation}
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
                        <IconWithdraw width={25} height={25} />
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
                        color={isNegative ? "#000000" : "$positive"}
                    >
                        {isNegative
                            ? `- ${formattedAmount}`
                            : `+ ${formattedAmount}`}
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

    const TransactionCardSkeleton = () => {
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
                        <SkeletonBox
                            width={25}
                            height={25}
                            style={{ marginRight: 2 }}
                        />
                        <VStack style={{ marginLeft: 12 }} gap="$2">
                            <SkeletonBox width={120} height={20} />
                            <SkeletonBox
                                width={150}
                                height={16}
                                style={{ marginTop: 4 }}
                            />
                        </VStack>
                    </HStack>
                    <SkeletonBox width={80} height={20} />
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
                        <Text color="$primaryDefault">Ver extrato</Text>
                    </TouchableOpacity>
                </HStack>

                <VStack flex={1}>
                    {isLoading && transactions.length === 0 ? (
                        <VStack flex={1} mt="$4">
                            {[1, 2, 3, 4].map((index) => (
                                <TransactionCardSkeleton key={index} />
                            ))}
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
