import api, { setAuthorizationHeader } from "@/utils/api";

export const CreatePendingUser = async (
    email: string,
): Promise<boolean | null> => {
    try {
        await setAuthorizationHeader();
        const response = await api.post("/pending-user", {
            email,
        });
        return response.status === 201 ? true : false;
    } catch (error: any) {
        console.error(
            "Erro ao enviar o codigo de verificação:",
            error.response.message,
        );
        return null;
    }
};

export const CancelPendingUser = async (
    email: string,
): Promise<boolean | null> => {
    try {
        await setAuthorizationHeader();
        const response = await api.delete("/pending-user", {
            data: {
                email,
            },
        });
        return response.status > 200 && response.status < 300 ? true : false;
    } catch (error: any) {
        console.error("Erro ao cancelar o cadastro:", error.response.message);
        return null;
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
        const response = await api.patch("/pending-user/verify", {
            email,
            code,
        });
        return {
            success: response.status === 200,
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
