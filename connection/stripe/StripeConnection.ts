import api from "@/utils/api";

type CreatePaymentIntentResponse = {
    clientSecret: string;
};

export const createPaymentIntent = async (
    amount: number,
): Promise<CreatePaymentIntentResponse> => {
    const { data } = await api.post<CreatePaymentIntentResponse>(
        "/payments/create-payment-intent",
        {
            amount,
        },
    );

    return data;
};
