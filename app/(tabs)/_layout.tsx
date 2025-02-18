import {
    Tabs,
    TabList,
    TabTrigger,
    TabSlot,
    TabTriggerProps,
} from "expo-router/ui";

import { Box, HStack, Pressable } from "@/gluestackComponents";

import DimberLogoWhite from "@/assets/icons/dimberLogoWhite.svg";

import { useAuth } from "@/Context/AuthProvider";
import { TabButton } from "@/components/tabs/TabButton";
import { useKeyboardVisibility } from "@/hooks/KeyboardVisibilityHook";
import { useRouter } from "expo-router";

export type TabName = "chats" | "explore" | "wallet" | "config";

export type TabProps = {
    name: TabName;
    href: TabTriggerProps["href"];
};

export default function TabLayout() {
    const router = useRouter();

    const { user } = useAuth();

    const isKeyboardVisible = useKeyboardVisibility();

    const tabs: TabProps[] = [
        {
            name: "explore",
            href: "/explore",
        },
        {
            name: "chats",
            href: "/chats?category=",
        },
        {
            name: "chats",
            href: "/",
        },
        {
            name: "wallet",
            href: "/wallet",
        },
        {
            name: "config",
            href: "/config",
        },
    ];

    return (
        <Tabs>
            <TabSlot />
            <TabList asChild>
                <HStack
                    py="$2"
                    px="$8"
                    borderTopStartRadius={16}
                    borderTopEndRadius={16}
                    bg="$white"
                    elevation={12}
                    sx={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    }}
                    alignItems="center"
                    position="relative"
                    display={isKeyboardVisible ? "none" : "flex"}
                >
                    <Box
                        position="absolute"
                        top={0}
                        left="$1/2"
                        transform={[{ translateX: "-6%" }]}
                        elevation={120}
                        bg="$gray200"
                        h={36}
                        w={72}
                        borderBottomLeftRadius="$full"
                        borderBottomRightRadius="$full"
                    />
                    {tabs.map((tab, i) =>
                        i === 2 ? (
                            <Pressable
                                key={i}
                                mt="-$16"
                                bgColor="$primaryDefault"
                                rounded="$full"
                                w={56}
                                h={56}
                                elevation={120}
                                alignItems="center"
                                justifyContent="center"
                                onPress={() => {
                                    router.push("/chats?category=priority");
                                }}
                            >
                                <DimberLogoWhite width={32} height={32} />
                            </Pressable>
                        ) : (
                            <TabTrigger
                                key={i}
                                name={tab.name}
                                href={tab.href}
                                asChild
                            >
                                <TabButton icon={tab.name} user={user} />
                            </TabTrigger>
                        ),
                    )}
                </HStack>
            </TabList>
        </Tabs>
    );
}
