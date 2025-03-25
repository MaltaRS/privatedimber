import api from "@/utils/api";

interface WithdrawData {
    amount: string;
    bankData: {
        bankName: string;
        agency: string;
        accountNumber: string;
    };
}

export async function createWithdraw(data: WithdrawData) {
    const response = await api.post("/payments/withdraw", {
        amount: Number(data.amount) * 100, // Convert to cents
        bankData: data.bankData,
    });

    console.log(response.request.response);

    return response.data;
}
