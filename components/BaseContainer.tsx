import React, { ReactNode } from "react";

import { StatusBar } from "expo-status-bar";

import { VStack } from "@/gluestackComponents";
import { Colors } from "@/constants/Colors";

type BaseContainerProps = React.ComponentProps<typeof VStack> & {
    children: ReactNode;
    statusBarColor?: string;
    statusBarStyle?: "light" | "dark";
};

export const BaseContainer = ({
    children,
    statusBarColor = Colors.primaryDefault,
    statusBarStyle = "light",
    ...props
}: BaseContainerProps) => {
    return (
        <VStack pt="$10" px="$3" flex={1} bgColor="#fff" zIndex={1} {...props}>
           <StatusBar style="auto" />
            {children}
        </VStack>
    );
};
