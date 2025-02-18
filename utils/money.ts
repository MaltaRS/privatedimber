export const formatMoney = (amount: number | string) => {
    return amount.toLocaleString("pt-Br", {
        style: "currency",
        currency: "BRL",
    });
};

export const formatCentsToMoney = (amount: number | string) => {
    return formatMoney(Number(amount) / 100);
};
