import { useEffect, useRef } from "react";

import { Animated, View } from "react-native";

export const SkeletonBox = ({ width, height, borderRadius }: any) => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
        ).start();
    }, [shimmerAnim]);

    const shimmerTranslate = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width],
    });

    return (
        <View
            style={{
                width,
                height,
                borderRadius,
                backgroundColor: "#E8E8E8",
                overflow: "hidden",
            }}
        >
            <Animated.View
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#F5F5F5",
                    transform: [{ translateX: shimmerTranslate }],
                }}
            />
        </View>
    );
};

// const CardPlaceholder = () => {
// const { primaryColor } = useTheme();
// return (
//     <HStack rounded='$xl' px='$4' py='$2' bgColor={primaryColor}>
//         <VStack w='$full'>
//             <HStack justifyContent='space-between'>
//                 <SkeletonBox width={130} height={20} borderRadius={4} />
//                 <SkeletonBox width={76} height={20} borderRadius={4} />
//             </HStack>
//             <HStack justifyContent='space-between' mt='$2'>
//                 <SkeletonBox width={25} height={18} borderRadius={4} />
//                 <SkeletonBox width={50} height={18} borderRadius={4} />
//             </HStack>
//         </VStack>
//     </HStack>
// );
// };
