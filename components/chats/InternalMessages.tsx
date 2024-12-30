import { Message } from "@/connection/conversations/ConversationConnection";
import {
    Button,
    ButtonText,
    HStack,
    Text,
    VStack,
} from "@/gluestackComponents";
import { useEffect, useState } from "react";

type InternalMessagesProps = {
    needReplyMessage: boolean;
    contactAnswersCount: number;
    asnwersCount: number;
    messages: Message[];
    gaveRightAnswer: () => void;
    finishChat: () => void;
    isCreator: boolean;
    isFinished: boolean;
    contactName: string | undefined;
};

type InternalMessage = {
    text: {
        content: string;
        color: any;
        fontSize: number;
    };
    buttons: {
        type: "positive" | "negative";
        text: string;
        action: () => void;
    }[];
    active: boolean;
};

export const InternalMessages = ({
    needReplyMessage,
    asnwersCount,
    messages,
    contactAnswersCount,
    gaveRightAnswer,
    finishChat,
    isCreator,
    isFinished,
    contactName,
}: InternalMessagesProps) => {
    const [internalMessage, setInternalMessage] = useState<InternalMessage>({
        text: {
            content: "",
            color: "$",
            fontSize: 17,
        },
        buttons: [],
        active: false,
    });

    useEffect(() => {
        if (isFinished) {
            setInternalMessage({
                text: {
                    content: "Conversa finalizada",
                    color: "$negative",
                    fontSize: 17,
                },
                buttons: [],
                active: true,
            });
            return;
        } else if (needReplyMessage && isCreator) {
            setInternalMessage({
                text: {
                    content: "Aguardando resposta",
                    color: "$primaryDefault",
                    fontSize: 17,
                },
                buttons: [],
                active: true,
            });
            return;
        } else if (needReplyMessage && !isCreator) {
            setInternalMessage({
                text: {
                    content: "Mensagem com resposta obrigatória",
                    color: "$primaryDefault",
                    fontSize: 17,
                },
                buttons: [],
                active: true,
            });
            return;
        } else if (asnwersCount <= 0 && isCreator) {
            setInternalMessage({
                text: {
                    content: "Aguardando resposta",
                    color: "$primaryDefault",
                    fontSize: 17,
                },
                buttons: [],
                active: true,
            });
            return;
        } else if (contactAnswersCount === 0 && !isCreator) {
            setInternalMessage({
                text: {
                    content: `${contactName?.split(" ")[0]} pode te responder até 3 vezes. Deseja conceder 1 direito de resposta, ou encerrar a conversa?`,
                    color: "$gray900",
                    fontSize: 17,
                },
                buttons: [
                    {
                        type: "positive",
                        text: "Sim conceder",
                        action: gaveRightAnswer,
                    },
                    {
                        type: "negative",
                        text: "Encerrar e arquivar",
                        action: finishChat,
                    },
                ],
                active: true,
            });
            return;
        }
    }, [
        needReplyMessage,
        asnwersCount,
        messages,
        isCreator,
        isFinished,
        contactName,
        contactAnswersCount,
        gaveRightAnswer,
        finishChat,
    ]);

    return (
        internalMessage.active && (
            <HStack
                w="$full"
                py="$6"
                justifyContent="center"
                alignContent="center"
            >
                <VStack
                    maxWidth="82%"
                    bgColor="$white"
                    rounded="$xl"
                    p={internalMessage.buttons.length > 0 ? "$2" : "$3"}
                >
                    <Text
                        textAlign="center"
                        fontFamily="$arialHeading"
                        fontWeight="$bold"
                        fontSize={internalMessage.text.fontSize}
                        color={internalMessage.text.color}
                        mb={internalMessage.buttons.length > 0 ? "$4" : "$0"}
                    >
                        {internalMessage.text.content}
                    </Text>
                    <VStack gap="$2">
                        {internalMessage.buttons.map((button, index) => (
                            <Button
                                key={index}
                                w={"$full"}
                                bgColor="$gray100"
                                rounded="$lg"
                                height={36}
                                onPress={button.action}
                            >
                                <ButtonText
                                    size="md"
                                    textAlign="center"
                                    color={
                                        button.type === "positive"
                                            ? "$primaryDefault"
                                            : "$negative"
                                    }
                                    fontWeight="$bold"
                                >
                                    {button.text}
                                </ButtonText>
                            </Button>
                        ))}
                    </VStack>
                </VStack>
            </HStack>
        )
    );
};
