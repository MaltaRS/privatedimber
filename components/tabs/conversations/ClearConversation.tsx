import { Fragment, useState } from "react";

import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ButtonIcon,
    ButtonText,
    HStack,
    Pressable,
    Spinner,
    Text,
    VStack,
} from "@/gluestackComponents";

import { Button } from "@/components/ui/Button";

import { XCircle } from "lucide-react-native";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { clearConversation } from "@/connection/conversations/ConversationConnection";

type ClearConversationProps = {
    conversationId: string;
    conversationName: string;
    onClose: () => void;
};

export const ClearConversation = ({
    conversationId,
    conversationName,
    onClose,
}: ClearConversationProps) => {
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);

    const { mutate, isPending: isLoading } = useMutation({
        mutationFn: (conversationId: string) =>
            clearConversation(conversationId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["conversations"],
            });
        },
        onError: (error) => {
            // @ts-expect-error
            console.error("Erro ao limpar a conversa:", error.response.data);
        },
    });

    const handleClear = () => {
        mutate(conversationId, {
            onSuccess: () => {
                setIsOpen(false);
                onClose();
            },
        });
    };

    return (
        <Fragment>
            <Pressable onPress={() => setIsOpen(true)}>
                <HStack py="$3" px="$3" alignItems="center" gap="$3">
                    <XCircle size={20} color="#000" />
                    <Text fontFamily="$arialBody" color="$black" size="lg">
                        Limpar conversa
                    </Text>
                </HStack>
            </Pressable>

            <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ActionsheetBackdrop backgroundColor="#000" />
                <ActionsheetContent bgColor="$gray200">
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator bgColor="#000" />
                    </ActionsheetDragIndicatorWrapper>

                    <VStack p="$4">
                        <Text
                            size="2xl"
                            fontWeight="bold"
                            color="$black"
                            fontFamily="$heading"
                            lineHeight={30}
                            mb="$2"
                        >
                            Deseja limpar todas as mensagens da conversa com{" "}
                            {conversationName}?
                        </Text>
                        <VStack mt="$5">
                            <Button
                                onPress={handleClear}
                                isDisabled={isLoading}
                                bgColor="$negative"
                            >
                                {isLoading ? (
                                    <ButtonIcon>
                                        <Spinner color="white" />
                                    </ButtonIcon>
                                ) : (
                                    <ButtonText
                                        textAlign="center"
                                        fontFamily="$heading"
                                        size="lg"
                                        fontWeight="$bold"
                                    >
                                        Limpar conversa
                                    </ButtonText>
                                )}
                            </Button>
                            <Pressable
                                w="$full"
                                mt="$3"
                                p="$2"
                                onPress={() => setIsOpen(false)}
                            >
                                <Text
                                    color="$black"
                                    textAlign="center"
                                    fontFamily="$heading"
                                    fontSize={17}
                                >
                                    Cancelar
                                </Text>
                            </Pressable>
                        </VStack>
                    </VStack>
                </ActionsheetContent>
            </Actionsheet>
        </Fragment>
    );
};
