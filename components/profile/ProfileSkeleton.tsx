import React from "react";

import { VStack, HStack, Box } from "@/gluestackComponents";

import { SkeletonBox } from "@/components/utils/SkeletonBox";

export const ProfileSkeleton = () => {
    return (
        <VStack width={360} gap="$4">
            <HStack
                width="100%"
                alignItems="flex-start"
                justifyContent="space-between"
            >
                <SkeletonBox width={82} height={82} borderRadius={100} />

                <HStack space="md">
                    <SkeletonBox width={60} height={60} borderRadius={100} />
                    <SkeletonBox width={60} height={60} borderRadius={100} />
                </HStack>
            </HStack>

            <VStack gap="$2">
                <HStack alignItems="center" space="sm">
                    <SkeletonBox width={200} height={28} borderRadius={4} />
                </HStack>

                <HStack alignItems="center" space="sm">
                    <SkeletonBox width={150} height={20} borderRadius={4} />
                    <SkeletonBox width={4} height={4} borderRadius={100} />
                    <SkeletonBox width={120} height={20} borderRadius={4} />
                </HStack>

                <SkeletonBox width={280} height={48} borderRadius={4} />
            </VStack>

            <HStack bg="$gray100" borderRadius="$full" p="$2">
                <HStack width="100%" justifyContent="space-around">
                    <SkeletonBox width={120} height={32} borderRadius={100} />
                    <SkeletonBox width={120} height={32} borderRadius={100} />
                </HStack>
            </HStack>

            <VStack gap="$4">
                <SkeletonBox width={120} height={24} borderRadius={4} />
                <SkeletonBox width={360} height={100} borderRadius={4} />

                <VStack gap="$2">
                    <SkeletonBox width={150} height={24} borderRadius={4} />
                    <HStack flexWrap="wrap" gap="$2">
                        {[1, 2, 3].map((i) => (
                            <SkeletonBox
                                key={i}
                                width={100}
                                height={32}
                                borderRadius={100}
                            />
                        ))}
                    </HStack>
                </VStack>

                <VStack gap="$2">
                    <SkeletonBox width={150} height={24} borderRadius={4} />
                    <HStack flexWrap="wrap" gap="$2">
                        {[1, 2, 3].map((i) => (
                            <SkeletonBox
                                key={i}
                                width={100}
                                height={32}
                                borderRadius={100}
                            />
                        ))}
                    </HStack>
                </VStack>

                <VStack gap="$2">
                    <SkeletonBox width={150} height={24} borderRadius={4} />
                    <HStack flexWrap="wrap" gap="$2">
                        {[1, 2].map((i) => (
                            <SkeletonBox
                                key={i}
                                width={48}
                                height={48}
                                borderRadius={8}
                            />
                        ))}
                    </HStack>
                </VStack>
            </VStack>

            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="$white"
                width="100%"
                borderTopColor="$gray200"
                p="$4"
            >
                <SkeletonBox width={360} height={56} borderRadius={100} />
            </Box>
        </VStack>
    );
};
