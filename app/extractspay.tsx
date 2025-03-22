import React, { useState } from "react";

import { View, TouchableOpacity, StyleSheet } from "react-native";

import {
    Text,
    VStack,
    HStack,
    Input,
    ScrollView,
    InputSlot,
    InputIcon,
    InputField,
    Modal,
    Image,
    Spinner,
    FlatList,
} from "@/gluestackComponents";

import { Calendar, Search } from "lucide-react-native";

import { BaseContainer } from "@/components/BaseContainer";

import HeaderContainer from "../components/HeaderContainer";

import Payment from "@/assets/icons/appIcons/payment.svg";
import Refund from "@/assets/icons/appIcons/refundPayment.svg";

import { useInfiniteQuery } from "@tanstack/react-query";
import {
    findTransactions,
    Transaction,
} from "@/connection/transactions/TransactionConnection";
import { formatCurrency } from "@/utils/formatters";
import { SkeletonBox } from "@/components/utils/SkeletonBox";

const iconlistpay = require("../assets/images/iconlistpay.png");

export default function ExtractsPay() {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);

    const {
        data: queryTransactions,
        fetchNextPage: fetchNextTransactions,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["transactions", searchQuery, selectedPeriod],
        queryFn: ({ pageParam }) => findTransactions(pageParam, searchQuery),
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

    const MiniButtonsWallet = ({
        name,
        icon,
        onPress,
    }: {
        name: string;
        icon: "calendar" | "credit-card" | "undo";
        onPress: () => void;
    }) => {
        const Icon = icon === "calendar" ? Calendar : null;

        return (
            <TouchableOpacity onPress={onPress} style={styles.miniButton}>
                <HStack alignItems="center" gap="$2">
                    {Icon ? (
                        <Icon size={16} color="black" />
                    ) : icon === "credit-card" ? (
                        //@ts-expect-error
                        <Payment size={16} color="black" />
                    ) : icon === "undo" ? (
                        //@ts-expect-error
                        <Refund size={16} color="black" />
                    ) : null}

                    <Text fontSize={15} color="$gray600">
                        {name}
                    </Text>
                </HStack>
            </TouchableOpacity>
        );
    };

    const ContainerCategoryPay = () => (
        <HStack>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollContainer}
            >
                <HStack space="md">
                    <MiniButtonsWallet
                        name="Período"
                        icon="calendar"
                        onPress={() => setModalVisible(true)}
                    />
                    <MiniButtonsWallet
                        name="Pagamento"
                        icon="credit-card"
                        onPress={() => setSearchQuery("payment")}
                    />
                    <MiniButtonsWallet
                        name="Estorno"
                        icon="undo"
                        onPress={() => setSearchQuery("refund")}
                    />
                </HStack>
            </ScrollView>
        </HStack>
    );

    const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
        if (!transaction) return null;

        const isNegative = transaction.amount < 0;
        const formattedAmount = formatCurrency(
            Math.abs(transaction.amount / 100 || 0),
        );

        return (
            <View>
                <HStack style={styles.itemContainer}>
                    <HStack alignItems="center">
                        <Image source={iconlistpay} style={styles.itemIcon} />
                        <VStack style={styles.itemTextContainer}>
                            <Text fontSize={15.5} bold color="#1F2937">
                                {transaction.description || "Transação"}
                            </Text>
                            <Text fontSize={14.5} style={{ color: "#7D8697" }}>
                                Envio para {transaction.destinationName || ""}
                            </Text>
                        </VStack>
                    </HStack>
                    <Text bold fontSize={16}>
                        {isNegative ? `-${formattedAmount}` : formattedAmount}
                    </Text>
                </HStack>
                <View style={styles.divider} />
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
                <View style={styles.divider} />
            </View>
        );
    };

    const handlePeriodSelect = (days: number) => {
        setSelectedPeriod(days);
        setModalVisible(false);
    };

    return (
        <BaseContainer>
            <HeaderContainer title="Extrato" />

            <Input
                mt="$3"
                variant="rounded"
                bgColor="#E5E7EB"
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
                    placeholder="Pesquisar"
                    placeholderTextColor="#6B7280"
                    size="lg"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </Input>

            <ContainerCategoryPay />

            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <Modal.Content style={styles.modalBottom}>
                    <Modal.Header>
                        <Text style={styles.modalTitle}>
                            Filtrar por período
                        </Text>
                    </Modal.Header>

                    <HStack justifyContent="space-between" padding={10}>
                        <TouchableOpacity
                            onPress={() => handlePeriodSelect(15)}
                        >
                            <Text style={styles.modalBody}>
                                Últimos 15 dias
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handlePeriodSelect(30)}
                        >
                            <Text style={styles.modalBody}>
                                Últimos 30 dias
                            </Text>
                        </TouchableOpacity>
                    </HStack>

                    <HStack justifyContent="space-between" padding={10}>
                        <TouchableOpacity
                            onPress={() => handlePeriodSelect(60)}
                        >
                            <Text style={styles.modalBody}>
                                Últimos 60 dias
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handlePeriodSelect(90)}
                        >
                            <Text style={styles.modalBody}>
                                Últimos 90 dias
                            </Text>
                        </TouchableOpacity>
                    </HStack>

                    <Modal.Footer>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.confirmButton}
                        >
                            <Text color="white">Filtrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelButton}>Cancelar</Text>
                        </TouchableOpacity>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <VStack flex={1} mt="$1">
                {isLoading && transactions.length === 0 ? (
                    <VStack flex={1} mt="$4">
                        {[1, 2, 3].map((index) => (
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
                        <Text fontSize={16} textAlign="center" color="#6B7280">
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
        </BaseContainer>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        marginTop: 20,
    },

    miniButton: {
        borderRadius: 20,
        borderColor: "#D1D5DB",
        borderWidth: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
    },

    itemContainer: {
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 20,
    },

    itemIcon: {
        width: 25,
        height: 25,
    },

    itemTextContainer: {
        marginLeft: 12,
    },

    divider: {
        marginTop: 15,
        width: "100%",
        height: 2,
        backgroundColor: "#f1f1f1",
        borderRadius: 10,
    },

    modalBottom: {
        position: "absolute",
        bottom: 0,
        paddingTop: 12,
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },

    modalBody: {
        fontSize: 16,
        margin: 2,
    },

    confirmButton: {
        width: 358,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00A8FF",
        borderRadius: 40,
    },

    cancelButton: {
        color: "#00A8FF",
        marginTop: 10,
        textAlign: "center",
    },
});
