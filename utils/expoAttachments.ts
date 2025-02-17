import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export const OpenImageSelectorAttachment =
    async (): Promise<ImagePicker.ImagePickerResult | null> => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Desculpe, precisamos da permissão para acessar suas fotos.");
            return null;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "livePhotos", "videos"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        return result;
    };

export const OpenDocumentPickerAttachment =
    async (): Promise<DocumentPicker.DocumentPickerResult> => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: false,
        });

        return result;
    };

export const OpenCameraAttachment =
    async (): Promise<ImagePicker.ImagePickerResult | null> => {
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Permissão para acessar a câmera é necessária!");
            return null;
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

        return result;
    };
