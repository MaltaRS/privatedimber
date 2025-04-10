import api from "@/utils/api";

export type UserSettings = {
    id: number;
    userId: number;
    language: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    priceSettings?: Record<string, any>;
    chatSettings?: Record<string, any>;
    privacySettings?: Record<string, any>;
    customSettings?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
};

export type UpdateSettingsPayload = {
    language?: string;
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    priceSettings?: Record<string, any>;
    chatSettings?: Record<string, any>;
    privacySettings?: Record<string, any>;
    customSettings?: Record<string, any>;
};

export const getUserSettings = async (): Promise<UserSettings> => {
    const response = await api.get<UserSettings>("/settings");
    return response.data;
};

export const updateUserSettings = async (
    settings: UpdateSettingsPayload,
): Promise<UserSettings> => {
    const response = await api.put<UserSettings>("/settings", settings);
    return response.data;
};

export const deleteUserSettings = async (): Promise<void> => {
    await api.delete("/settings");
};
