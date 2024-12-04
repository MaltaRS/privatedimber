import { MMKV } from "react-native-mmkv";

export class SecureStoreEncrypted {
    private static storage = new MMKV({
        id: "secure_encrypted_storage",
        encryptionKey: process.env.SECURE_STORAGE_KEY || "",
    });

    static saveItem(key: string, value: string): void {
        try {
            this.storage.set(key, value);
        } catch (error) {
            console.error(
                `Erro ao salvar ${key} no MMKV (criptografado):`,
                error,
            );
        }
    }

    static getItem(key: string): string | null {
        try {
            return this.storage.getString(key) || null;
        } catch (error) {
            console.error(
                `Erro ao obter ${key} do MMKV (criptografado):`,
                error,
            );
            return null;
        }
    }

    static deleteItem(key: string): void {
        try {
            this.storage.delete(key);
        } catch (error) {
            console.error(
                `Erro ao deletar ${key} do MMKV (criptografado):`,
                error,
            );
        }
    }
}

export class SecureStoreUnencrypted {
    private static storage = new MMKV();

    static saveItem(key: string, value: string): void {
        try {
            this.storage.set(key, value);
        } catch (error) {
            console.error(
                `Erro ao salvar ${key} no MMKV (não criptografado):`,
                error,
            );
        }
    }

    static getItem(key: string): string | null {
        try {
            return this.storage.getString(key) || null;
        } catch (error) {
            console.error(
                `Erro ao obter ${key} do MMKV (não criptografado):`,
                error,
            );
            return null;
        }
    }

    static deleteItem(key: string): void {
        try {
            this.storage.delete(key);
        } catch (error) {
            console.error(
                `Erro ao deletar ${key} do MMKV (não criptografado):`,
                error,
            );
        }
    }
}
