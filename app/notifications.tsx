import { useRouter } from "expo-router";
import {
    Text,
    HStack,
    Pressable,
    VStack,
    Box,
    ScrollView,
    Spinner,
} from "@/gluestackComponents";

import { NotificationCard } from "@/components/notifications/NotificationCard";
import { BaseContainer } from "@/components/BaseContainer";

import { CaretLeft } from "phosphor-react-native";
import { useNotifications } from "@/hooks/NotificationHook";
import { useEffect } from "react";

const ChatsScreen = () => {
    const router = useRouter();
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
            <HStack gap="$6" justifyContent="center" position="relative">
                <Pressable
                    onPress={() => router.back()}
                    position="absolute"
                    left="$0"
                >
                    <CaretLeft size={24} />
                </Pressable>
                <Text fontFamily="$arialHeading" size="lg" color="#000">
                    Notificações
                </Text>
            </HStack>
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
