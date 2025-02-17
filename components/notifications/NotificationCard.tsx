import { HStack, VStack, Box, Text } from "@/gluestackComponents";

import Answer from "@/assets/icons/appIcons/answer.svg";
import Config from "@/assets/icons/appIcons/config.svg";
import Refund from "@/assets/icons/appIcons/refund.svg";
import Schedule from "@/assets/icons/appIcons/schedule.svg";
import User from "@/assets/icons/appIcons/userAdd.svg";
import NewFeat from "@/assets/icons/appIcons/newFeat.svg";
import MessagePositive from "@/assets/icons/appIcons/messagePositive.svg";
import MessageNegative from "@/assets/icons/appIcons/messageNegative.svg";

import { Hand } from "lucide-react-native";

type NotificationCardProps = {
    title: string;
    description: string;
    type: string;
    read: boolean;
};

export const NotificationCard = ({
    title,
    description,
    type,
    read,
}: NotificationCardProps) => {
    const typeIcons = {
        ANSWER: <Answer />,
        CONFIG: <Config />,
        REFUND: <Refund />,
        MESSAGE_EXPIRED: <Schedule />,
        CONTACT: <User />,
        MESSAGE_POSITIVE: <MessagePositive />,
        MESSAGE_NEGATIVE: <MessageNegative />,
        PAYMENT_SUCCEEDED: <MessagePositive />,
        PAYMENT_FAILED: <MessageNegative />,
        FEATURE: <NewFeat />,
        WELCOME: <Hand color="black" />,
    };

    return (
        <HStack
            gap="$8"
            alignItems="center"
            py="$4"
            px="$3"
            borderBottomColor="$gray300"
            borderBottomWidth="$1"
        >
            <Box position="relative">
                <Box ml="-$2">{typeIcons[type as keyof typeof typeIcons]}</Box>
                {!read && (
                    <Box
                        position="absolute"
                        top={-8}
                        right={-8}
                        bgColor="$primaryDefault"
                        borderRadius="$full"
                        h={8}
                        w={8}
                        justifyContent="center"
                        alignItems="center"
                    />
                )}
            </Box>
            <VStack flex={1} gap="$1">
                <Text
                    size="xl"
                    fontFamily="$heading"
                    fontWeight="$bold"
                    color="#222"
                >
                    {title}
                </Text>
                <Text fontSize={17} fontFamily="$arialBody" color="$gray600">
                    {description}
                </Text>
            </VStack>
        </HStack>
    );
};
