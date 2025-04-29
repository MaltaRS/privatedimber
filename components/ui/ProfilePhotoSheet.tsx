import {
    Button,
    ButtonText,
    VStack,
    Text,
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    HStack,
} from "@/gluestackComponents";

import { Camera, ImagePlus, Trash2 } from "lucide-react-native";

type ProfilePhotoSheetProps = {
    isOpen: boolean;
    onClose: () => void;
    onTakePhoto: () => void;
    onChoosePhoto: () => void;
    onRemovePhoto: () => void;
    hasCurrentPhoto: boolean;
};

export const ProfilePhotoSheet = ({
    isOpen,
    onClose,
    onTakePhoto,
    onChoosePhoto,
    onRemovePhoto,
    hasCurrentPhoto,
}: ProfilePhotoSheetProps) => {
    return (
        <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
            <ActionsheetBackdrop bg="rgba(0, 0, 0, 0.7)" />
            <ActionsheetContent borderRadius="$2xl" bg="$white" zIndex={999}>
                <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator />
                </ActionsheetDragIndicatorWrapper>
                <VStack space="lg" py="$2" px="$4">
                    <Text
                        fontSize={21}
                        fontWeight="bold"
                        color="$black"
                        mb="$2"
                    >
                        Editar foto de perfil
                    </Text>

                    <Button
                        variant="outline"
                        borderWidth={0}
                        onPress={onTakePhoto}
                        py="$3.5"
                        px="$0"
                        bg="transparent"
                        $pressed={{ bg: "$gray100" }}
                    >
                        <HStack gap="$3" alignItems="center">
                            <Camera size={24} color="black" />
                            <ButtonText
                                height="100%"
                                color="$black"
                                fontSize={17}
                                textAlign="left"
                            >
                                Tirar foto
                            </ButtonText>
                        </HStack>
                    </Button>

                    <Button
                        variant="outline"
                        borderWidth={0}
                        onPress={onChoosePhoto}
                        py="$3.5"
                        px="$0"
                        bg="transparent"
                        $pressed={{ bg: "$gray100" }}
                    >
                        <HStack gap="$3" alignItems="center">
                            <ImagePlus size={24} color="black" />
                            <ButtonText
                                height="100%"
                                color="$black"
                                fontSize={17}
                                textAlign="left"
                            >
                                Escolher na biblioteca
                            </ButtonText>
                        </HStack>
                    </Button>

                    {hasCurrentPhoto && (
                        <Button
                            variant="outline"
                            borderWidth={0}
                            onPress={onRemovePhoto}
                            py="$3.5"
                            px="$0"
                            bg="transparent"
                            $pressed={{ bg: "$gray100" }}
                        >
                            <HStack gap="$3" alignItems="center">
                                <Trash2 size={24} color="#FF3B30" />
                                <ButtonText
                                    height="100%"
                                    color="#FF3B30"
                                    fontSize={17}
                                    textAlign="left"
                                >
                                    Remover foto atual
                                </ButtonText>
                            </HStack>
                        </Button>
                    )}
                </VStack>
            </ActionsheetContent>
        </Actionsheet>
    );
};
