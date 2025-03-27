import { createContext, useContext, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "@/connection/wallet/WalletConnection";

interface BalanceContextType {
    balance: number | null;
    isLoading: boolean;
    isBalanceHidden: boolean;
    toggleBalanceVisibility: () => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: ReactNode }) {
    const [isBalanceHidden, setIsBalanceHidden] = useState(false);

    const { data: balanceData, isLoading } = useQuery({
        queryKey: ["balance"],
        queryFn: getBalance,
    });

    console.log("balanceData", balanceData);

    const toggleBalanceVisibility = () => {
        setIsBalanceHidden(!isBalanceHidden);
    };

    return (
        <BalanceContext.Provider
            value={{
                balance: balanceData?.balance ?? null,
                isLoading,
                isBalanceHidden,
                toggleBalanceVisibility,
            }}
        >
            {children}
        </BalanceContext.Provider>
    );
}

export function useBalance() {
    const context = useContext(BalanceContext);
    if (context === undefined) {
        throw new Error("useBalance must be used within a BalanceProvider");
    }
    return context;
}
