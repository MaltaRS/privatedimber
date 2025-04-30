import React from "react";

import { VStack, HStack, Card, Pressable } from "@/gluestackComponents";

import { SkeletonBox } from "@/components/utils/SkeletonBox";

export const ExploreCardSkeleton = () => {
    return (
        <Pressable w="48.5%" mb="$3">
            <Card
                variant="ghost"
                p="$0"
                bgColor="#fff"
                borderColor="#E5E7EB"
                borderWidth={0.9}
                rounded="$3xl"
            >
                <VStack alignItems="center">
                    <SkeletonBox
                        width={128}
                        height={128}
                        borderRadius={100}
                        marginTop={12}
                    />
                    <SkeletonBox
                        width={24}
                        height={24}
                        borderRadius={100}
                        position="absolute"
                        top={6}
                        right={5}
                    />
                    <VStack w="$full" mt="$2">
                        <VStack w="$full" gap="$1">
                            <HStack
                                w="$full"
                                marginLeft={4}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <SkeletonBox
                                    width={140}
                                    height={30}
                                    borderRadius={4}
                                    mt="$1"
                                />
                            </HStack>
                            <HStack
                                alignItems="center"
                                gap="$1"
                                justifyContent="center"
                            >
                                <SkeletonBox
                                    width={120}
                                    height={16}
                                    borderRadius={4}
                                    mt="$1"
                                />
                            </HStack>
                        </VStack>
                        <HStack
                            mt="$2"
                            alignItems="center"
                            justifyContent="center"
                            maxWidth="100%"
                        >
                            <SkeletonBox
                                width={180}
                                height={40}
                                borderRadius={0}
                                borderBottomLeftRadius={24}
                                borderBottomRightRadius={24}
                            />
                        </HStack>
                    </VStack>
                </VStack>
            </Card>
        </Pressable>
    );
};
