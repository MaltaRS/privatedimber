import { User } from "@/Context/AuthProvider";
import api from "@/utils/api";

type PaymentMethods = {
    balance: boolean;
    useCard: boolean;
    cardId: number | null;
    pix: boolean;
};

type CreatePaymentIntentResponse = {
    clientSecret: string;
    transactionId: string;
    status: "requires_payment_method" | "requires_confirmation" | "succeeded";
};

type CreatePaymentIntentParams = {
    amount: number;
    intention: "CHAT_APRESENTATION";
    contact: User;
    items: {
        name: string;
        description?: string;
        amount: number;
        quantity: number;
    }[];
    metadata?: Record<string, unknown>;
    paymentMethods: PaymentMethods;
    installments?: number;
};

export const findTransactionById = async (transactionId: string) => {
    try {
        const { data } = await api.get(
            `/payments/transactions/${transactionId}`,
        );

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createPaymentIntent = async ({
    amount,
    contact,
    items,
    metadata,
    intention,
    paymentMethods,
    installments,
}: CreatePaymentIntentParams): Promise<CreatePaymentIntentResponse> => {
    const { data } = await api.post<CreatePaymentIntentResponse>(
        "/payments/create-payment-intent",
        {
            amount,
            intention,
            description: "Envio de mensagem",
            destinationId: contact.id,
            destinationName: contact.name,
            providerName: "stripe",
            items,
            metadata,
            paymentMethods,
            installments,
        },
    );

    return data;
};
