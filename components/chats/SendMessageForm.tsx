import { useState } from "react";

import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ButtonText,
    HStack,
    Input,
    InputField,
    Pressable,
    ScrollView,
    Text,
    Textarea,
    TextareaInput,
    VStack,
} from "@/gluestackComponents";

import { Paperclip } from "phosphor-react-native";

import Camera from "@/assets/icons/appIcons/camera.svg";
import ImageSquare from "@/assets/icons/appIcons/imageSquare.svg";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../ui/Button";
import { ImagePreviewForm } from "./ImagePreviewForm";
import { DocumentPreviewForm } from "./DocumentPreviewForm";
import { uploadImageToFirebase } from "@/utils/firebaseFunctions";
import { VideoPreviewForm } from "./VideoPreviewForm";

type SendMessageFormProps = {
    sendMessage: ({
        content,
        image,
        document,
        conversationId,
    }: {
        conversationId: string;
        content: string;
        image?: string;
        document?: string;
    }) => void;
    setFormActive: (value: boolean) => void;
    conversationId: string;
};

const SendMessageSchema = z.object({
    title: z
        .string({
            message: "O assunto é obrigatório.",
        })
        .min(1, "O assunto é obrigatório."),
    content: z
        .string({ message: "A mensagem é obrigatória." })
        .min(1, "A mensagem é obrigatória."),
});

type SendMessageData = z.infer<typeof SendMessageSchema>;

type AvailableFeature = "camera" | "image" | "document";

export type ImageProps = {
    uri: string;
    size: number;
    name: string;
};

export type DocumentProps = {
    uri: string;
    size: number;
    name: string;
};

export type VideoProps = {
    uri: string;
    size: number;
    name: string;
    duration: number;
};

export const SendMessageForm = ({
    sendMessage,
    setFormActive,
    conversationId,
}: SendMessageFormProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SendMessageData>({
        resolver: zodResolver(SendMessageSchema),
    });

    const [previewImagesToSend, setPreviewImagesToSend] = useState<
        ImageProps[]
    >([]);

    const [previewDocumentsToSend, setPreviewDocumentsToSend] = useState<
        DocumentProps[]
    >([]);

    const [previewVideosToSend, setPreviewVideosToSend] = useState<
        VideoProps[]
    >([]);

    const [needConfirmation, setNeedConfirmation] = useState(false);
    const [permissionFor, setPermissionFor] = useState<
        AvailableFeature[] | null
    >(null);

    const handleClose = () => {
        setNeedConfirmation(false);
    };

    const OpenImageSelector = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Desculpe, precisamos da permissão para acessar suas fotos.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "livePhotos", "videos"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setPreviewImagesToSend([
                ...previewImagesToSend,
                {
                    uri: result.assets[0].uri,
                    size: result.assets[0].fileSize ?? 0,
                    name: result.assets[0].fileName ?? "",
                },
            ]);
        }
    };

    const OpenDocumentPicker = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: false,
        });

        if (!result.canceled) {
            setPreviewDocumentsToSend([
                ...previewDocumentsToSend,
                {
                    uri: result.assets[0].uri,
                    size: result.assets[0].size ?? 0,
                    name: result.assets[0].name,
                },
            ]);
        }
    };

    const OpenCamera = async () => {
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Permissão para acessar a câmera é necessária!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ["videos"],
            videoMaxDuration: 60,
            quality: 0.8,
            allowsEditing: true,
            allowsMultipleSelection: false,
            videoQuality:
                ImagePicker.UIImagePickerControllerQualityType["Medium"],
        });

        if (!result.canceled) {
            setPreviewVideosToSend([
                ...previewVideosToSend,
                {
                    uri: result.assets[0].uri,
                    size: result.assets[0].fileSize ?? 0,
                    name: result.assets[0].fileName ?? "",
                    duration: result.assets[0].duration ?? 0,
                },
            ]);
        } else {
            console.log("Captura de vídeo cancelada");
        }
    };

    const ConfirmValidation = () => {
        if (!permissionFor) return;

        setNeedConfirmation(false);

        const featureActions: Record<AvailableFeature, () => void> = {
            camera: OpenCamera,
            image: OpenImageSelector,
            document: OpenDocumentPicker,
        };

        permissionFor.forEach((feature) => {
            featureActions[feature]?.();
        });
    };

    const ValidateFeature = ({
        featureName,
    }: {
        featureName: AvailableFeature;
    }) => {
        setPermissionFor([featureName]);
        setNeedConfirmation(true);
    };

    const HandleSendMessage = async (data: SendMessageData) => {
        sendMessage({
            conversationId,
            content: `*${data.title}*\n\n${data.content}`,
        });

        if (previewImagesToSend.length > 0) {
            previewImagesToSend.forEach(async (image) => {
                const imageUrl = await uploadImageToFirebase({
                    uri: image.uri,
                    storage_path: "conversation_images/",
                });

                sendMessage({
                    conversationId,
                    content: "",
                    image: imageUrl,
                });
            });
        }

        // if (previewDocumentsToSend.length > 0) {
        //     previewDocumentsToSend.forEach((document) => {
        //         sendMessage({
        //             content: "",
        //             document: document.uri,
        //         });
        //     });
        // }

        setFormActive(false);
    };

    const activePermissionNeededText =
        permissionFor && permissionFor.length
            ? permissionFor[permissionFor.length - 1] === "camera"
                ? "vídeo"
                : permissionFor[permissionFor.length - 1] === "image"
                  ? "imagem"
                  : "documento"
            : "";

    return (
        <VStack mt="$4" flex={1}>
            <Actionsheet
                isOpen={needConfirmation}
                onClose={handleClose}
                zIndex={999}
            >
                <ActionsheetBackdrop bgColor="#000" />
                <ActionsheetContent h="$72" zIndex={999} bgColor="white">
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator bgColor="#000" />
                    </ActionsheetDragIndicatorWrapper>
                    <ActionsheetItem>
                        <VStack pt="$2" gap="$2">
                            <Text
                                size="xl"
                                color="#000"
                                fontFamily="$heading"
                                lineHeight={20}
                            >
                                Adicionar {activePermissionNeededText}
                            </Text>
                            <Text
                                size="md"
                                color="#374151"
                                fontFamily="$arialBody"
                                lineHeight={24}
                            >
                                Para incluir um arquivo (PDF ou documento) na
                                sua mensagem, será cobrado um valor adicional de
                                <Text fontWeight="$bold"> 10% </Text>
                                sobre o valor original. Você poderá excluir o
                                arquivo antes do envio da mensagem, se
                                necessário. Deseja continuar?
                            </Text>
                            <Button mt="$4" onPress={ConfirmValidation}>
                                <ButtonText textAlign="center" size="md">
                                    Inserir {activePermissionNeededText}
                                </ButtonText>
                            </Button>
                            <Text
                                color="$primaryDefault"
                                size="md"
                                textAlign="center"
                                fontWeight="$bold"
                                mt="$2"
                            >
                                Cancelar
                            </Text>
                        </VStack>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <VStack gap="$4" px="$3" flex={1}>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                variant="underlined"
                                size="lg"
                                borderWidth={0}
                                borderBottomColor="#9CA3AF"
                                isInvalid={!!errors.title}
                                $invalid-borderColor="$negative"
                            >
                                <InputField
                                    placeholder="Assunto:"
                                    placeholderTextColor="#9CA3AF"
                                    size="lg"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            </Input>
                        )}
                    />
                    <Controller
                        control={control}
                        name="content"
                        render={({ field: { onChange, value } }) => (
                            <Textarea
                                flex={1}
                                minHeight={200}
                                borderWidth={0}
                                isInvalid={!!errors.content}
                                $invalid-borderColor="$negative"
                            >
                                <TextareaInput
                                    placeholder="Mensagem:"
                                    py="$2"
                                    px="$0"
                                    maxLength={840}
                                    fontSize="$lg"
                                    value={value}
                                    onChangeText={onChange}
                                    placeholderTextColor="#9CA3AF"
                                    borderBottomColor="#9CA3AF"
                                />
                            </Textarea>
                        )}
                    />
                    <Text
                        textAlign="right"
                        size="md"
                        fontWeight="$bold"
                        color="#9CA3AF"
                    >
                        {(watch("content") ?? "").length}/840
                    </Text>
                    {previewImagesToSend.map((image, index) => (
                        <ImagePreviewForm
                            key={image.name}
                            image={image}
                            index={index}
                            setPreviewImages={setPreviewImagesToSend}
                        />
                    ))}
                    {previewDocumentsToSend.map((document, index) => (
                        <DocumentPreviewForm
                            key={document.name}
                            document={document}
                            index={index}
                            setPreviewDocuments={setPreviewDocumentsToSend}
                        />
                    ))}
                    {previewVideosToSend.map((video, index) => (
                        <VideoPreviewForm
                            key={video.name}
                            video={video}
                            index={index}
                            setPreviewVideos={setPreviewVideosToSend}
                        />
                    ))}
                </VStack>
            </ScrollView>
            <HStack
                mt="$4"
                py="$4"
                px="$2"
                borderTopColor="#e1e2e6"
                borderTopWidth={1}
                justifyContent="space-between"
                alignItems="center"
            >
                <HStack gap="$3" pl="$2">
                    <Pressable
                        onPress={() =>
                            ValidateFeature({ featureName: "document" })
                        }
                    >
                        <Paperclip size={22} color="#374151" />
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            ValidateFeature({ featureName: "image" })
                        }
                    >
                        <ImageSquare width={20} height={20} color="#374151" />
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            ValidateFeature({ featureName: "camera" })
                        }
                    >
                        <Camera width={22} height={22} />
                    </Pressable>
                </HStack>
                <Pressable
                    backgroundColor="$primaryDefault"
                    rounded="$full"
                    py={9}
                    px="$4"
                    onPress={() => {
                        handleSubmit(HandleSendMessage)();
                    }}
                >
                    <Text
                        color="$white"
                        fontFamily="$heading"
                        fontWeight="$bold"
                        size="md"
                    >
                        Enviar
                    </Text>
                </Pressable>
            </HStack>
        </VStack>
    );
};
