import { useEffect, useRef } from "react";

import { Animated, View } from "react-native";

export const SkeletonBox = ({ width, height, borderRadius, ...props }: any) => {
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
                ...props,
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
