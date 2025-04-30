import React from "react";

import { HStack, VStack, Pressable } from "@/gluestackComponents";

import { SkeletonBox } from "@/components/utils/SkeletonBox";

export const ChatCardSkeleton = () => {
    return (
        <Pressable
            onLongPress={() => {}}
            bg="$white"
            p="$4"
            borderBottomWidth={1}
            borderBottomColor="$gray200"
        >
            <HStack space="md" alignItems="center">
                <SkeletonBox width={48} height={48} borderRadius={100} />
                <VStack flex={1} space="xs">
                    <HStack space="sm" alignItems="center">
                        <SkeletonBox width={120} height={20} borderRadius={4} />
                    </HStack>
                    <SkeletonBox width={200} height={16} borderRadius={4} />
                </VStack>
                <VStack alignItems="flex-end" space="xs">
                    <SkeletonBox width={40} height={16} borderRadius={4} />
                </VStack>
            </HStack>
        </Pressable>
    );
};
