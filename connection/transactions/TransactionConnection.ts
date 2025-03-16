import api from "@/utils/api";

export type Transaction = {
    id: string;
    uuid: string;
    amount: number;
    description: string;
    destinationName: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    metadata?: Record<string, any>;
    destination?: {
        name: string;
        username: string;
        icon: string | null;
        email: string;
    };
};

export type TransactionsResponse = {
    transactions: Transaction[];
    totalTransactions: number;
    nextPage: number | null;
};

export const findTransactions = async (
    pageParam: number,
    filter?: string,
): Promise<TransactionsResponse> => {
    try {
        const { data } = await api.get<TransactionsResponse>(
            "/payments/transactions",
            {
                params: {
                    offset: pageParam,
                    limit: 10,
                    ...(filter && { filter }),
                },
            },
        );

        return data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return {
            transactions: [],
            totalTransactions: 0,
            nextPage: null,
        };
    }
};

export const findTransactionById = async (uuid: string) => {
    const { data } = await api.get<Transaction>(
        `/payments/transactions/${uuid}`,
    );
    return data;
};
