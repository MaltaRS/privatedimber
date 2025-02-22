import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";

import { PaymentItems } from "@/app/(conversations)/[conversationId]";
import { MessagesPayload } from "@/connection/conversations/ConversationConnection";

import {
    Actionsheet,
    ActionsheetContent,
    ActionsheetItem,
    ButtonText,
    Divider,
    HStack,
    Text,
    VStack,
} from "@/gluestackComponents";
import { formatMoney } from "@/utils/money";
import { Button } from "../ui/Button";
import { useRouter } from "expo-router";
import { ConversationPriority } from "@/Context/ChatProvider";

type InternalMessagesProps = {
    sendToPayment: boolean;
    contactConversation: MessagesPayload;
    paymentItems: PaymentItems;
    contactName: string | undefined;
    needAnswerOpen?: boolean | undefined;
    changePriority: (priority: ConversationPriority) => void;
    handleSendToPayment: () => void;
    gaveRightAnswer: () => void;
    finishChat: () => void;
    likeToAnswer: (need: boolean) => void;
    setNeedAnswerOpen: Dispatch<SetStateAction<boolean | undefined>>;
};

type InternalMessage = {
    text: {
        title?: string;
        content?: string;
        color: any;
        fontSize: number;
    };
    items?: {
        name: string;
        value: string;
    }[];
    buttons: {
        type: "positive" | "negative";
        textColor?: string;
        text: string;
        action: () => void;
    }[];
    type: "actionSheet" | "floating";
    active: boolean;
};

export const InternalMessages = ({
    sendToPayment,
    contactName,
    paymentItems,
    needAnswerOpen,
    contactConversation,
    changePriority,
    finishChat,
    likeToAnswer,
    gaveRightAnswer,
    setNeedAnswerOpen,
    handleSendToPayment,
}: InternalMessagesProps) => {
    const router = useRouter();

    const [answerNotNeeded, setAnswerNotNeeded] = useState<boolean | undefined>(
        undefined,
    );

    const {
        isCreator,
        isFinished,
        needReply,
        answersCount,
        messages,
        isPresenting,
        contactAnswersCount,
        contactTotalAnswers,
        priority,
    } = contactConversation;

    const [internalMessage, setInternalMessage] = useState<InternalMessage>({
        text: {
            content: "",
            color: "$",
            fontSize: 17,
        },
        buttons: [],
        type: "floating",
        active: false,
    });

    useEffect(() => {
        const hasToPay =
            messages.every((message) => message.deliveredAt == null) &&
            isCreator;
        const askForNeedAnswer = !!!paymentItems.find(
            (items) => items.name === "Resposta",
        );

        if (needReply && !isCreator && needAnswerOpen === undefined) {
            setNeedAnswerOpen(true);
        } else if (!needReply && !isCreator && needAnswerOpen !== undefined) {
            setNeedAnswerOpen(undefined);
        }

        if (
            answerNotNeeded &&
            isPresenting &&
            !isCreator &&
            messages.length > 0 &&
            answerNotNeeded === undefined
        ) {
            setAnswerNotNeeded(true);
        } else if (
            answerNotNeeded !== undefined &&
            !isCreator &&
            !isPresenting
        ) {
            setAnswerNotNeeded(undefined);
        }

        if (hasToPay) {
            if (askForNeedAnswer) {
                setInternalMessage({
                    text: {
                        title: "Deseja garantir uma resposta?",
                        content: `Ao confirmar, será acrescentado um valor de 10% (R$10,00) e o destinatário será obrigado a responder. Caso não pague a resposta ficará ao critério do destinatário.`,
                        color: "$gray700",
                        fontSize: 16,
                    },
                    buttons: [
                        {
                            type: "positive",
                            text: "Garantir resposta",
                            action: () => likeToAnswer(true),
                        },
                        {
                            type: "negative",
                            textColor: "$gray600",
                            text: "Sem garantia",
                            action: () => likeToAnswer(false),
                        },
                    ],
                    type: "actionSheet",
                    active: true,
                });
                return;
            } else {
                setInternalMessage({
                    text: {
                        content: `Este é o resumo dos valores para o envio da mensagem para ${contactName?.split(" ")[0]}:`,
                        color: "$gray900",
                        fontSize: 17,
                    },
                    items: paymentItems.map((item) => ({
                        name: item.name,
                        value: ((item.amount * item.quantity) / 100)
                            .toFixed(2)
                            .replace(".", ","),
                    })),
                    buttons: [
                        {
                            type: "positive",
                            text: "Realizar pagamento",
                            action: handleSendToPayment,
                        },
                    ],
                    type: "actionSheet",
                    active: true,
                });
                return;
            }
        } else if (isFinished) {
            if (!isCreator) {
                setInternalMessage({
                    text: {
                        content: "Conversa encerrada e arquivada",
                        color: "$primaryDefault",
                        fontSize: 17,
                    },
                    buttons: [],
                    type: "floating",
                    active: true,
                });
                return;
            } else {
                setInternalMessage({
                    text: {
                        content:
                            "Deseja enviar uma mensagem paga para o profissional?",
                        color: "$gray900",
                        fontSize: 17,
                    },
                    buttons: [
                        {
                            type: "positive",
                            text: "Enviar mensagem paga",
                            action: () => {
                                return;
                            },
                        },
                        {
                            type: "negative",
                            text: "Sair",
                            action: () => {
                                router.back();
                            },
                        },
                    ],
                    type: "actionSheet",
                    active: true,
                });
                return;
            }
        } else if (isPresenting && messages.length === 0) {
            setInternalMessage({
                text: {
                    content: "Aguardando apresentação",
                    color: "$primaryDefault",
                    fontSize: 17,
                },
                buttons: [],
                type: "floating",
                active: !isCreator,
            });
            return;
        } else if (needReply) {
            setInternalMessage({
                text: {
                    content: isCreator
                        ? "Aguardando resposta"
                        : "Mensagem com resposta obrigatória",
                    color: isCreator ? "$primaryDefault" : "$gray900",
                    fontSize: 17,
                },
                buttons: isCreator
                    ? []
                    : [
                          {
                              type: "positive",
                              text: "Responder",
                              action: () => {
                                  setNeedAnswerOpen(false);
                              },
                          },
                      ],
                type: isCreator ? "floating" : "actionSheet",
                active: true,
            });
            return;
        } else if (isPresenting && !isCreator && messages.length > 0) {
            setInternalMessage({
                text: {
                    title: "Mensagem sem resposta obrigatória",
                    content:
                        "A resposta é opcional, deseja responder essa mensagem?",
                    color: "$gray900",
                    fontSize: 17,
                },
                buttons: [
                    {
                        type: "positive",
                        text: "Responder",
                        action: () => {
                            setAnswerNotNeeded(false);
                        },
                    },
                    {
                        type: "negative",
                        text: "Encerrar e arquivar",
                        action: finishChat,
                    },
                ],
                type: "actionSheet",
                active: !isCreator,
            });
            return;
        } else if (answersCount <= 0 && isCreator) {
            setInternalMessage({
                text: {
                    content: "Aguardando resposta",
                    color: "$primaryDefault",
                    fontSize: 17,
                },
                buttons: [],
                type: "floating",
                active: true,
            });
            return;
        } else if (
            (answerNotNeeded === undefined || answerNotNeeded === false) &&
            contactAnswersCount === 0 &&
            !isCreator &&
            contactTotalAnswers <= 2
        ) {
            setInternalMessage({
                text: {
                    title: `${contactName?.split(" ")[0]} pode te responder até 3 vezes.`,
                    content:
                        "Deseja conceder 1 direito de resposta, ou encerrar a conversa?",
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
                type: "actionSheet",
                active: true,
            });
            return;
        } else if (!isCreator && contactTotalAnswers > 2) {
            setInternalMessage({
                text: {
                    content: `${contactName?.split(" ")[0]} já teve 3 direitos de resposta. Deseja encerrar a conversa?`,
                    color: "$gray900",
                    fontSize: 17,
                },
                buttons: [
                    {
                        type: "negative",
                        text: "Encerrar e arquivar",
                        action: finishChat,
                    },
                ],
                type: "actionSheet",
                active: true,
            });
            return;
        } else if (!isCreator && priority === "LOW") {
            setInternalMessage({
                text: {
                    title: "Qual a prioridade dessa resposta na sua fila de leitura",
                    color: "$gray900",
                    fontSize: 17,
                },
                buttons: [
                    {
                        type: "positive",
                        text: "Normal",
                        action: () => changePriority("MEDIUM"),
                    },
                    {
                        type: "negative",
                        text: "Prioritário",
                        textColor: "$warning",
                        action: () => changePriority("HIGH"),
                    },
                ],
                type: "actionSheet",
                active: true,
            });
            return;
        } else if (answersCount <= 0 && !isCreator) {
            setInternalMessage({
                text: {
                    content: "Aguardando resposta",
                    color: priority === "HIGH" ? "$warning" : "$primaryDefault",
                    fontSize: 17,
                },
                buttons: [],
                type: "floating",
                active: true,
            });
            return;
        } else {
            setInternalMessage({
                text: {
                    content: "",
                    color: "$",
                    fontSize: 17,
                },
                buttons: [],
                type: "floating",
                active: false,
            });
        }
    }, [
        contactName,
        needAnswerOpen,
        paymentItems,
        answerNotNeeded,
        priority,
        needReply,
        answersCount,
        messages,
        isPresenting,
        isCreator,
        isFinished,
        contactAnswersCount,
        contactTotalAnswers,
        router,
        changePriority,
        gaveRightAnswer,
        finishChat,
        likeToAnswer,
        handleSendToPayment,
        setNeedAnswerOpen,
        setAnswerNotNeeded,
    ]);

    return (
        internalMessage.active &&
        (internalMessage.type === "floating" ? (
            <HStack
                w="$full"
                py="$6"
                justifyContent="center"
                alignContent="center"
            >
                <VStack
                    maxWidth="92%"
                    bgColor="$white"
                    rounded="$xl"
                    py={internalMessage.buttons.length > 0 ? "$2" : "$3"}
                    px="$4"
                >
                    {internalMessage.text.title && (
                        <Text
                            mt="$1"
                            textAlign="center"
                            fontFamily="$arialHeading"
                            fontWeight="$bold"
                            fontSize={17}
                            color="$black"
                            mb="$1"
                        >
                            {internalMessage.text.title}
                        </Text>
                    )}
                    {internalMessage.text.content && (
                        <Text
                            textAlign="center"
                            fontFamily="$arialHeading"
                            fontWeight="$bold"
                            fontSize={internalMessage.text.fontSize}
                            color={internalMessage.text.color}
                            lineHeight={22}
                            mb={
                                internalMessage.buttons.length > 0 ? "$4" : "$0"
                            }
                        >
                            {internalMessage.text.content}
                        </Text>
                    )}
                    {internalMessage.items && (
                        <Fragment>
                            <VStack gap="$1">
                                {internalMessage.items
                                    .filter(
                                        (item) => parseFloat(item.value) > 0,
                                    )
                                    .map((item, index) => (
                                        <HStack
                                            key={index}
                                            justifyContent="space-between"
                                        >
                                            <Text
                                                color="$gray600"
                                                fontSize={14}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text
                                                color="$gray600"
                                                fontSize={14}
                                            >
                                                R$ {item.value}
                                            </Text>
                                        </HStack>
                                    ))}
                            </VStack>
                            <Divider bgColor="$gray200" mt="$2" />
                            <HStack
                                justifyContent="space-between"
                                mt="$2"
                                mb="$3"
                            >
                                <Text
                                    color="$black"
                                    fontSize={17}
                                    fontWeight="$bold"
                                >
                                    Total
                                </Text>
                                <Text
                                    color="$black"
                                    fontSize={17}
                                    fontWeight="$bold"
                                >
                                    {formatMoney(
                                        internalMessage.items.reduce(
                                            (acc, item) =>
                                                acc + parseFloat(item.value),
                                            0,
                                        ),
                                    )}
                                </Text>
                            </HStack>
                        </Fragment>
                    )}
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
                                        button.textColor
                                            ? button.textColor
                                            : button.type === "positive"
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
        ) : (
            <Actionsheet
                isOpen={
                    sendToPayment === false
                        ? (needAnswerOpen ?? answerNotNeeded ?? true)
                        : false
                }
                onClose={() => {
                    router.back();
                }}
                zIndex={999}
            >
                <ActionsheetContent zIndex={999} bgColor="white">
                    <ActionsheetItem>
                        <VStack gap="$2" w="$full">
                            {internalMessage.text.title && (
                                <Text
                                    mt="$1"
                                    textAlign="center"
                                    fontFamily="$arialHeading"
                                    fontWeight="$bold"
                                    fontSize={19}
                                    color="$black"
                                    mb="$1"
                                >
                                    {internalMessage.text.title}
                                </Text>
                            )}
                            {internalMessage.text.content && (
                                <Text
                                    textAlign="center"
                                    fontFamily="$arialHeading"
                                    fontWeight="$bold"
                                    fontSize={internalMessage.text.fontSize}
                                    color={internalMessage.text.color}
                                    lineHeight={22}
                                    mb={
                                        internalMessage.buttons.length > 0
                                            ? "$4"
                                            : "$0"
                                    }
                                >
                                    {internalMessage.text.content}
                                </Text>
                            )}
                            {internalMessage.items && (
                                <Fragment>
                                    <VStack gap="$1">
                                        {internalMessage.items
                                            .filter(
                                                (item) =>
                                                    parseFloat(item.value) > 0,
                                            )
                                            .map((item, index) => (
                                                <HStack
                                                    key={index}
                                                    justifyContent="space-between"
                                                >
                                                    <Text
                                                        color="$gray600"
                                                        fontSize={14}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                    <Text
                                                        color="$gray600"
                                                        fontSize={14}
                                                    >
                                                        R$ {item.value}
                                                    </Text>
                                                </HStack>
                                            ))}
                                    </VStack>
                                    <Divider bgColor="$gray200" mt="$2" />
                                    <HStack
                                        justifyContent="space-between"
                                        mt="$2"
                                        mb="$3"
                                    >
                                        <Text
                                            color="$black"
                                            fontSize={17}
                                            fontWeight="$bold"
                                        >
                                            Total
                                        </Text>
                                        <Text
                                            color="$black"
                                            fontSize={17}
                                            fontWeight="$bold"
                                        >
                                            {formatMoney(
                                                internalMessage.items.reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        parseFloat(item.value),
                                                    0,
                                                ),
                                            )}
                                        </Text>
                                    </HStack>
                                </Fragment>
                            )}
                            <VStack gap="$2">
                                {internalMessage.buttons.map(
                                    (button, index) => (
                                        <Button
                                            key={index}
                                            bgColor={
                                                button.type === "positive"
                                                    ? "$primaryDefault"
                                                    : "$transparent"
                                            }
                                            onPress={button.action}
                                        >
                                            <ButtonText
                                                textAlign="center"
                                                fontFamily="$heading"
                                                size="lg"
                                                color={
                                                    button.textColor
                                                        ? button.textColor
                                                        : button.type ===
                                                            "positive"
                                                          ? "$white"
                                                          : "$primaryDefault"
                                                }
                                                fontWeight="$bold"
                                            >
                                                {button.text}
                                            </ButtonText>
                                        </Button>
                                    ),
                                )}
                            </VStack>
                        </VStack>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>
        ))
    );
};
