import { useState } from "react";

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Box,
    Input,
    InputField,
    Pressable,
    Text,
    Textarea,
    TextareaInput,
    VStack,
} from "@/gluestackComponents";

import { Controller, useForm } from "react-hook-form";

import { useAuth } from "@/Context/AuthProvider";

import { BaseContainer } from "@/components/BaseContainer";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import * as ImagePicker from "expo-image-picker";

import Arc from "@/assets/icons/arc.svg";

const userProfileSchema = z
    .object({
        bio: z.string().optional(),
        icon: z.string().optional(),
        links: z.string().optional(),
    })
    .transform((data) => {
        return {
            bio: data.bio?.trim() ?? "",
            links: data.links?.trim() ?? "",
            icon: data.icon,
        };
    });

type CreateUserForm = z.infer<typeof userProfileSchema> & {};

const ProfileScreen = () => {
    const { user } = useAuth();

    const { control, setValue } = useForm<CreateUserForm>({
        resolver: zodResolver(userProfileSchema),
        shouldUnregister: false,
        reValidateMode: "onBlur",
        defaultValues: {
            bio: user?.bio ?? "",
            icon: user?.icon ?? "",
        },
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const selectImage = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Ops! Precisamos de permissão para acessar suas fotos.");
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            if (setPreviewImage) setPreviewImage(result.assets[0].uri);
            setValue("icon", result.assets[0].uri);
        }
    };

    return (
        <BaseContainer
            statusBarColor="#F8F8F9"
            statusBarStyle="dark"
            position="relative"
        >
            <Box position="absolute" top="$0">
                <Arc />
            </Box>
            <VStack gap="$6">
                <VStack
                    alignItems="center"
                    justifyContent="center"
                    mt="$2"
                    gap="$6"
                >
                    <Pressable onPress={selectImage}>
                        <Avatar size="xl">
                            <AvatarFallbackText rounded="$lg">
                                {user?.name ?? ".."}
                            </AvatarFallbackText>
                            {(previewImage || user?.icon) && (
                                <AvatarImage
                                    rounded="$full"
                                    source={{
                                        uri: previewImage ?? user?.icon,
                                    }}
                                    alt={`Foto de perfil de ${user?.name}`}
                                />
                            )}
                        </Avatar>
                    </Pressable>
                    <VStack gap="$1">
                        <Text
                            fontFamily="$arialHeading"
                            fontWeight="$bold"
                            color="#000"
                            size="xl"
                            textAlign="center"
                        >
                            {user?.name}
                        </Text>
                        <Text
                            fontFamily="$arialBody"
                            color="#6B7280"
                            size="md"
                            textAlign="center"
                        >
                            @{user?.username}
                        </Text>
                    </VStack>
                </VStack>
                <VStack gap="$4">
                    <VStack gap="$2">
                        <Text fontWeight="$bold">Bio</Text>
                        <Controller
                            control={control}
                            name="bio"
                            render={({
                                field: {
                                    onBlur,
                                    onChange,
                                    ref,
                                    value,
                                    disabled,
                                },
                            }) => (
                                <Textarea isDisabled={disabled}>
                                    <TextareaInput
                                        placeholder="Escreva uma breve descrição sobre você"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        ref={ref}
                                    />
                                </Textarea>
                            )}
                        />
                    </VStack>
                    <Text fontWeight="$bold">Links</Text>
                    <Controller
                        control={control}
                        name="links"
                        render={({
                            field: { onBlur, onChange, ref, value, disabled },
                        }) => (
                            <Input
                                variant="underlined"
                                size="lg"
                                isDisabled={disabled}
                            >
                                <InputField
                                    placeholder="Adicione suas redes sociais"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    ref={ref}
                                    multiline
                                />
                            </Input>
                        )}
                    />
                </VStack>
            </VStack>
        </BaseContainer>
    );
};
export default ProfileScreen;
