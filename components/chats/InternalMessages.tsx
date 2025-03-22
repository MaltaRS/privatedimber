import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";

import { useRouter } from "expo-router";

import { PaymentItems } from "@/app/(conversations)/[conversationId]";
import { MessagesPayload } from "@/connection/conversations/ConversationConnection";

import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetItem,
    ButtonText,
    Divider,
    HStack,
    Text,
    VStack,
} from "@/gluestackComponents";

import { toast } from "burnt";

import { ConversationPriority } from "@/Context/ChatProvider";

import { Button } from "../ui/Button";

import { formatMoney } from "@/utils/money";

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

    const [internalMessages, setInternalMessages] = useState<InternalMessage[]>(
        [],
    );

    useEffect(() => {
        const msgs: InternalMessage[] = [];

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
            answerNotNeeded === undefined &&
            (isPresenting || (contactTotalAnswers > 1 && answersCount > 0)) &&
            !isCreator &&
            messages.length > 0
        ) {
            setAnswerNotNeeded(true);
        } else if (
            answerNotNeeded !== undefined &&
            !isCreator &&
            !isPresenting &&
            answersCount <= 0
        ) {
            setAnswerNotNeeded(undefined);
        }

        if (hasToPay) {
            if (askForNeedAnswer) {
                msgs.push({
                    text: {
                        title: "Deseja garantir uma resposta?",
                        content:
                            "Ao confirmar, será acrescentado um valor de 10% (R$10,00) e o destinatário será obrigado a responder. Caso não pague a resposta ficará ao critério do destinatário.",
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
            } else {
                msgs.push({
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
            }
        } else if (isFinished) {
            if (!isCreator) {
                msgs.push({
                    text: {
                        content: "Conversa encerrada e arquivada",
                        color: "$primaryDefault",
                        fontSize: 17,
                    },
                    buttons: [],
                    type: "floating",
                    active: true,
                });
            } else {
                msgs.push({
                    text: {
                        content: "Conversa encerrada",
                        color: "$negative",
                        fontSize: 17,
                    },
                    buttons: [],
                    type: "floating",
                    active: true,
                });
                msgs.push({
                    text: {
                        content:
                            "Deseja enviar uma mensagem paga para o profissional?",
                        color: "$gray900",
                        fontSize: 17,
                    },
                    buttons: [
                        {
                            type: "positive",
                            text: "Enviar nova mensagem paga",
                            action: () => {
                                toast({
                                    title: "Em desenvolvimento (fluxo ainda não definido)",
                                    shouldDismissByDrag: true,
                                    duration: 3000,
                                });
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
            }
        } else if (isPresenting && messages.length === 0) {
            msgs.push({
                text: {
                    content: "Aguardando apresentação",
                    color: "$primaryDefault",
                    fontSize: 17,
                },
                buttons: [],
                type: "floating",
                active: !isCreator,
            });
        } else if (needReply) {
            msgs.push({
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
        } else if (
            (isPresenting || (contactTotalAnswers > 1 && answersCount > 0)) &&
            !isCreator &&
            messages.length > 0
        ) {
            const isReplic = contactTotalAnswers > 1 && answersCount > 0;
            msgs.push({
                text: {
                    title: "Mensagem sem resposta obrigatória",
                    content: !isReplic
                        ? "A resposta é opcional, deseja responder essa mensagem?"
                        : "As respostas das réplicas não são obrigatórias. O que deseja fazer?",
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
        } else if (answersCount <= 0 && isCreator) {
            msgs.push({
                text: {
                    content: "Aguardando resposta",
                    color: "$primaryDefault",
                    fontSize: 17,
                },
                buttons: [],
                type: "floating",
                active: true,
            });
        } else if (
            (answerNotNeeded === undefined || answerNotNeeded === false) &&
            contactAnswersCount === 0 &&
            !isCreator &&
            contactTotalAnswers <= 2
        ) {
            msgs.push({
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
        } else if (!isCreator && contactTotalAnswers > 2) {
            msgs.push({
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
        } else if (!isCreator && priority === "LOW") {
            msgs.push({
                text: {
                    title: "Qual a prioridade dessa resposta na sua fila de leitura",
                    content: "",
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
        } else if (answersCount <= 0 && !isCreator) {
            msgs.push({
                text: {
                    content: "Aguardando resposta",
                    color: priority === "HIGH" ? "$warning" : "$primaryDefault",
                    fontSize: 17,
                },
                buttons: [],
                type: "floating",
                active: true,
            });
        } else if (msgs.length === 0) {
            msgs.push({
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
        setInternalMessages(msgs);
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
        <Fragment>
            {internalMessages
                .filter((msg) => msg.active && msg.type === "floating")
                .map((msg, index) => (
                    <HStack
                        key={index}
                        w="$full"
                        py="$6"
                        justifyContent="center"
                        alignContent="center"
                    >
                        <VStack
                            maxWidth="92%"
                            bgColor="$white"
                            rounded="$xl"
                            py={msg.buttons.length > 0 ? "$2" : "$3"}
                            px="$4"
                        >
                            {msg.text.title && (
                                <Text
                                    mt="$1"
                                    textAlign="center"
                                    fontFamily="$arialHeading"
                                    fontWeight="$bold"
                                    fontSize={17}
                                    color="$black"
                                    mb="$1"
                                >
                                    {msg.text.title}
                                </Text>
                            )}
                            {msg.text.content && (
                                <Text
                                    textAlign="center"
                                    fontFamily="$arialHeading"
                                    fontWeight="$bold"
                                    fontSize={msg.text.fontSize}
                                    color={msg.text.color}
                                    lineHeight={22}
                                    mb={msg.buttons.length > 0 ? "$4" : "$0"}
                                >
                                    {msg.text.content}
                                </Text>
                            )}
                            {msg.items && (
                                <Fragment>
                                    <VStack gap="$1">
                                        {msg.items
                                            .filter(
                                                (item) =>
                                                    parseFloat(item.value) > 0,
                                            )
                                            .map((item, i) => (
                                                <HStack
                                                    key={i}
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
                                                msg.items.reduce(
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
                                {msg.buttons.map((button, i) => (
                                    <Button
                                        key={i}
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
                ))}
            {internalMessages
                .filter((msg) => msg.active && msg.type === "actionSheet")
                .map((msg, index) => (
                    <Actionsheet
                        key={index}
                        isOpen={
                            sendToPayment === false
                                ? (needAnswerOpen ?? answerNotNeeded ?? true)
                                : false
                        }
                        onClose={() => {
                            router.back();
                        }}
                        closeOnOverlayClick={false}
                        zIndex={999}
                    >
                        <ActionsheetBackdrop pointerEvents="none" />
                        <ActionsheetContent zIndex={999} bgColor="white">
                            <ActionsheetItem>
                                <VStack gap="$2" w="$full">
                                    {msg.text.title && (
                                        <Text
                                            mt="$1"
                                            textAlign="center"
                                            fontFamily="$arialHeading"
                                            fontWeight="$bold"
                                            fontSize={19}
                                            color="$black"
                                            mb="$1"
                                        >
                                            {msg.text.title}
                                        </Text>
                                    )}
                                    {msg.text.content && (
                                        <Text
                                            textAlign="center"
                                            fontFamily="$arialHeading"
                                            fontWeight="$bold"
                                            fontSize={msg.text.fontSize}
                                            color={msg.text.color}
                                            lineHeight={22}
                                            mb={
                                                msg.buttons.length > 0
                                                    ? "$4"
                                                    : "$0"
                                            }
                                        >
                                            {msg.text.content}
                                        </Text>
                                    )}
                                    {msg.items && (
                                        <Fragment>
                                            <VStack gap="$1">
                                                {msg.items
                                                    .filter(
                                                        (item) =>
                                                            parseFloat(
                                                                item.value,
                                                            ) > 0,
                                                    )
                                                    .map((item, i) => (
                                                        <HStack
                                                            key={i}
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
                                            <Divider
                                                bgColor="$gray200"
                                                mt="$2"
                                            />
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
                                                        msg.items.reduce(
                                                            (acc, item) =>
                                                                acc +
                                                                parseFloat(
                                                                    item.value,
                                                                ),
                                                            0,
                                                        ),
                                                    )}
                                                </Text>
                                            </HStack>
                                        </Fragment>
                                    )}
                                    <VStack gap="$2">
                                        {msg.buttons.map((button, i) => (
                                            <Button
                                                key={i}
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
                                        ))}
                                    </VStack>
                                </VStack>
                            </ActionsheetItem>
                        </ActionsheetContent>
                    </Actionsheet>
                ))}
        </Fragment>
    );
};
