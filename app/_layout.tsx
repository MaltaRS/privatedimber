import { useEffect } from "react";

import { Box, GluestackUIProvider, Spinner } from "@/gluestackComponents";

import { useFonts as useFontsExpo } from "expo-font";

import {
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";

import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    useFonts as useFontsInter,
} from "@expo-google-fonts/inter";

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
import { BalanceProvider } from "@/providers/BalanceProvider";

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

    const [loadedInter] = useFontsInter({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
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
        if (loaded && !loading && loadedExpo && loadedInter) {
            SplashScreen.hideAsync();
        }
    }, [loaded, loading, loadedExpo, loadedInter]);

    if (!loaded || loading || !loadedExpo || !loadedInter) {
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

                {/* Auth */}
                <Stack.Screen name="(auth)/index" />
                <Stack.Screen name="(auth)/password" />
                <Stack.Screen name="(auth)/reset-password" />
                <Stack.Screen name="(auth)/signup" />

                {/* Config */}
                {/* Account */}
                <Stack.Screen name="(config)/(account)/accountType" />
                <Stack.Screen name="(config)/(account)/privacy" />
                <Stack.Screen name="(config)/(account)/security" />
                <Stack.Screen name="(config)/(account)/listblockusers" />

                {/* Message */}
                <Stack.Screen name="(config)/(message)/notifications" />
                <Stack.Screen name="(config)/(message)/values" />
                <Stack.Screen name="(config)/(message)/permissions" />
                <Stack.Screen name="(config)/(message)/chatoptions" />

                {/* App */}
                <Stack.Screen name="(config)/(app)/about" />
                <Stack.Screen name="(config)/(app)/invitefriends" />
                <Stack.Screen name="(config)/(app)/terms" />
                <Stack.Screen name="(config)/(app)/privacy" />
                <Stack.Screen name="(config)/(app)/languages" />
                <Stack.Screen name="(config)/(app)/help" />

                {/* Notifications */}
                <Stack.Screen name="notifications" />

                {/* Wallet */}
                <Stack.Screen name="(wallet)/extract" />
                <Stack.Screen name="(wallet)/totalbalance" />
                {/* Donation */}
                <Stack.Screen name="(wallet)/(donation)/list" />
                <Stack.Screen name="(wallet)/(donation)/instituition" />
                <Stack.Screen name="(wallet)/(donation)/profile" />
                {/* card */}
                <Stack.Screen name="(wallet)/(card)/cards" />
                <Stack.Screen name="(wallet)/(card)/newcard" />
                {/* withdraw */}
                <Stack.Screen name="(wallet)/(withdraw)/index" />

                {/* Profile - TODO: Move to (profile) */}
                <Stack.Screen name="myprofile" />
                <Stack.Screen name="profileusermsg" />
                <Stack.Screen name="editmyprofile" />
                {/* <Stack.Screen name="editcategorysmyprofile" />
                <Stack.Screen name="editsocialinfosmyprofile" />
                <Stack.Screen name="editmyinterestsprofile" /> */}
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
                                <BalanceProvider>
                                    <RootLayout />
                                </BalanceProvider>
                            </ChatProvider>
                        </StripeProvider>
                    </GoogleAuthProvider>
                </AuthProvider>
            </SocketProvider>
        </QueryClientProvider>
    );
}
