import { useMutation, useQueryClient } from "@tanstack/react-query";

import { blockUser, unblockUser } from "@/connection/auth/UserConnection";

export const useBlockUser = () => {
    const queryClient = useQueryClient();

    return {
        block: useMutation({
            mutationFn: (blockedId: string) => blockUser(blockedId),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["popularUsers"],
                });
            },
            onError: (error) => {
                console.error(
                    "Erro ao bloquear o usuário:",
                    // @ts-expect-error
                    error.response.data,
                );
            },
        }),
        unblock: useMutation({
            mutationFn: (blockedId: string) => unblockUser(blockedId),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["popularUsers"],
                });
            },
            onError: (error) => {
                console.error(
                    "Erro ao desbloquear o usuário:",
                    // @ts-expect-error
                    error.response.data,
                );
            },
        }),
    };
};
