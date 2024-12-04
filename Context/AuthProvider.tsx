import React, { createContext, useContext } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { SecureStoreEncrypted } from "@/utils/SecureStorage";
import api, { setAuthorizationHeader } from "@/utils/api";

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
    createdAt: string;
    verifiedAt?: string;
};

type AuthContextData = {
    user: User | null | undefined;
    isAuthenticated: boolean;
    loading: boolean;
    signIn: (accessToken: string, refreshToken: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const queryClient = useQueryClient();

    const { recreateSocket } = useSocket();

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery<User | null>({
        queryKey: ["authenticatedUser"],
        queryFn: fetchUser,
        retry: false,
        staleTime: Infinity,
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
            await recreateSocket();
            return user;
        },
        onSuccess: (user: User) => {
            queryClient.setQueryData(["authenticatedUser"], user);
        },
    });

    const signOutMutation = useMutation({
        mutationFn: async () => {
            await api.post("/auth/logout");
        },
        onSuccess: () => {
            SecureStoreEncrypted.deleteItem("accessToken");
            SecureStoreEncrypted.deleteItem("refreshToken");
            queryClient.setQueryData(["authenticatedUser"], null);
        },
    });

    const signIn = async (accessToken: string, refreshToken: string) => {
        await signInMutation.mutateAsync({ accessToken, refreshToken });
    };

    const signOut = async () => {
        await signOutMutation.mutateAsync();
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
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
