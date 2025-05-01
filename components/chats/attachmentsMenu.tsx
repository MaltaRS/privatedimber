import React, { useCallback, useState } from "react";

import { Box, Menu, Pressable, Text } from "@/gluestackComponents";

import { Colors } from "@/constants/Colors";

import { FileText, Image, Plus, Video } from "lucide-react-native";

import {
    OpenCameraAttachment,
    OpenDocumentPickerAttachment,
    OpenImageSelectorAttachment,
} from "@/utils/expoAttachments";

import { AttachmentModal } from "./attachmentModal";
import { SendMessageParams } from "@/Context/ChatProvider";
import { uploadImageToFirebase } from "@/utils/firebaseFunctions";

type AttachmentType = "image" | "video" | "document";

export type SelectedFile = {
    assets: any[];
    type: AttachmentType;
    name?: string;
} | null;

export const AttachmentsMenu = ({
    conversationId,
    sendMessage,
}: {
    conversationId: string;
    sendMessage: ({
        content,
        image,
        document,
        conversationId,
        shouldDeliver,
    }: SendMessageParams) => void;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<SelectedFile>(null);

    const handleAttachment = useCallback(async (type: AttachmentType) => {
        try {
            let result;
            switch (type) {
                case "image":
                    result = await OpenImageSelectorAttachment();
                    break;
                case "video":
                    result = await OpenCameraAttachment();
                    break;
                case "document":
                    result = await OpenDocumentPickerAttachment();
                    break;
                default:
                    return;
            }

            if (result && !result.canceled) {
                setSelectedFile({ ...result, type });
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Erro ao tentar acessar o anexo:", error);
            alert("Ocorreu um erro ao tentar acessar o anexo.");
        }
    }, []);

    const handleSend = useCallback(
        async ({ file, caption }: { file: SelectedFile; caption: string }) => {
            setSelectedFile(null);
            let attachmentUri = file?.assets[0].uri;
            let storagePath = "";

            if (file?.type === "image") {
                storagePath = "conversation_images/";
            } else if (file?.type === "video") {
                storagePath = "conversation_videos/";
            } else if (file?.type === "document") {
                storagePath = "conversation_documents/";
            }

            const attchmentUrl = await uploadImageToFirebase({
                uri: attachmentUri,
                storage_path: storagePath,
            });

            sendMessage({
                content: caption,
                image: file?.type === "image" ? attchmentUrl : undefined,
                document: file?.type === "document" ? attchmentUrl : undefined,
                video: file?.type === "video" ? attchmentUrl : undefined,
                conversationId: conversationId,
                shouldDeliver: true,
            });
        },
        [conversationId, sendMessage],
    );

    return (
        <>
            <Menu
                placement="top left"
                bgColor="$white"
                rounded={12}
                py="$0"
                trigger={({ ...triggerProps }) => {
                    return (
                        <Pressable {...triggerProps}>
                            <Box
                                p="$2"
                                bgColor="$white"
                                rounded="$full"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Plus size={24} color={Colors.gray700} />
                            </Box>
                        </Pressable>
                    );
                }}
            >
                <Menu.Item
                    onPress={() => handleAttachment("image")}
                    justifyContent="flex-start"
                    alignItems="center"
                    py="$3"
                    textValue="Selecionar Imagem"
                >
                    <Box rounded="$full" bgColor="$gray200" p="$3">
                        <Image size={20} color={Colors.gray700} />
                    </Box>
                    <Text ml="$3" color="$gray700" fontWeight="$medium">
                        Selecionar Imagem
                    </Text>
                </Menu.Item>
                <Menu.Item
                    onPress={() => handleAttachment("video")}
                    justifyContent="flex-start"
                    alignItems="center"
                    py="$3"
                    textValue="Selecionar Vídeo"
                >
                    <Box rounded="$full" bgColor="$gray200" p="$3">
                        <Video size={20} color={Colors.gray700} />
                    </Box>
                    <Text ml="$3" color="$gray700" fontWeight="$medium">
                        Selecionar Vídeo
                    </Text>
                </Menu.Item>
                <Menu.Item
                    onPress={() => handleAttachment("document")}
                    justifyContent="flex-start"
                    alignItems="center"
                    py="$3"
                    textValue="Selecionar Documento"
                >
                    <Box rounded="$full" bgColor="$gray200" p="$3">
                        <FileText size={20} color={Colors.gray700} />
                    </Box>
                    <Text ml="$3" color="$gray700" fontWeight="$medium">
                        Selecionar Documento
                    </Text>
                </Menu.Item>
            </Menu>
            <AttachmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedFile={selectedFile}
                onSend={handleSend}
            />
        </>
    );
};
