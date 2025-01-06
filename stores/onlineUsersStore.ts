import { create } from "zustand";

type OnlineUsersState = {
    onlineUsers: number[];
    addOnlineUser: (userId: number) => void;
    removeOnlineUser: (userId: number) => void;
};

export const useOnlineUsersStore = create<OnlineUsersState>((set) => ({
    onlineUsers: [],
    addOnlineUser: (userId) =>
        set((state) => {
            if (!state.onlineUsers.includes(userId)) {
                return { onlineUsers: [...state.onlineUsers, userId] };
            }
            return state;
        }),
    removeOnlineUser: (userId) =>
        set((state) => {
            return {
                onlineUsers: state.onlineUsers.filter((id) => id !== userId),
            };
        }),
}));
