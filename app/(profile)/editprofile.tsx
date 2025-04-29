import { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";

import { useRouter } from "expo-router";

import { ChevronRight, Pencil } from "lucide-react-native";

import {
    Text,
    VStack,
    Avatar,
    AvatarImage,
    AvatarFallbackText,
    Pressable,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    FormControlHelper,
    InputField,
    ScrollView,
    Box,
    HStack,
    Textarea,
    TextareaInput,
} from "@/gluestackComponents";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";
import { Input } from "@/components/ui/Input";

import { useAuth } from "@/Context/AuthProvider";

import { uploadImageToFirebase } from "@/utils/firebaseFunctions";

import * as ImagePicker from "expo-image-picker";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    updateProfileImage,
    updateProfile,
} from "@/connection/auth/UserConnection";

import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { ProfilePhotoSheet } from "@/components/ui/ProfilePhotoSheet";

const EditProfileSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    username: z.string().min(1, "O usuário é obrigatório"),
    bio: z
        .string()
        .max(100, "A bio deve ter no máximo 100 caracteres")
        .optional(),
    about: z.string().optional(),
});

type EditProfileData = z.infer<typeof EditProfileSchema>;

const EditProfileScreen = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isBackModalOpen, setIsBackModalOpen] = useState(false);
    const [isPhotoSheetOpen, setIsPhotoSheetOpen] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        watch,
    } = useForm<EditProfileData>({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: {
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.bio || "",
            about: user?.about || "",
        },
    });

    const [previewImage, setPreviewImage] = useState(user?.icon || "");
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const { mutateAsync: updateImage, isPending: isUpdatingImage } =
        useMutation({
            mutationFn: updateProfileImage,
            onSuccess: () => {
                Alert.alert(
                    "Sucesso",
                    "Imagem de perfil atualizada com sucesso!",
                );
                queryClient.invalidateQueries({
                    queryKey: ["authenticatedUser"],
                });
            },
            onError: (error) => {
                console.error(error);
                Alert.alert(
                    "Erro",
                    "Não foi possível atualizar a imagem de perfil.",
                );
            },
        });

    const { mutate: updateUserProfile, isPending: isUpdatingProfile } =
        useMutation({
            mutationFn: updateProfile,
            onSuccess: () => {
                Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
                queryClient.invalidateQueries({
                    queryKey: ["authenticatedUser"],
                });
                router.back();
            },
            onError: (error) => {
                console.error(error);
                Alert.alert("Erro", "Não foi possível atualizar o perfil.");
            },
        });

    const handleTakePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permissão necessária",
                "Precisamos de permissão para acessar sua câmera.",
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            handleImageSelection(uri);
        }
        setIsPhotoSheetOpen(false);
    };

    const handleChoosePhoto = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permissão necessária",
                "Precisamos de permissão para acessar suas fotos.",
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            handleImageSelection(uri);
        }
        setIsPhotoSheetOpen(false);
    };

    const handleRemovePhoto = () => {
        setPreviewImage("");
        updateImage("");
        setIsPhotoSheetOpen(false);
    };

    const handleImageSelection = async (uri: string) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const sizeInMB = blob.size / (1024 * 1024);

            if (sizeInMB > 5) {
                Alert.alert(
                    "Imagem muito grande",
                    "Escolha uma imagem com até 5MB.",
                );
                return;
            }

            setPreviewImage(uri);
            uploadImage(uri);
        } catch (error) {
            Alert.alert("Erro", "Erro ao verificar o tamanho da imagem.");
            console.error(error);
        }
    };

    const uploadImage = async (uri: string) => {
        setIsUploadingImage(true);
        try {
            const imageUrl = await uploadImageToFirebase({
                uri,
                storage_path: "profile_images/",
            });

            updateImage(imageUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
            Alert.alert("Erro", "Não foi possível fazer upload da imagem.");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleSave = async (data: EditProfileData) => {
        await updateUserProfile({
            name: data.name,
            username: data.username,
            bio: data.bio,
            about: data.about,
        });

        queryClient.invalidateQueries({ queryKey: ["authenticatedUser"] });
    };

    const handleBack = () => {
        if (isDirty) {
            setIsBackModalOpen(true);
        } else {
            router.back();
        }
    };

    return (
        <BaseContainer>
            <VStack flex={1} px="$1">
                <HeaderContainer
                    title="Editar perfil"
                    namebuttontab="Salvar"
                    onSave={() => setIsSaveModalOpen(true)}
                    onBackPress={handleBack}
                    isLoading={isUpdatingProfile}
                />

                <ScrollView
                    style={{ flex: 1, backgroundColor: "white" }}
                    showsVerticalScrollIndicator={false}
                >
                    <VStack alignItems="center" position="relative" mt="$4">
                        <Avatar width={90} height={90}>
                            <AvatarFallbackText fontSize={40}>
                                CF
                            </AvatarFallbackText>
                            <AvatarImage
                                source={{
                                    uri: previewImage,
                                }}
                                alt="Profile"
                            />
                        </Avatar>
                        <Pressable
                            position="absolute"
                            bottom="$1"
                            right="36%"
                            bg="$primaryDefault"
                            borderRadius="$full"
                            p="$2"
                            onPress={() => setIsPhotoSheetOpen(true)}
                            disabled={isUploadingImage}
                        >
                            {isUploadingImage ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Pencil size={16} color="white" />
                            )}
                        </Pressable>
                    </VStack>

                    <VStack space="xl" mt="$5">
                        <FormControl>
                            <FormControlLabel mb={2}>
                                <FormControlLabelText
                                    color="$black"
                                    fontFamily="$novaMedium"
                                    fontSize={18}
                                    fontWeight="bold"
                                >
                                    Nome (Como Você é conhecido)
                                </FormControlLabelText>
                            </FormControlLabel>
                            <FormControlHelper>
                                <FormControlLabelText
                                    color="$gray500"
                                    fontSize={16}
                                >
                                    Será usado nas buscas do perfil profissional
                                    e nos envios
                                </FormControlLabelText>
                            </FormControlHelper>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        size="xl"
                                        mt="$2"
                                        h={55}
                                        borderColor="$gray500"
                                        borderWidth={1}
                                        borderRadius="$xl"
                                        isInvalid={!!errors.name}
                                    >
                                        <InputField
                                            placeholder="Nome..."
                                            fontSize="$xl"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    </Input>
                                )}
                            />
                        </FormControl>

                        <FormControl>
                            <FormControlLabel mb="$2">
                                <FormControlLabelText
                                    color="$black"
                                    fontFamily="$novaMedium"
                                    fontSize={18}
                                    fontWeight="bold"
                                >
                                    Usuário
                                </FormControlLabelText>
                            </FormControlLabel>
                            <Controller
                                control={control}
                                name="username"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        size="xl"
                                        h={55}
                                        borderColor="$gray500"
                                        borderWidth={1}
                                        borderRadius="$xl"
                                        isInvalid={!!errors.username}
                                    >
                                        <InputField
                                            placeholder="@"
                                            fontSize="$xl"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    </Input>
                                )}
                            />
                        </FormControl>

                        <FormControl>
                            <HStack
                                justifyContent="space-between"
                                alignItems="center"
                                mb="$2"
                            >
                                <FormControlLabel w="50%">
                                    <FormControlLabelText
                                        color="$black"
                                        fontFamily="$novaMedium"
                                        fontSize={18}
                                        fontWeight="bold"
                                    >
                                        Bio
                                    </FormControlLabelText>
                                </FormControlLabel>
                                <Text
                                    w="50%"
                                    textAlign="right"
                                    fontSize={17.5}
                                    color="$gray500"
                                >
                                    {watch("bio")?.length || 0}/100
                                </Text>
                            </HStack>
                            <Controller
                                control={control}
                                name="bio"
                                render={({ field: { onChange, value } }) => (
                                    <Textarea
                                        size="xl"
                                        minHeight={100}
                                        borderColor="$gray500"
                                        borderWidth={1}
                                        borderRadius="$xl"
                                        isInvalid={!!errors.bio}
                                        style={{ height: "auto" }}
                                    >
                                        <TextareaInput
                                            placeholder="Bio..."
                                            fontSize="$xl"
                                            value={value}
                                            onChangeText={onChange}
                                            maxLength={100}
                                            multiline
                                            style={{ height: "auto" }}
                                        />
                                    </Textarea>
                                )}
                            />
                        </FormControl>

                        <FormControl>
                            <FormControlLabel mb="$2">
                                <FormControlLabelText
                                    color="$black"
                                    fontFamily="$novaMedium"
                                    fontSize={18}
                                    fontWeight="bold"
                                >
                                    Sobre
                                </FormControlLabelText>
                            </FormControlLabel>
                            <Controller
                                control={control}
                                name="about"
                                render={({ field: { onChange, value } }) => (
                                    <Textarea
                                        size="xl"
                                        minHeight={100}
                                        borderColor="$gray500"
                                        borderWidth={1}
                                        borderRadius="$xl"
                                        isInvalid={!!errors.about}
                                        style={{ height: "auto" }}
                                    >
                                        <TextareaInput
                                            placeholder="Sobre..."
                                            fontSize="$xl"
                                            value={value}
                                            onChangeText={onChange}
                                            maxLength={500}
                                            style={{ height: "auto" }}
                                            multiline
                                        />
                                    </Textarea>
                                )}
                            />
                        </FormControl>

                        <Text fontSize={21} color="$gray900" fontWeight="bold">
                            Informações profissionais
                        </Text>

                        <Box>
                            <Pressable
                                flexDirection="row"
                                justifyContent="space-between"
                                alignItems="center"
                                py="$4"
                                borderBottomWidth={1}
                                borderBottomColor="$gray200"
                                onPress={() => router.push("/categories")}
                            >
                                <Text fontSize={20} color="$gray900">
                                    Categorias
                                </Text>
                                <ChevronRight size={20} color="black" />
                            </Pressable>

                            <Pressable
                                flexDirection="row"
                                justifyContent="space-between"
                                alignItems="center"
                                py="$4"
                                borderBottomWidth={1}
                                borderBottomColor="$gray200"
                                onPress={() => router.push("/interests")}
                            >
                                <Text fontSize={20} color="$gray900">
                                    Interesses
                                </Text>
                                <ChevronRight size={20} color="black" />
                            </Pressable>

                            <Pressable
                                flexDirection="row"
                                justifyContent="space-between"
                                alignItems="center"
                                py="$4"
                                borderBottomWidth={1}
                                borderBottomColor="$gray200"
                                onPress={() => router.push("/social")}
                            >
                                <Text fontSize={20} color="$gray900">
                                    Social
                                </Text>
                                <ChevronRight size={20} color="black" />
                            </Pressable>

                            <Pressable
                                flexDirection="row"
                                justifyContent="space-between"
                                alignItems="center"
                                py="$4"
                                borderBottomWidth={1}
                                borderBottomColor="$gray200"
                                opacity={0.5}
                                disabled={true}
                            >
                                <Text fontSize={20} color="$gray900">
                                    Verificar conta
                                </Text>
                                <ChevronRight size={20} color="black" />
                            </Pressable>
                        </Box>
                    </VStack>
                </ScrollView>

                <ConfirmationModal
                    isOpen={isSaveModalOpen}
                    onClose={() => setIsSaveModalOpen(false)}
                    onConfirm={() => {
                        handleSubmit(handleSave)();
                        setIsSaveModalOpen(false);
                    }}
                    title="Salvar alterações"
                    message="Deseja salvar as alterações feitas no perfil?"
                />

                <ConfirmationModal
                    isOpen={isBackModalOpen}
                    onClose={() => setIsBackModalOpen(false)}
                    onConfirm={() => {
                        router.back();
                        setIsBackModalOpen(false);
                    }}
                    title="Descartar alterações"
                    message="Tem certeza que deseja sair? Todas as alterações não salvas serão perdidas."
                    invert={true}
                />

                <ProfilePhotoSheet
                    isOpen={isPhotoSheetOpen}
                    onClose={() => setIsPhotoSheetOpen(false)}
                    onTakePhoto={handleTakePhoto}
                    onChoosePhoto={handleChoosePhoto}
                    onRemovePhoto={handleRemovePhoto}
                    hasCurrentPhoto={!!previewImage}
                />
            </VStack>
        </BaseContainer>
    );
};

export default EditProfileScreen;
