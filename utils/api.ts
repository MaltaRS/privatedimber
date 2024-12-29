import axios from "axios";
import { SecureStoreEncrypted } from "./SecureStorage";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            error.config &&
            !error.config.__isRetryRequest
        ) {
            error.config.__isRetryRequest = true;

            try {
                const refreshToken =
                    SecureStoreEncrypted.getItem("refreshToken");
                if (refreshToken) {
                    const response = await api.post("/auth/refresh-token", {
                        refreshToken: refreshToken,
                    });
                    const newAccessToken = response.data.access_token;

                    SecureStoreEncrypted.saveItem(
                        "accessToken",
                        newAccessToken,
                    );

                    api.defaults.headers.common["Authorization"] =
                        `Bearer ${newAccessToken}`;
                    error.config.headers["Authorization"] =
                        `Bearer ${newAccessToken}`;

                    return api(error.config);
                }
            } catch (refreshError) {
                SecureStoreEncrypted.deleteItem("accessToken");
                SecureStoreEncrypted.deleteItem("refreshToken");

                console.error("Erro ao tentar renovar o token:", refreshError);
                return Promise.reject(refreshError);
            }
        }

        console.error("Erro na requisição:", error);
        return Promise.reject(error);
    },
);

export const setAuthorizationHeader = async () => {
    if (!api.defaults.headers.common["Authorization"]) {
        const token = SecureStoreEncrypted.getItem("accessToken");
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }
};

export const removeAuthorizationHeader = () => {
    delete api.defaults.headers.common["Authorization"];
};

setAuthorizationHeader();

export default api;
