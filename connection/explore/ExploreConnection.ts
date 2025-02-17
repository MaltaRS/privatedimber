import api from "@/utils/api";

type ExploreUser = {
    id: number;
    name: string;
    username: string;
    email: string;
    icon: string;
    isFavorited: boolean;
};

type PopularResponse = {
    popularUsers: ExploreUser[];
    total: number;
    nextPage: number | null;
};

export const GetFavorites = async () => {
    const { data } =
        await api.get<Omit<ExploreUser, "isFavorited">[]>("/user/favorites");
    return data;
};

export const GetMostPopular = async ({
    pageParam,
}: any): Promise<PopularResponse> => {
    const { data } = await api.get<PopularResponse>("/user/popular", {
        params: { offset: pageParam },
    });

    return data;
};
