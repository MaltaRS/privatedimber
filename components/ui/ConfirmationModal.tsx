import { Fragment } from "react";

import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    Button,
    ButtonGroup,
    ButtonText,
    HStack,
    Text,
} from "@/gluestackComponents";

import { X } from "lucide-react-native";

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    invert?: boolean;
};

export const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    invert,
}: ConfirmationModalProps) => {
    return (
        <AlertDialog isOpen={isOpen} onClose={onClose}>
            <AlertDialogBackdrop backgroundColor="rgba(0, 0, 0, 0.5)" />
            <AlertDialogContent
                bgColor="$white"
                borderRadius="$xl"
                shadowColor="$black"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.25}
                shadowRadius={3.84}
                elevation={5}
            >
                <AlertDialogHeader alignItems="center">
                    <HStack
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                    >
                        <Text fontSize={21} fontWeight="bold" color="$black">
                            {title}
                        </Text>
                        <AlertDialogCloseButton
                            bg="$gray100"
                            borderRadius="$full"
                        >
                            <X size={20} color="#000" />
                        </AlertDialogCloseButton>
                    </HStack>
                </AlertDialogHeader>
                <AlertDialogBody mb="$1">
                    <Text
                        textAlign="center"
                        fontSize={17}
                        color="$gray700"
                        lineHeight="$xl"
                    >
                        {message}
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <ButtonGroup gap="$4" width="100%">
                        {!invert ? (
                            <Fragment>
                                <Button
                                    flex={1}
                                    action="negative"
                                    rounded="$full"
                                    onPress={onClose}
                                    bg="$gray200"
                                    $pressed={{ bg: "$gray300" }}
                                >
                                    <ButtonText
                                        textAlign="center"
                                        color="$gray700"
                                        fontWeight="bold"
                                    >
                                        Cancelar
                                    </ButtonText>
                                </Button>
                                <Button
                                    flex={1}
                                    bg="$primaryDefault"
                                    rounded="$full"
                                    onPress={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    $pressed={{ bg: "$primary600" }}
                                >
                                    <ButtonText
                                        textAlign="center"
                                        fontWeight="bold"
                                    >
                                        Sim
                                    </ButtonText>
                                </Button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Button
                                    flex={1}
                                    bg="$primaryDefault"
                                    rounded="$full"
                                    onPress={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    $pressed={{ bg: "$primary600" }}
                                >
                                    <ButtonText
                                        textAlign="center"
                                        fontWeight="bold"
                                    >
                                        Sim
                                    </ButtonText>
                                </Button>
                                <Button
                                    flex={1}
                                    action="negative"
                                    rounded="$full"
                                    onPress={onClose}
                                    bg="$gray200"
                                    $pressed={{ bg: "$gray300" }}
                                >
                                    <ButtonText
                                        textAlign="center"
                                        color="$gray700"
                                        fontWeight="bold"
                                    >
                                        Cancelar
                                    </ButtonText>
                                </Button>
                            </Fragment>
                        )}
                    </ButtonGroup>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
