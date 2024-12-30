import { User } from "@/Context/AuthProvider";
import { HStack, Box, VStack, Text, Image } from "@/gluestackComponents";

import { MessageText } from "@/components/chats/MessageText";
import { formatTime } from "@/utils/dateFormat";

import Read from "@/assets/icons/appIcons/read.svg";

import { Check } from "phosphor-react-native";
import { Colors } from "@/constants/Colors";

type MessageProps = {
    content: string;
    isFirst: boolean;
    senderId: string;
    timestamp: string;
    read?: boolean;
    contact: User;
    image: string | undefined;
    audio: string | undefined;
    user: User | null | undefined;
};

export const Message = ({
    content,
    isFirst,
    senderId,
    timestamp,
    read,
    user,
    image,
    audio,
}: MessageProps) => {
    const isLoggedUser = senderId === user?.id;

    return (
        <VStack mb="$3" mt={isFirst ? "$2" : "$0"}>
            <HStack justifyContent={isLoggedUser ? "flex-end" : "flex-start"}>
                <Box
                    bgColor={isLoggedUser ? "$gray200" : "#DDF4FE"}
                    px="$4"
                    py="$2"
                    rounded="$xl"
                    maxWidth="85%"
                    borderBottomRightRadius={isLoggedUser ? 0 : "$xl"}
                    borderBottomLeftRadius={isLoggedUser ? "$xl" : 0}
                >
                    <HStack gap="$2" alignItems="flex-end">
                        <Box flexShrink={1} flexGrow={1}>
                            {image && (
                                <Image
                                    source={{ uri: image }}
                                    width={150}
                                    height={150}
                                    alt="image"
                                />
                            )}
                            <MessageText content={content} />
                        </Box>
                        <HStack gap="$1" flexShrink={0}>
                            <Text
                                fontSize={11.5}
                                color="$gray600"
                                letterSpacing="$sm"
                            >
                                {formatTime(timestamp)}
                            </Text>
                            {isLoggedUser &&
                                (read ? (
                                    <Read
                                        width={15}
                                        height={15}
                                        stroke={Colors.primaryDefault}
                                        style={{ marginTop: 2 }}
                                    />
                                ) : (
                                    <Check size={15} style={{ marginTop: 2 }} />
                                ))}
                        </HStack>
                    </HStack>
                </Box>
            </HStack>
        </VStack>
    );
};
