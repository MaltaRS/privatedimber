import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { getSocket } from "@/utils/socket";

interface SocketContextProps {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
    recreateSocket: () => Promise<void>;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [socket, setSocket] = useState<Socket<
        DefaultEventsMap,
        DefaultEventsMap
    > | null>(null);

    const recreateSocket = async () => {
        if (socket) {
            socket.disconnect();
        }
        console.log("Recreating socket");

        const socketInstance = await getSocket();
        setSocket(socketInstance);
    };

    useEffect(() => {
        const setupSocket = async () => {
            if (!socket) {
                const socketInstance = await getSocket();
                setSocket(socketInstance);
            }
        };

        setupSocket();

        return () => {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, recreateSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (context === undefined) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return context;
};
