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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

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
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SendMessageData>({
        resolver: zodResolver(SendMessageSchema),
    });

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
                    <Paperclip size={22} color="#374151" />
                    <ImageSquare width={20} height={20} color="#374151" />
                    <Camera width={22} height={22} />
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
