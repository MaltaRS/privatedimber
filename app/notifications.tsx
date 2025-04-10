import { useEffect } from "react";

import { VStack, Box, ScrollView, Spinner } from "@/gluestackComponents";

import HeaderContainer from "../components/HeaderContainer";
import { useNotifications } from "@/hooks/NotificationHook";

import { NotificationCard } from "@/components/notifications/NotificationCard";
import { BaseContainer } from "@/components/BaseContainer";

const ChatsScreen = () => {
    const { paginatedNotifications, isLoadingNotifications, markAsRead } =
        useNotifications();

    useEffect(() => {
        if (
            paginatedNotifications &&
            paginatedNotifications.notifications.length > 0
        ) {
            setTimeout(() => {
                markAsRead();
            }, 2000);
        }
    }, [paginatedNotifications, markAsRead]);

    return (
        <BaseContainer>
            <VStack gap="$4">
                <HeaderContainer title="Notificações" />
            </VStack>
            <Box pt="$6">
                {isLoadingNotifications ? (
                    <VStack
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Spinner size="large" />
                    </VStack>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <VStack mb="$6">
                            {paginatedNotifications?.notifications.map(
                                (notification, index) => (
                                    <NotificationCard
                                        key={index}
                                        description={notification.description}
                                        title={notification.title}
                                        read={!!notification.readAt}
                                        type={notification.type}
                                    />
                                ),
                            )}
                        </VStack>
                    </ScrollView>
                )}
            </Box>
        </BaseContainer>
    );
};

export default ChatsScreen;
