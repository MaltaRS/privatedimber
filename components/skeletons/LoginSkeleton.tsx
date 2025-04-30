import { VStack, HStack, ScrollView, Box } from "@/gluestackComponents";

import { SkeletonBox } from "@/components/utils/SkeletonBox";

export const LoginSkeleton = () => {
    return (
        <ScrollView>
            <VStack
                flex={1}
                pt="$8"
                px="$6"
                py="$6"
                justifyContent="space-between"
            >
                <VStack gap="$5" flex={1}>
                    <SkeletonBox width={60} height={40} borderRadius={4} />
                    <SkeletonBox width={200} height={40} borderRadius={4} />

                    <VStack gap="$4">
                        <SkeletonBox width={180} height={24} borderRadius={4} />
                        <SkeletonBox width={300} height={50} borderRadius={8} />
                    </VStack>

                    <SkeletonBox width={300} height={50} borderRadius={8} />

                    <Box alignItems="center">
                        <SkeletonBox width={250} height={24} borderRadius={4} />
                    </Box>

                    <Box flex={1} />
                </VStack>

                <VStack gap="$12" pb="$4" pt="$2">
                    <VStack gap="$8">
                        <HStack
                            alignItems="center"
                            gap="$3"
                            justifyContent="center"
                        >
                            <SkeletonBox
                                width={150}
                                height={1}
                                borderRadius={4}
                            />
                            <SkeletonBox
                                width={40}
                                height={24}
                                borderRadius={4}
                            />
                            <SkeletonBox
                                width={150}
                                height={1}
                                borderRadius={4}
                            />
                        </HStack>

                        <Box alignItems="center">
                            <SkeletonBox
                                width={360}
                                height={50}
                                borderRadius={8}
                            />
                        </Box>
                    </VStack>

                    <VStack gap="$2">
                        <SkeletonBox width={300} height={20} borderRadius={4} />
                        <SkeletonBox width={300} height={20} borderRadius={4} />
                    </VStack>
                </VStack>
            </VStack>
        </ScrollView>
    );
};
