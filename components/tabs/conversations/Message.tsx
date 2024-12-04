import { useAuth, User } from "@/Context/AuthProvider";
import {
    HStack,
    Avatar,
    Box,
    VStack,
    Button,
    ButtonText,
} from "@/gluestackComponents";

import DimberAvatar from "../../../assets/icons/dimberLogoWhite.svg";
import { MessageText } from "@/components/chats/MessageText";

type MessageProps = {
    content: string;
    isFirst: boolean;
    senderId: string;
    contact: User;
    dimberMessage?: {
        buttons: {
            width: any;
            text: string;
            action: () => void;
        }[];
    } | null;
};

export const Message = ({
    content,
    isFirst,
    senderId,
    contact,
    dimberMessage = null,
}: MessageProps) => {
    const { user } = useAuth();

    const isLoggedUser = senderId === user?.id;

    const isDimberMessage = !!dimberMessage;

    return (
        <VStack mb="$3" mt={isFirst ? "$2" : "$0"}>
            <HStack justifyContent={isLoggedUser ? "flex-end" : "flex-start"}>
                {!isLoggedUser && !isDimberMessage && (
                    <Avatar width={36} height={36} rounded="$full" mr="$2">
                        {contact.icon ? (
                            <Avatar.Image
                                source={{ uri: contact.icon }}
                                alt="Avatar"
                            />
                        ) : (
                            <Avatar.FallbackText>
                                {contact.name}
                            </Avatar.FallbackText>
                        )}
                    </Avatar>
                )}
                {isDimberMessage && (
                    <Avatar
                        width={36}
                        height={36}
                        rounded="$full"
                        bgColor="$primaryDefault"
                        mr="$2"
                    >
                        <DimberAvatar width={26} height={26} />
                    </Avatar>
                )}
                <Box
                    bgColor={isLoggedUser ? "$gray100" : "$primaryDefault"}
                    px="$4"
                    py="$2"
                    rounded="$xl"
                    borderTopLeftRadius={isLoggedUser ? "$xl" : "$none"}
                    maxWidth="85%"
                >
                    <MessageText
                        content={content}
                        primaryColor={isLoggedUser}
                    />
                </Box>
            </HStack>
            {isDimberMessage && (
                <HStack ml={42} mt="$3" gap="$2" pr="$4" maxWidth="85%">
                    {dimberMessage?.buttons.map((button, index) => (
                        <Button
                            key={index}
                            w={button.width}
                            borderColor="$primaryDefault"
                            rounded="$full"
                            height={36}
                            variant="outline"
                            onPress={button.action}
                        >
                            <ButtonText
                                size="md"
                                textAlign="center"
                                color="$primaryDefault"
                                fontWeight="$bold"
                            >
                                {button.text}
                            </ButtonText>
                        </Button>
                    ))}
                </HStack>
            )}
        </VStack>
    );
};
