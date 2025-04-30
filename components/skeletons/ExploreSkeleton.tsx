import { VStack, HStack, ScrollView, Box } from "@/gluestackComponents";

import { SkeletonBox } from "@/components/utils/SkeletonBox";

import { ExploreCardSkeleton } from "@/components/tabs/explore/ExploreCardSkeleton";
import { FavoriteCardSkeleton } from "@/components/tabs/explore/FavoriteCardSkeleton";

export const ExploreSkeleton = () => {
    return (
        <VStack flex={1} gap="$2" px="$4">
            <HStack justifyContent="space-between" alignItems="center" py="$2">
                <SkeletonBox width={140} height={40} borderRadius={4} />
                <SkeletonBox width={40} height={40} borderRadius={20} />
            </HStack>

            <Box alignItems="center" justifyContent="center">
                <SkeletonBox
                    width={300}
                    height={50}
                    borderRadius={30}
                    borderColor="$gray300"
                />
            </Box>

            <HStack gap="$2" py="$2">
                {Array(4)
                    .fill(null)
                    .map((_, index) => (
                        <SkeletonBox
                            key={index}
                            width={100}
                            height={40}
                            borderRadius={20}
                        />
                    ))}
            </HStack>

            <VStack gap="$2">
                <SkeletonBox width={120} height={24} borderRadius={4} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <HStack gap="$4">
                        {Array(4)
                            .fill(null)
                            .map((_, index) => (
                                <FavoriteCardSkeleton key={index} />
                            ))}
                    </HStack>
                </ScrollView>
            </VStack>

            <VStack gap="$2" flex={1}>
                <SkeletonBox width={150} height={24} borderRadius={4} />
                <HStack flexWrap="wrap" justifyContent="space-between">
                    {Array(6)
                        .fill(null)
                        .map((_, index) => (
                            <ExploreCardSkeleton key={index} />
                        ))}
                </HStack>
            </VStack>
        </VStack>
    );
};
