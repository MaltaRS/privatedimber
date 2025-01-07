import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import api from "./api";

import { SecureStoreEncrypted } from "./SecureStorage";

import { useOnlineUsersStore } from "@/stores/onlineUsersStore";

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

const createSocket = async (): Promise<
    Socket<DefaultEventsMap, DefaultEventsMap>
> => {
    const accessToken = SecureStoreEncrypted.getItem("accessToken");

    console.log("Criando socket com token:", accessToken);

    socket = io(process.env.EXPO_PUBLIC_BACKEND_URL as string, {
        auth: {
            token: `Bearer ${accessToken}`,
        },
        transports: ["websocket"],
    });

    socket.on("connect", () => {
        console.log("Conectado ao servidor de socket");
    });

    socket.on("connect_error", async (error: any) => {
        console.log("Erro ao conectar ao servidor de socket:", error.message);

        if (!socket) {
            return;
        }

        if (error && error.message.indexOf("Invalid access token") !== -1) {
            try {
                console.log("Tentando renovar o token...");
                const refreshToken =
                    SecureStoreEncrypted.getItem("refreshToken");

                if (refreshToken) {
                    const response = await api.post("/auth/refresh-token", {
                        refreshToken: refreshToken,
                    });

                    const newAccessToken = response.data.access_token;
                    SecureStoreEncrypted.saveItem(
                        "accessToken",
                        newAccessToken,
                    );

                    (socket.auth as { token: string }).token =
                        `Bearer ${newAccessToken}`;
                    socket.connect();
                }
            } catch (refreshError) {
                console.error("Erro ao tentar renovar o token:", refreshError);
                socket.disconnect();
            }
        }
    });

    socket.on("initialOnlineUsers", (data: { userIds: number[] }) => {
        const { onlineUsers, addOnlineUser } = useOnlineUsersStore.getState();

        data.userIds.forEach((userId) => {
            addOnlineUser(userId);
        });
    });

    socket.on("userOnline", (data: { userId: number }) => {
        useOnlineUsersStore.getState().addOnlineUser(data.userId);
        console.log("userOnline:", data.userId);
    });

    socket.on("userOffline", (data: { userId: number }) => {
        useOnlineUsersStore.getState().removeOnlineUser(data.userId);
        console.log("userOffline:", data.userId);
    });

    return socket;
};

export const getSocket = async (): Promise<
    Socket<DefaultEventsMap, DefaultEventsMap>
> => {
    if (!socket || !socket.active) {
        socket = await createSocket();
    }
    return socket;
};
