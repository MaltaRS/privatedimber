import api from "@/utils/api";

export interface ExploreUser {
    id: number;
    uuid: string;
    name: string;
    username: string;
    icon?: string;
    tags?: string[];
    price?: string;
    isChecked?: boolean;
    isFavorited?: boolean;
}

export interface PopularUsersResponse {
    popularUsers: ExploreUser[];
    nextPage: number | null;
}

export const GetFavorites = async () => {
    const { data } =
        await api.get<Omit<ExploreUser, "isFavorited">[]>("/user/favorites");
    return data;
};

export const GetMostPopular = async ({
    pageParam,
}: any): Promise<PopularUsersResponse> => {
    const { data } = await api.get<PopularUsersResponse>("/user/popular", {
        params: { offset: pageParam },
    });

    return data;
};

export const SearchUsers = async (query: string) => {
    if (!query || query.trim() === "") return [];
    const response = await api.get(`/user/search/${query}`);
    return response.data;
};
