import { User } from "@/Context/AuthProvider";

import api, { setAuthorizationHeader } from "@/utils/api";

export const fetchUser = async (): Promise<User | null> => {
    try {
        await setAuthorizationHeader();
        const response = await api.get<User>("/user");
        return response.data;
    } catch (error: any) {
        console.error("Erro ao buscar usuário:", error);
        return null;
    }
};
