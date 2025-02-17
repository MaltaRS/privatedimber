import api, { setAuthorizationHeader } from "@/utils/api";

export const RequestPasswordReset = async ({
    email,
    username,
}: {
    email?: string;
    username?: string;
}): Promise<{
    success: boolean;
    email: string | null;
} | null> => {
    try {
        await setAuthorizationHeader();

        const response = await api.post("/user/request-password-reset", {
            ...(email && { email }),
            ...(username && { username }),
        });

        return {
            success: response.status === 201 ? true : false,
            email: response.data.email,
        };
    } catch (error: any) {
        console.error(
            "Erro ao enviar o codigo de verificação:",
            error.response.message,
        );
        return {
            success: false,
            email: null,
        };
    }
};

export const VerifyOtpCode = async ({
    email,
    code,
}: {
    email: string;
    code: string;
}): Promise<{
    success: boolean;
    message: string;
}> => {
    try {
        await setAuthorizationHeader();
        const response = await api.post("/user/verify-reset-code", {
            email,
            code,
        });
        return {
            success: response.status === 201,
            message: response.data.message,
        };
    } catch (error: any) {
        console.error("Erro ao verificar o codigo de verificação:", error);
        return {
            success: false,
            message: error.response.data.message,
        };
    }
};

export const PasswordReset = async ({
    email,
    newPassword,
}: {
    email: string;
    newPassword: string;
}): Promise<{
    success: boolean;
    message: string;
}> => {
    try {
        await setAuthorizationHeader();
        const response = await api.patch("/user/reset-password", {
            email,
            password: newPassword,
        });
        return {
            success: response.status === 201,
            message: response.data.message,
        };
    } catch (error: any) {
        console.error("Erro ao resetar a senha:", error.response.data);
        return {
            success: false,
            message: error.response.data,
        };
    }
};
