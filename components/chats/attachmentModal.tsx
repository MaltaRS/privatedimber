import { useCallback, useMemo, useState } from "react";

import {
    Input,
    InputField,
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Text,
    Box,
    Pressable,
    HStack,
    ImageBackground,
} from "@/gluestackComponents";

import { ResizeMode, Video } from "expo-av";

import { SelectedFile } from "./attachmentsMenu";

import { GoBack } from "../utils/GoBack";

import { FileText } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

type AttachmentModalProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedFile: SelectedFile;
    onSend: (attachment: any) => void;
};

export const AttachmentModal = ({
    isOpen,
    onClose,
    selectedFile,
    onSend,
}: AttachmentModalProps) => {
    const [caption, setCaption] = useState("");

    const fileName = useMemo(() => {
        const name =
            selectedFile?.assets[0]?.name ||
            selectedFile?.assets[0]?.fileName ||
            "Anexo";
        return name.length > 30 ? `${name.slice(0, 30)}...` : name;
    }, [selectedFile]);

    const selectedFileDetails = useMemo(() => {
        if (!selectedFile) return null;
        return {
            uri: selectedFile.assets[0]?.uri,
            type: selectedFile.type,
            size: selectedFile.assets[0]?.size,
        };
    }, [selectedFile]);

    const handleSend = useCallback(() => {
        onSend({ file: selectedFile, caption });
        setCaption("");
        onClose();
    }, [onSend, selectedFile, caption, onClose]);

    const handleBlur = useCallback(() => {
        setCaption(caption.trim());
    }, [caption]);

    return (
        <Modal
            pt="$6"
            isOpen={isOpen}
            onClose={onClose}
            size="full"
            borderRadius={0}
        >
            <ModalBackdrop backgroundColor="#000" />
            <ModalContent
                flex={1}
                justifyContent="space-between"
                borderRadius={0}
            >
                <ModalHeader w="100%" px="$0" pt="$0" pb="$0">
                    <HStack
                        flex={1}
                        alignItems="center"
                        gap="$2"
                        bgColor="$white"
                        p="$2"
                    >
                        <GoBack onPress={onClose} transparent />
                        <Text size="lg" fontWeight="$bold">
                            {fileName}
                        </Text>
                    </HStack>
                </ModalHeader>
                <ModalBody
                    contentContainerStyle={{
                        flex: 1,
                    }}
                    px="$0"
                    pt="$0"
                    pb="$0"
                >
                    {selectedFileDetails ? (
                        <Box
                            flex={1}
                            justifyContent="center"
                            alignItems="center"
                            bgColor="$gray200"
                        >
                            {selectedFileDetails.type === "image" && (
                                <ImageBackground
                                    source={{
                                        uri: selectedFileDetails.uri,
                                    }}
                                    alt="Selected Image"
                                    resizeMode="contain"
                                    w="100%"
                                    h="100%"
                                />
                            )}
                            {selectedFileDetails.type === "video" && (
                                <Video
                                    source={{
                                        uri: selectedFileDetails.uri,
                                    }}
                                    resizeMode={ResizeMode.CONTAIN}
                                    style={{ width: "100%", height: "100%" }}
                                    useNativeControls
                                />
                            )}
                            {selectedFileDetails.type === "document" && (
                                <Box
                                    flex={1}
                                    p="$4"
                                    bgColor="$gray200"
                                    rounded="$full"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <FileText
                                        size={24}
                                        color={Colors.gray700}
                                    />
                                    <Text
                                        ml="$3"
                                        color="$gray700"
                                        fontWeight="$medium"
                                    >
                                        {fileName}
                                    </Text>
                                    <Text
                                        ml="$3"
                                        color="$gray700"
                                        fontWeight="$medium"
                                    >
                                        (
                                        {(
                                            selectedFileDetails.size / 1024
                                        ).toFixed(2)}{" "}
                                        KB)
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <Text color="$gray500">
                            Nenhum arquivo selecionado.
                        </Text>
                    )}
                </ModalBody>
                <ModalFooter w="100%" px="$0" pt="$0" pb="$0">
                    <HStack
                        py="$2"
                        gap="$2"
                        alignItems="center"
                        w="100%"
                        bgColor="$white"
                    >
                        <Input
                            flex={1}
                            variant="rounded"
                            size="xl"
                            borderWidth={0}
                        >
                            <InputField
                                pl="$5"
                                placeholder="Legenda..."
                                placeholderTextColor="#6B7280"
                                size="lg"
                                onChangeText={setCaption}
                            />
                        </Input>
                        <Pressable
                            rounded="$full"
                            px="$4"
                            py="$2"
                            mr="$1"
                            bgColor="$primaryDefault"
                            onPress={handleSend}
                        >
                            <Text color="white" fontWeight="$bold">
                                Enviar
                            </Text>
                        </Pressable>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
