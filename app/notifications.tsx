import { useEffect } from "react";

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

import { MoveLeft } from "lucide-react-native";

import { useNotifications } from "@/hooks/NotificationHook";

import { NotificationCard } from "@/components/notifications/NotificationCard";
import { BaseContainer } from "@/components/BaseContainer";

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
            <HStack
                gap="$6"
                pt="$1"
                justifyContent="center"
                alignItems="center"
                position="relative"
            >
                <Pressable
                    onPress={() => router.back()}
                    position="absolute"
                    left="$0"
                    rounded="$full"
                    bgColor="$gray200"
                    p="$2"
                >
                    <MoveLeft size={24} color="#555" />
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
