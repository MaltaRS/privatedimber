import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getNotifications,
    getNotificationCount,
    readNotification,
} from "@/connection/notifications/NotificationConnection";

export const useNotifications = () => {
    const queryClient = useQueryClient();

    const { data: paginatedNotifications, isLoading: isLoadingNotifications } =
        useQuery({
            queryKey: ["notifications"],
            queryFn: getNotifications,
        });

    const { data: notificationsCount, isLoading: isLoadingCount } = useQuery({
        queryKey: ["notificationsCount"],
        queryFn: getNotificationCount,
    });

    const { mutate: markAsRead, isPending: isMarkingAsRead } = useMutation({
        mutationFn: readNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["notificationsCount"] });
        },
    });

    return {
        paginatedNotifications,
        notificationsCount,
        isLoadingNotifications,
        isLoadingCount,
        isMarkingAsRead,
        markAsRead,
    };
};
