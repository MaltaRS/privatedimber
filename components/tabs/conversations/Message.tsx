import { User } from "@/Context/AuthProvider";
import {
    HStack,
    Box,
    VStack,
    Text,
    Image,
    Pressable,
} from "@/gluestackComponents";

import { formatTime } from "@/utils/dateFormat";

import Read from "@/assets/icons/appIcons/read.svg";

import { Colors } from "@/constants/Colors";

import { Message as ConnectionMessageProps } from "@/connection/conversations/ConversationConnection";

import { MessageText } from "@/components/chats/MessageText";

import { Check, FileText } from "lucide-react-native";

import { ResizeMode, Video } from "expo-av";

import * as Linking from "expo-linking";

type MessageProps = {
    message: ConnectionMessageProps;
    isFirst: boolean;
    contact: User;
    user: User | null | undefined;
};

export const Message = ({ isFirst, message, user, contact }: MessageProps) => {
    const {
        senderId,
        content,
        createdAt,
        image,
        readAt,
        video,
        document,
        deliveredAt,
    } = message;

    const isLoggedUser = senderId === user?.id;

    const read = !!readAt;

    const openDocument = async (uri: string) => {
        try {
            const supported = await Linking.canOpenURL(uri);
            if (supported) {
                await Linking.openURL(uri);
            } else {
                const openSettings = confirm(
                    "Não foi possível abrir o documento. Você deseja abrir as configurações do dispositivo para verificar permissões ou instalar um aplicativo compatível?",
                );

                if (openSettings) {
                    await Linking.openSettings();
                }
            }
        } catch (error) {
            console.error("Erro ao tentar abrir o documento:", error);
            alert("Ocorreu um erro ao tentar abrir o documento.");
        }
    };

    const widthOfTimeContainer =
        isLoggedUser && (read || !!deliveredAt) ? 56 : 36;

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
                    position="relative"
                    flexDirection="row"
                >
                    <Box>
                        {image && (
                            <Image
                                source={{ uri: image }}
                                width={150}
                                height={150}
                                alt="image"
                            />
                        )}
                        {video && (
                            <Video
                                source={{ uri: video }}
                                style={{ width: 150, height: 150 }}
                                useNativeControls
                                resizeMode={ResizeMode.CONTAIN}
                                isLooping
                            />
                        )}
                        {document && (
                            <Pressable onPress={() => openDocument(document)}>
                                <HStack alignItems="center" gap="$2">
                                    <FileText
                                        size={20}
                                        color={Colors.gray600}
                                    />
                                    <Text
                                        color="$primaryDefault"
                                        fontFamily="$heading"
                                        fontWeight="$bold"
                                        size="md"
                                    >
                                        {document.split("/").pop()}
                                    </Text>
                                </HStack>
                            </Pressable>
                        )}
                        <HStack maxWidth="$full">
                            <MessageText
                                content={content}
                                rightSpace={widthOfTimeContainer}
                            />
                        </HStack>
                    </Box>
                    <Box position="absolute" right="$4" bottom="$2">
                        <HStack gap="$1" flexShrink={0}>
                            <Text
                                fontSize={11.5}
                                color="$gray600"
                                letterSpacing="$sm"
                            >
                                {formatTime(createdAt)}
                            </Text>
                            {isLoggedUser &&
                                (read || !!deliveredAt ? (
                                    <Read
                                        width={15}
                                        height={15}
                                        stroke={
                                            read
                                                ? Colors.primaryDefault
                                                : Colors.gray600
                                        }
                                        style={{ marginTop: 2 }}
                                    />
                                ) : (
                                    <Check
                                        size={15}
                                        color={Colors.gray600}
                                        style={{ marginTop: 2 }}
                                    />
                                ))}
                        </HStack>
                    </Box>
                </Box>
            </HStack>
        </VStack>
    );
};
