import { Fragment, useEffect, useState } from "react";

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
    Box,
} from "@/gluestackComponents";

import { Button } from "@/components/ui/Button";

import Octicons from "@expo/vector-icons/Octicons";
import { useBlockUser } from "@/hooks/BlockUser";
import { isUserBlocked } from "@/connection/auth/UserConnection";

type BlockUserProps = {
    blockedId: string;
    blockedName: string;
    onClose: () => void;
};

export const BlockUser = ({
    blockedId,
    blockedName,
    onClose,
}: BlockUserProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isBlocked, setIsBlocked] = useState<boolean | null>(null);

    const { block, unblock } = useBlockUser();

    useEffect(() => {
        const checkIfBlocked = async () => {
            const blockedStatus = await isUserBlocked(blockedId);
            setIsBlocked(blockedStatus);
        };

        checkIfBlocked();
    }, [blockedId]);

    const handleAction = () => {
        if (isBlocked) {
            unblock.mutate(blockedId, {
                onSuccess: () => {
                    setIsBlocked(false);
                    setIsOpen(false);
                    onClose();
                },
            });
        } else {
            block.mutate(blockedId, {
                onSuccess: () => {
                    setIsBlocked(true);
                    setIsOpen(false);
                    onClose();
                },
            });
        }
    };

    return (
        <Fragment>
            <Pressable onPress={() => setIsOpen(true)}>
                <HStack py="$3" px="$3" alignItems="center" gap="$3">
                    <Box width={16} ml="$1">
                        <Octicons
                            name="circle-slash"
                            size={16}
                            color={isBlocked ? "#007BFF" : "#D32F2F"}
                        />
                    </Box>
                    <Text
                        fontFamily="$arialBody"
                        color={isBlocked ? "$blue500" : "$negative"}
                        size="lg"
                    >
                        {isBlocked ? "Desbloquear" : "Bloquear"}
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
                            {isBlocked
                                ? `Deseja desbloquear ${blockedName}?`
                                : `Deseja bloquear ${blockedName}?`}
                        </Text>
                        <Text fontSize={14} color="$gray600" mb="$4">
                            {isBlocked
                                ? "Este usuário poderá entrar em contato novamente."
                                : "Este usuário não poderá mais enviar mensagens para você."}
                        </Text>
                        <VStack mt="$5">
                            <Button
                                onPress={handleAction}
                                isDisabled={
                                    block.isPending || unblock.isPending
                                }
                                bgColor={
                                    isBlocked ? "$primaryDefault" : "$negative"
                                }
                            >
                                {block.isPending || unblock.isPending ? (
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
                                        {isBlocked ? "Desbloquear" : "Bloquear"}
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
