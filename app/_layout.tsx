import { useEffect, useState } from "react";


import { Box, GluestackUIProvider, Spinner } from "@/gluestackComponents";

import { useFonts as useFontsExpo } from "expo-font";

import {
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import "react-native-reanimated";
import "react-native-gesture-handler";

import { AuthProvider, useAuth } from "@/Context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "@/Context/SocketProvider";

import { StripeProvider } from "@stripe/stripe-react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider } from "@/Context/GoogleAuthProvider";
import { ChatProvider } from "@/Context/ChatProvider";

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    offlineAccess: true,
    scopes: ["profile", "email"],
});

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
    duration: 500,
    fade: true,
});

const RootLayout = () => {
    const [loaded] = useFonts({
        PlusJakartaSans_400Regular,
        PlusJakartaSans_500Medium,
        PlusJakartaSans_600SemiBold,
        PlusJakartaSans_700Bold,
    });

    const [loadedExpo] = useFontsExpo({
        NovaBold: require("../assets/fonts/static/ProxNova/proxBold.otf"),
        NovaRegular: require("../assets/fonts/static/ProxNova/proxRegular.otf"),
        NovaSemiBold: require("../assets/fonts/static/ProxNova/proxSemiBold.otf"),
        NovaMedium: require("../assets/fonts/static/ProxNova/proxMedium.otf"),
        Arial: require("../assets/fonts/static/Arial/arial.ttf"),
        ArialBold: require("../assets/fonts/static/Arial/arialBold.ttf"),
    });

    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (loaded && !loading && loadedExpo) {
            SplashScreen.hideAsync();
        }
    }, [loaded, loading, loadedExpo]);

    if (!loaded || loading || !loadedExpo) {
        return (
            <GluestackUIProvider>
                <Box
                    flex={1}
                    bg="white"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Spinner size="large" />
                </Box>
            </GluestackUIProvider>
        );
    }

    return (
        <GluestackUIProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: "transparent",
                    },
                    animation: "fade_from_bottom",
                    animationDuration: 400,
                }}
                initialRouteName={isAuthenticated ? "(tabs)" : "(auth)/index"}
            >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(auth)/index" />
                <Stack.Screen name="(auth)/signup" />
                <Stack.Screen name="notifications" />
                <Stack.Screen name="myprofile" />
                <Stack.Screen name="profileusermsg" />
                <Stack.Screen name="editmyprofile" />
                <Stack.Screen name="profileinstituition" />
                <Stack.Screen name="donationinstituition" />
                <Stack.Screen name="listinstituition" />
                <Stack.Screen name="mycarts" />
                <Stack.Screen name="languages" />
                <Stack.Screen name="comprovantpix" />
                <Stack.Screen name="sake" />
                <Stack.Screen name="sharedimber" />
                <Stack.Screen name="editmycarts" />
                <Stack.Screen name="confirmpaymsg" />
                <Stack.Screen name="selectpaytype" />
                <Stack.Screen name="saketype" />

            </Stack>
        </GluestackUIProvider>
    );
};

export default function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SocketProvider>
                <AuthProvider>
                    <GoogleAuthProvider>
                        <StripeProvider
                            publishableKey={
                                process.env.EXPO_PUBLIC_STRIPE_KEY ?? ""
                            }
                        >
                            <ChatProvider>
                                <RootLayout />
                            </ChatProvider>
                        </StripeProvider>
                    </GoogleAuthProvider>
                </AuthProvider>
            </SocketProvider>
        </QueryClientProvider>
    );
}
