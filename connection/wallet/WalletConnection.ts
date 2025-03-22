import api from "@/utils/api";

export type Balance = {
    balance: number;
};

export type PaymentMethod = {
    id: number;
    userId: number;
    providerMethodId: string;
    last4: string;
    cardBrand: string;
    type: "CREDIT_CARD" | "DEBIT_CARD";
    name: string;
    document: string;
    documentType: string;
    nickname: string;
    description: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
};

export type PaymentMethodsResponse = {
    paymentMethods: PaymentMethod[];
    defaultPaymentMethodId: number | null;
};

export type SavePaymentMethodRequest = {
    token: string;
    document: string;
    name: string;
    nickname: string;
};

export const getBalance = async (): Promise<Balance> => {
    const response = await api.get("/payments/balance");
    return response.data;
};

export const getPaymentMethods = async (): Promise<PaymentMethodsResponse> => {
    const response = await api.get("/payment-methods");
    return response.data;
};

export const createWithdrawal = async (amount: number): Promise<void> => {
    await api.post("/payments/withdraw", { amount });
};

export const savePaymentMethod = async (
    data: SavePaymentMethodRequest,
): Promise<PaymentMethod> => {
    const response = await api.post(
        "/payment-methods/save-payment-method",
        data,
    );
    return response.data;
};

export const removePaymentMethod = async ({
    paymentMethodId,
}: {
    paymentMethodId: number;
}) => {
    const response = await api.post("/payment-methods/remove-payment-method", {
        paymentMethodId,
    });

    return response.data;
};
