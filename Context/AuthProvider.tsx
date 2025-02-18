import { createContext, useContext, useState } from "react";

import { useRouter } from "expo-router";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { SecureStoreEncrypted } from "@/utils/SecureStorage";
import { removeAuthorizationHeader, setAuthorizationHeader } from "@/utils/api";

import { useSocket } from "./SocketProvider";

import { fetchUser } from "@/connection/auth/UserConnection";

export type User = {
    id: string;
    uuid: string;
    username: string;
    email: string;
    name: string;
    bio: string;
    icon: string;
    type: "REGULAR" | "PROFESSIONAL";
    createdAt: string;
    verifiedAt?: string;
};

type AuthContextData = {
    user: User | null | undefined;
    isAuthenticated: boolean;
    isSigningOut: boolean;
    loading: boolean;
    signIn: (accessToken: string, refreshToken: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const router = useRouter();

    const [isSigningOut, setIsSigningOut] = useState(false);

    const queryClient = useQueryClient();

    const { recreate, disconnect } = useSocket();

    const { data: user, isLoading } = useQuery<User | null>({
        queryKey: ["authenticatedUser"],
        queryFn: fetchUser,
        retry: false,
    });

    const signInMutation = useMutation({
        mutationFn: async ({
            accessToken,
            refreshToken,
        }: {
            accessToken: string;
            refreshToken: string;
        }) => {
            SecureStoreEncrypted.saveItem("accessToken", accessToken);
            SecureStoreEncrypted.saveItem("refreshToken", refreshToken);

            await setAuthorizationHeader();
            const user = await fetchUser();
            if (!user) {
                throw new Error("Failed to fetch user");
            }
            await recreate();
            return user;
        },
        onSuccess: async (user: User) => {
            queryClient.setQueryData(["authenticatedUser"], user);
        },
    });

    const signIn = async (accessToken: string, refreshToken: string) => {
        await signInMutation.mutateAsync({ accessToken, refreshToken });
    };

    const signOut = async () => {
        disconnect();

        SecureStoreEncrypted.deleteItem("accessToken");
        SecureStoreEncrypted.deleteItem("refreshToken");

        queryClient.clear();

        setIsSigningOut(true);

        removeAuthorizationHeader();

        // @ts-ignore
        router.replace("(auth)/");
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isSigningOut,
                loading: isLoading,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
