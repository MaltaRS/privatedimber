import { Fragment, useState } from "react";

import { deleteConversation } from "@/connection/conversations/ConversationConnection";

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

import Ionicons from "@expo/vector-icons/Ionicons";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteConversationProps = {
    conversationId: string;
    conversationName: string;
    onClose: () => void;
};

export const DeleteConversation = ({
    conversationId,
    conversationName,
    onClose,
}: DeleteConversationProps) => {
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);

    const { mutate, isPending: isLoading } = useMutation({
        mutationFn: (conversationId: string) =>
            deleteConversation(conversationId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["conversations"],
            });

            queryClient.invalidateQueries({
                queryKey: ["conversationMessage", conversationId],
            });
        },
        onError: (error) => {
            // @ts-expect-error
            console.error("Erro ao deletar a conversa:", error.response.data);
        },
    });

    const handleDelete = () => {
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
                    <Ionicons name="trash-outline" size={20} color="#D32F2F" />
                    <Text fontFamily="$arialBody" color="$negative" size="lg">
                        Excluir conversa
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
                            Deseja excluir a conversa com {conversationName}?
                        </Text>
                        <VStack mt="$5">
                            <Button
                                onPress={handleDelete}
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
                                        Apagar conversa
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
