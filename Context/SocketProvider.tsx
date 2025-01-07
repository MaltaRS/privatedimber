import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { getSocket } from "@/utils/socket";

interface SocketContextProps {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
    recreate: () => Promise<void>;
    disconnect: () => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [socket, setSocket] = useState<Socket<
        DefaultEventsMap,
        DefaultEventsMap
    > | null>(null);

    const recreate = async () => {
        if (socket) {
            socket.disconnect();
        }
        const socketInstance = await getSocket();
        setSocket(socketInstance);
    };

    const disconnect = () => {
        if (socket) {
            socket.disconnect();
            setSocket(null);
        }
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
            disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, recreate, disconnect }}>
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
