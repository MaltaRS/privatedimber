import React from "react";

import { HStack, VStack } from "@/gluestackComponents";

import { SkeletonBox } from "@/components/utils/SkeletonBox";

export const ConversationSkeleton = () => {
    return (
        <VStack flex={1} px="$3" py="$4" space="md">
            {Array(3)
                .fill(null)
                .map((_, index) => (
                    <HStack
                        key={index}
                        justifyContent={
                            index % 2 === 0 ? "flex-end" : "flex-start"
                        }
                        space="md"
                    >
                        <VStack maxWidth="80%" space="xs">
                            <SkeletonBox
                                width={Math.random() * 200 + 100}
                                height={40}
                                borderRadius={12}
                            />
                        </VStack>
                    </HStack>
                ))}

            <HStack
                bgColor="$gray100"
                px="$2"
                py="$3"
                zIndex={4}
                justifyContent="space-between"
                alignItems="center"
                borderTopWidth={0.5}
                borderTopColor="$gray300"
                gap="$2"
                position="absolute"
                bottom={0}
                left={0}
                right={0}
            >
                <SkeletonBox width={40} height={40} borderRadius={100} />
                <SkeletonBox width={300} height={40} borderRadius={20} />
            </HStack>
        </VStack>
    );
};
