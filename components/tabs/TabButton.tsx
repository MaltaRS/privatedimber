import { forwardRef } from "react";

import { Pressable } from "react-native";

import { TabTriggerSlotProps } from "expo-router/ui";
import { User } from "@/Context/AuthProvider";

import { Box } from "@/gluestackComponents";

import Chat from "@/assets/icons/appIcons/chats.svg";
import Wallet from "@/assets/icons/appIcons/wallet.svg";
import Config from "@/assets/icons/appIcons/config.svg";
import Home from "@/assets/icons/appIcons/home.svg";

import { Colors } from "@/constants/Colors";

import { TabName } from "@/app/(tabs)/_layout";

export type TabButtonProps = TabTriggerSlotProps & {
    icon?: TabName;
    user: User | null | undefined;
};

export const TabButton = forwardRef(
    (
        {
            user,
            icon = "explore",
            children,
            isFocused,
            ...props
        }: TabButtonProps,
        ref,
    ) => {
        const icons = {
            explore: (
                <Home
                    width={24}
                    height={24}
                    fill={isFocused ? Colors.primaryDefault : "#A9B1BD"}
                />
            ),
            chats: (
                <Chat
                    width={24}
                    height={24}
                    stroke={isFocused ? Colors.primaryDefault : "#A9B1BD"}
                />
            ),
            wallet: (
                <Wallet
                    width={24}
                    height={24}
                    stroke={isFocused ? Colors.primaryDefault : "#A9B1BD"}
                />
            ),
            config: (
                <Config
                    width={24}
                    height={24}
                    stroke={isFocused ? Colors.primaryDefault : "#A9B1BD"}
                />
            ),
        };

        return (
            <Pressable {...props}>
                <Box alignItems="center" p="$2">
                    {icons[icon] || null}
                    {isFocused && (
                        <Box
                            bg={Colors.primaryDefault}
                            width={5}
                            height={5}
                            borderRadius={3}
                            mt="$1"
                        />
                    )}
                </Box>
            </Pressable>
        );
    },
);

TabButton.displayName = "TabButton";
