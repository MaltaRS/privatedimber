import { useQuery } from "@tanstack/react-query";
import { getBlockedUsers } from "../connection/auth/UserConnection";

export const useBlockedUsers = () => {
    return useQuery({
        queryKey: ["blockedUsers"],
        queryFn: getBlockedUsers,
    });
};
