import { HStack, VStack } from "@/gluestackComponents";

import { SkeletonBox } from "@/components/utils/SkeletonBox";

export const ConversationHeaderSkeleton = () => {
    return (
        <HStack gap="$3" alignItems="center" flex={1}>
            <SkeletonBox width={44} height={44} borderRadius={100} />
            <VStack gap="$1">
                <SkeletonBox width={120} height={20} borderRadius={4} />
                <SkeletonBox width={80} height={16} borderRadius={4} />
            </VStack>
        </HStack>
    );
};
