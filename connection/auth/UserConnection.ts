import { User } from "@/Context/AuthProvider";

import api, { setAuthorizationHeader } from "@/utils/api";

export const fetchUser = async (): Promise<User | null> => {
    try {
        await setAuthorizationHeader();
        const response = await api.get<User>("/user");
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        return null;
    }
};
