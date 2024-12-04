import api from "@/utils/api";

export type Notification = {
    id: string;
    title: string;
    description: string;
    type: string;
    readAt: boolean;
    createdAt: string;
};

export type NotificationData = {
    notifications: Notification[];
    total: number;
};

export const getNotificationCount = async () => {
    const responseNotificationTotal = await api.get("/notification/total");

    return responseNotificationTotal.data.total;
};

export const getNotifications = async () => {
    const responseNotifications =
        await api.get<NotificationData>("/notification");

    return responseNotifications.data;
};

export const readNotification = async () => {
    await api.post("/notification/read");
};
