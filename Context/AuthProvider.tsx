import { createContext, useContext, useState } from "react";

import { useRouter } from "expo-router";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { SecureStoreEncrypted } from "@/utils/SecureStorage";
import { removeAuthorizationHeader, setAuthorizationHeader } from "@/utils/api";

import { useSocket } from "./SocketProvider";

import { fetchUser } from "@/connection/auth/UserConnection";

export type User = {
    id: number;
    uuid: string;
    name: string;
    username: string;
    email: string;
    icon: string | null;
    type: string;
    bio: string | null;
    about: string | null;
    links: {
        name: string;
        icon: string;
        color: string;
        url: string;
    }[];
    tags: string[];
    interests: string[];
    verifiedAt: string | null;
    createdAt: string;
    lastAccessAt: string;
    price: number | null;
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
    const queryClient = useQueryClient();
    const { socket, recreate } = useSocket();

    const [isSigningOut, setIsSigningOut] = useState(false);

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
            queryClient.invalidateQueries({
                queryKey: ["balance"],
                exact: true,
            });
        },
    });

    const signIn = async (accessToken: string, refreshToken: string) => {
        await signInMutation.mutateAsync({ accessToken, refreshToken });
    };

    const signOut = async () => {
        setIsSigningOut(true);

        try {
            if (socket) {
                socket.io.opts.reconnection = false;

                await new Promise<void>((resolve, reject) => {
                    socket.on("disconnect", () => {
                        console.log(
                            "Socket desconectado com sucesso no cliente",
                        );
                        resolve();
                    });
                    socket.on("connect_error", (err) => {
                        console.error("Erro na desconexão:", err);
                        reject(err);
                    });
                    socket.disconnect();
                });
            }

            SecureStoreEncrypted.deleteItem("accessToken");
            SecureStoreEncrypted.deleteItem("refreshToken");
            queryClient.removeQueries({
                queryKey: ["balance"],
                exact: true,
            });
            queryClient.clear();
            removeAuthorizationHeader();

            // @ts-expect-error
            router.replace("(auth)/");
        } catch (error) {
            console.error("Erro durante o signOut:", error);
        } finally {
            setIsSigningOut(false);
        }
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
