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
            <AlertDialogBackdrop backgroundColor="#000" />
            <AlertDialogContent bgColor="$gray100">
                <AlertDialogHeader alignItems="center">
                    <Text textAlign="center" fontSize="$lg" fontWeight="bold">
                        {title}
                    </Text>
                    <AlertDialogCloseButton>
                        <X size={20} color="#000" />
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody mb="$2">
                    <Text textAlign="center">{message}</Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <ButtonGroup gap="$4">
                        {!invert ? (
                            <>
                                <Button
                                    flex={1}
                                    action="negative"
                                    rounded="$full"
                                    onPress={onClose}
                                >
                                    <ButtonText textAlign="center">
                                        Cancelar
                                    </ButtonText>
                                </Button>
                                <Button
                                    flex={1}
                                    bg="$primaryDefault"
                                    rounded="$full"
                                    action="negative"
                                    onPress={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                >
                                    <ButtonText textAlign="center">
                                        Sim
                                    </ButtonText>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    flex={1}
                                    bg="$primaryDefault"
                                    rounded="$full"
                                    action="negative"
                                    onPress={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                >
                                    <ButtonText textAlign="center">
                                        Sim
                                    </ButtonText>
                                </Button>
                                <Button
                                    flex={1}
                                    action="negative"
                                    rounded="$full"
                                    onPress={onClose}
                                >
                                    <ButtonText textAlign="center">
                                        Cancelar
                                    </ButtonText>
                                </Button>
                            </>
                        )}
                    </ButtonGroup>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
