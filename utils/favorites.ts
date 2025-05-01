import { QueryClient } from "@tanstack/react-query";

import { ExploreUser } from "@/connection/explore/ExploreConnection";

import { toast } from "burnt";

import api from "./api";

interface HandleFavoriteParams {
    id: string;
    userUuid?: string;
    isFavorited: boolean;
    queryClient: QueryClient;
    onSuccess?: () => void;
    onError?: () => void;
}

export const handleFavorite = async ({
    id,
    userUuid,
    isFavorited,
    queryClient,
    onSuccess,
    onError,
}: HandleFavoriteParams) => {
    try {
        if (isFavorited) {
            await api.delete(`/user/favorites/${id}`);
        } else {
            await api.post("/user/favorites", {
                userId: id,
            });
        }

        queryClient.setQueryData(["popularUsers"], (prev: any) => {
            if (!prev) return prev;
            return {
                ...prev,
                pages: prev.pages.map((page: any) => ({
                    ...page,
                    popularUsers: page.popularUsers.map((item: ExploreUser) =>
                        String(item.id) === String(id)
                            ? { ...item, isFavorited: !isFavorited }
                            : item,
                    ),
                })),
            };
        });

        queryClient.setQueryData(
            ["userFavorites"],
            (prev: ExploreUser[] | undefined) => {
                if (!prev) return prev;

                if (isFavorited) {
                    return prev.filter(
                        (item) => String(item.id) !== String(id),
                    );
                } else {
                    const newFavorite = queryClient
                        .getQueryData(["popularUsers"])
                        //@ts-ignore
                        ?.pages?.flatMap((page: any) => page.popularUsers)
                        ?.find(
                            (item: ExploreUser) =>
                                String(item.id) === String(id),
                        );

                    if (newFavorite) {
                        return [newFavorite, ...(prev || [])];
                    }
                }
                return prev;
            },
        );

        queryClient.setQueryData(["user", id], (prev: any) => {
            if (!prev) return prev;
            return {
                ...prev,
                isFavorited: !isFavorited,
            };
        });

        if (userUuid) {
            queryClient.setQueryData(["user", userUuid], (prev: any) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    isFavorited: !isFavorited,
                };
            });
        }

        const searchQueries = queryClient.getQueriesData<ExploreUser[]>({
            queryKey: ["search"],
        });
        searchQueries.forEach(([queryKey, data]) => {
            if (!data) return;

            queryClient.setQueryData(
                queryKey,
                data.map((item) =>
                    String(item.id) === String(id)
                        ? { ...item, isFavorited: !isFavorited }
                        : item,
                ),
            );
        });

        onSuccess?.();
    } catch (error) {
        console.error("Erro ao (des)favoritar:", error);
        toast({
            title: "Erro ao processar sua solicitação!",
            haptic: "error",
            duration: 2,
            preset: "error",
            from: "top",
        });
        onError?.();
    }
};
