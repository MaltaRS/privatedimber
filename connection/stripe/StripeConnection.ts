import { User } from "@/Context/AuthProvider";
import api from "@/utils/api";

type CreatePaymentIntentResponse = {
    clientSecret: string;
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
};

export const createPaymentIntent = async ({
    amount,
    contact,
    items,
    metadata,
    intention,
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
        },
    );

    return data;
};
