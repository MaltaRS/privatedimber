import api from "@/utils/api";

export type Balance = {
    balance: number;
};

export const getBalance = async (): Promise<Balance> => {
    const response = await api.get("/payments/balance");
    return response.data;
};

export const createWithdrawal = async (amount: number): Promise<void> => {
    await api.post("/payments/withdraw", { amount });
};
