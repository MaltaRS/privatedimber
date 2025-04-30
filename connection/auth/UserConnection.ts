import { User } from "@/Context/AuthProvider";

import api, { setAuthorizationHeader } from "@/utils/api";

type FetchUserByIdResponse = {
    user: User;
    isBlocked: boolean;
    isFavorited: boolean;
};

type UpdateProfileData = {
    name?: string;
    username?: string;
    bio?: string;
    about?: string;
    icon?: string;
    tags?: string[];
    interests?: string[];
    links?: {
        name: string;
        url: string;
    }[];
};

export const fetchUser = async (): Promise<User | null> => {
    try {
        await setAuthorizationHeader();
        const response = await api.get<User>("/user");
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        return null;
    }
};

export const GetUserProfile = async (
    userId: string,
): Promise<FetchUserByIdResponse | null> => {
    try {
        await setAuthorizationHeader();
        const response = await api.get<FetchUserByIdResponse>(
            `/user/details/${userId}`,
        );
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        return null;
    }
};

export const isUserBlocked = async (blockedId: string): Promise<boolean> => {
    const { data } = await api.get(`/user/blocked/${blockedId}`);
    return data.isBlocked;
};

export const blockUser = async (blockedId: string) => {
    await api.post(`/user/block/${blockedId}`);
};

export const unblockUser = async (blockedId: string) => {
    await api.delete(`/user/unblock/${blockedId}`);
};

export const updateProfileImage = async (icon: string): Promise<any> => {
    await setAuthorizationHeader();
    const response = await api.put("/user", { icon });
    return response.data;
};

export const updateProfile = async (data: UpdateProfileData): Promise<any> => {
    await setAuthorizationHeader();
    const response = await api.put("/user", data);
    return response.data;
};

export const updateUserAccountType = async (
    type: "REGULAR" | "PROFESSIONAL",
): Promise<any> => {
    await setAuthorizationHeader();
    const response = await api.put("/user/account-type", { type });
    return response.data;
};

export const getBlockedUsers = async (): Promise<User[]> => {
    const response = await api.get("/user/blocked");

    return response.data;
};
