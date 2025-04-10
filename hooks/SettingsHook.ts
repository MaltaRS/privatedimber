import { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    getUserSettings,
    updateUserSettings,
    UpdateSettingsPayload,
} from "@/connection/settings/SettingsConnection";
import { toast } from "burnt";

export const useSettings = () => {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const { data: settings, isLoading: isLoadingSettings } = useQuery({
        queryKey: ["userSettings"],
        queryFn: getUserSettings,
    });

    const updateSettingsMutation = useMutation({
        mutationFn: (data: UpdateSettingsPayload) => updateUserSettings(data),
        onSuccess: (data) => {
            queryClient.setQueryData(["userSettings"], data);
            toast({
                title: "Configurações atualizadas",
                message: "Suas configurações foram atualizadas com sucesso.",
                haptic: "success",
            });
        },
        onError: (error) => {
            console.error("Erro ao atualizar configurações:", error);
            toast({
                title: "Erro",
                message:
                    "Não foi possível atualizar suas configurações. Tente novamente.",
                haptic: "error",
            });
        },
    });

    const updateSettings = async (data: UpdateSettingsPayload) => {
        setIsLoading(true);
        try {
            await updateSettingsMutation.mutateAsync(data);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        settings,
        isLoading: isLoading || isLoadingSettings,
        updateSettings,
    };
};
