import { useState } from "react";

import { useRouter } from "expo-router";

import {
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
import { useCameraPermissions } from "expo-camera";

type SendMessageFormProps = {
    sendMessage: (message: string) => void;
    setFormActive: (value: boolean) => void;
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

export const SendMessageForm = ({
    sendMessage,
    setFormActive,
}: SendMessageFormProps) => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SendMessageData>({
        resolver: zodResolver(SendMessageSchema),
    });

    const [permission, requestPermission] = useCameraPermissions();

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
            console.log(result.assets[0].uri);
        }
    };

    const OpenDocumentPicker = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: false,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
        }
    };

    const OpenCamera = async () => {
        if (!permission?.granted) {
            requestPermission();
        } else {
            router.push("/camera");
        }
    };

    const HandleSendMessage = async (data: SendMessageData) => {
        sendMessage(`*${data.title}*\n\n${data.content}`);
        setFormActive(false);
    };

    return (
        <VStack mt="$4" flex={1}>
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
                                borderWidth={0}
                                isInvalid={!!errors.content}
                                $invalid-borderColor="$negative"
                            >
                                <TextareaInput
                                    placeholder="Mensagem:"
                                    py="$2"
                                    px="$0"
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
                    <Pressable onPress={OpenDocumentPicker}>
                        <Paperclip size={22} color="#374151" />
                    </Pressable>
                    <Pressable onPress={OpenImageSelector}>
                        <ImageSquare width={20} height={20} color="#374151" />
                    </Pressable>
                    <Pressable onPress={OpenCamera}>
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
