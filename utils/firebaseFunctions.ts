import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "@/utils/firebaseConfig";

type Attachment = {
    uri: string;
    storage_path: string;
};

export const uploadImageToFirebase = async ({
    uri,
    storage_path,
}: Attachment) => {
    const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            reject(new Error("Erro ao fazer upload da imagem."));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `${storage_path}${filename}`);

    await uploadBytes(storageRef, blob);

    //@ts-ignore
    blob.close();

    return await getDownloadURL(storageRef);
};
