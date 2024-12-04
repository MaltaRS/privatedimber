import { Tabs } from "expo-router";

import { Colors } from "@/constants/Colors";

import { Avatar, AvatarFallbackText, AvatarImage } from "@/gluestackComponents";

import { MagnifyingGlass } from "phosphor-react-native";

import ChatIcon from "@/assets/icons/appIcons/chatIcon.svg";
import Connection from "@/assets/icons/appIcons/connection.svg";

import { useAuth } from "@/Context/AuthProvider";

export default function TabLayout() {
    const { user } = useAuth();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primaryDefault,
                tabBarInactiveTintColor: "#6B7280",
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Chats",
                    tabBarIcon: ({ color, focused }) => (
                        <ChatIcon stroke={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color, focused }) => (
                        <MagnifyingGlass
                            size={26}
                            color={color}
                            weight={focused ? "bold" : "regular"}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="chats"
                options={{
                    title: "Chats",
                    tabBarIcon: ({ color, focused }) => (
                        <Connection stroke={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, focused }) => (
                        <Avatar width={28} height={28}>
                            <AvatarFallbackText size="sm" rounded="$lg">
                                {user?.name ?? ""}
                            </AvatarFallbackText>
                            {user?.icon && (
                                <AvatarImage
                                    rounded="$full"
                                    source={{
                                        uri: user.icon,
                                    }}
                                    alt={`Foto de perfil de ${user.name}`}
                                />
                            )}
                        </Avatar>
                    ),
                }}
            />
        </Tabs>
    );
}
