import { useState } from "react";

import {
    View,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";

import {
    Text,
    VStack,
    HStack,
    Avatar,
    AvatarImage,
    AvatarFallbackText,
    Spinner,
} from "@/gluestackComponents";

import { FontAwesome } from "@expo/vector-icons";

import { useRouter } from "expo-router";

import { useAuth } from "@/Context/AuthProvider";

import { StatusBar } from "expo-status-bar";

import * as ImagePicker from "expo-image-picker";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadImageToFirebase } from "@/utils/firebaseFunctions";
import { updateProfileImage } from "@/connection/auth/UserConnection";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";
import HeaderConfig from "@/components/HeaderConfig";

export default function EditMyProfileSocialLinks() {
    const { user } = useAuth();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [socialLinks, setSocialLinks] = useState([
        { name: "Facebook", url: "" },
        { name: "Instagram", url: "" },
        { name: "TikTok", url: "" },
        { name: "YouTube", url: "" },
    ]);

    const [newSocial, setNewSocial] = useState("");
    const [previewImage, setPreviewImage] = useState(user?.icon || "");
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    // Mutation for updating profile image
    const { mutate: updateImage, isPending: isUpdatingImage } = useMutation({
        mutationFn: updateProfileImage,
        onSuccess: () => {
            Alert.alert("Sucesso", "Imagem de perfil atualizada com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["authenticatedUser"] });
        },
        onError: (error) => {
            console.error(error);
            Alert.alert(
                "Erro",
                "Não foi possível atualizar a imagem de perfil.",
            );
        },
    });

    // Function to select image from gallery
    const selectImage = async () => {
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
        }
    };

    // Function to upload image to Firebase
    const uploadImage = async (uri: string) => {
        setIsUploadingImage(true);
        try {
            const imageUrl = await uploadImageToFirebase({
                uri,
                storage_path: "profile_images/",
            });

            // Update user profile with new image URL
            updateImage(imageUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
            Alert.alert("Erro", "Não foi possível fazer upload da imagem.");
        } finally {
            setIsUploadingImage(false);
        }
    };

    // Ícones para redes sociais conhecidas
    const socialIcons: { [key: string]: JSX.Element } = {
        Facebook: <FontAwesome name="facebook" size={18} color="#4267B2" />,
        Instagram: <FontAwesome name="instagram" size={18} color="#C13584" />,
        TikTok: <FontAwesome name="music" size={18} color="$gray800" />,
        YouTube: <FontAwesome name="youtube" size={18} color="#FF0000" />,
    };

    // Adicionar uma nova rede social
    const addSocialNetwork = () => {
        if (!newSocial.trim()) {
            Alert.alert("Erro", "Digite o nome da rede social.");
            return;
        }

        if (
            socialLinks.find(
                (s) => s.name.toLowerCase() === newSocial.toLowerCase(),
            )
        ) {
            Alert.alert("Erro", "Essa rede social já foi adicionada.");
            return;
        }

        setSocialLinks([...socialLinks, { name: newSocial, url: "" }]);
        setNewSocial(""); // Limpar o campo de entrada
    };

    // Atualizar o link de uma rede social
    const updateSocialLink = (index: number, newUrl: string) => {
        const updatedLinks = [...socialLinks];
        updatedLinks[index].url = newUrl;
        setSocialLinks(updatedLinks);
    };

    // Remover uma rede social
    const removeSocialLink = (index: number) => {
        const updatedLinks = socialLinks.filter((_, i) => i !== index);
        setSocialLinks(updatedLinks);
    };

    // Função para salvar
    const handleSave = () => {
        console.log("Perfis salvos:", socialLinks);
        Alert.alert("Sucesso", "Suas redes sociais foram atualizadas!");
        router.push("/myprofile");
    };

    return (
        <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
        >
            <BaseContainer>
                <VStack gap="$4">
                    <HeaderContainer
                        title="Editar perfil"
                        namebuttontab="Salvar"
                    />

                    {/* Profile Image Section */}
                    <HeaderConfig
                        title="Foto de perfil"
                        description="Adicione ou altere sua foto de perfil"
                    />

                    <VStack alignItems="center" gap="$2" p="$4">
                        <Avatar size="2xl">
                            <AvatarFallbackText>
                                {user?.name}
                            </AvatarFallbackText>
                            {previewImage && (
                                <AvatarImage
                                    source={{ uri: previewImage }}
                                    alt="Foto de perfil"
                                />
                            )}
                        </Avatar>

                        <TouchableOpacity
                            onPress={selectImage}
                            disabled={isUploadingImage || isUpdatingImage}
                            style={styles.changePhotoButton}
                        >
                            {isUploadingImage || isUpdatingImage ? (
                                <Spinner size="small" color="#FFF" />
                            ) : (
                                <Text style={styles.changePhotoText}>
                                    Alterar foto
                                </Text>
                            )}
                        </TouchableOpacity>
                    </VStack>

                    <HeaderConfig
                        title="Redes sociais"
                        description="Conecte suas redes sociais para aumentar sua visibilidade e facilitar o acesso ao seu conteúdo"
                    />

                    <VStack gap="$4" p="$1">
                        {socialLinks.map((social, index) => (
                            <View key={index} style={styles.inputContainer}>
                                <HStack margin="$1" alignItems="center">
                                    {socialIcons[social.name] || (
                                        <FontAwesome
                                            name="globe"
                                            size={18}
                                            color="#888"
                                        />
                                    )}
                                    <Text style={styles.label}>
                                        {social.name}
                                    </Text>
                                </HStack>
                                <TextInput
                                    style={styles.input}
                                    value={social.url}
                                    onChangeText={(text) =>
                                        updateSocialLink(index, text)
                                    }
                                    placeholder={"Adicione seu link aqui"}
                                />
                                <TouchableOpacity
                                    onPress={() => removeSocialLink(index)}
                                >
                                    <FontAwesome
                                        name="trash"
                                        size={18}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <View style={styles.addContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Adicionar nova rede social..."
                                value={newSocial}
                                onChangeText={setNewSocial}
                            />
                            <TouchableOpacity
                                onPress={addSocialNetwork}
                                style={styles.addButton}
                            >
                                <FontAwesome
                                    name="plus"
                                    size={18}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>
                    </VStack>
                </VStack>
            </BaseContainer>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 15,
        paddingVertical: 6,
    },
    label: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    addContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        padding: 8,
        borderRadius: 8,
    },
    addButton: {
        marginLeft: 10,
        backgroundColor: "#4CAF50",
        padding: 6,
        borderRadius: 5,
    },
    changePhotoButton: {
        backgroundColor: "#4267B2",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        marginTop: 8,
    },
    changePhotoText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
