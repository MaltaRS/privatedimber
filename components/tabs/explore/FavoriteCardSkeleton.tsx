import React from "react";

import { VStack } from "@/gluestackComponents";

import { SkeletonBox } from "@/components/utils/SkeletonBox";

export const FavoriteCardSkeleton = () => {
    return (
        <VStack width={76} height={100} alignItems="center">
            <SkeletonBox width={70} height={70} borderRadius={100} />
            <SkeletonBox
                width={65}
                height={20}
                borderRadius={4}
                marginTop={4}
            />
        </VStack>
    );
};
