export const formatMoney = (amount: number | string) => {
    return amount.toLocaleString("pt-Br", {
        style: "currency",
        currency: "BRL",
    });
};
