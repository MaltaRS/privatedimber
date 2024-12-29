import { createContext, useContext, useState, useEffect } from "react";

import {
    GoogleSignin,
    statusCodes,
    User as GoogleUser,
    isSuccessResponse,
} from "@react-native-google-signin/google-signin";

import { toast } from "burnt";

import api from "@/utils/api";
import { router } from "expo-router";
import { useAuth } from "./AuthProvider";

type GoogleAuthContextData = {
    user: GoogleUser["user"] | null;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
};

const GoogleAuthContext = createContext<GoogleAuthContextData>(
    {} as GoogleAuthContextData,
);

export const GoogleAuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const {
        user: internalUser,
        signOut: internalSignOut,
        signIn: internalSignIn,
    } = useAuth();

    const [user, setUser] = useState<GoogleUser["user"] | null>(null);

    useEffect(() => {
        const fetchGoogleUser = async () => {
            const googleUser = GoogleSignin.getCurrentUser();
            if (googleUser) {
                setUser(googleUser.user);
            }
        };

        fetchGoogleUser();
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();

            if (isSuccessResponse(response)) {
                const { user, idToken } = response.data;

                try {
                    const loginResponse = await api.post("/auth/token", {
                        email: user.email,
                        providerName: "google",
                        providerToken: idToken,
                    });

                    const { access_token, refresh_token } = loginResponse.data;

                    await internalSignIn(access_token, refresh_token);

                    router.replace("/(tabs)/explore");

                    setUser(user);
                } catch (e) {
                    setUser(user);
                    console.error(e);

                    router.push("/(auth)/signup");
                }
            } else {
                console.log("User cancelled the login flow");
            }
        } catch (error) {
            console.error(error);
            handleSignInError(error);
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
            setUser(null);
        } catch (error) {
            console.error("Error signing out: ", error);
        } finally {
            if (internalUser) {
                await internalSignOut();
            }
        }
    };

    const handleSignInError = (error: any) => {
        if (error.code) {
            switch (error.code) {
                case statusCodes.IN_PROGRESS:
                    toast({
                        title: "Erro",
                        message: "Já existe uma operação em andamento.",
                        duration: 5000,
                        haptic: "error",
                        from: "top",
                        preset: "error",
                    });
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    toast({
                        title: "Erro",
                        message:
                            "Google Play Services não está disponível, tente criar uma conta sem o google.",
                        duration: 5000,
                        haptic: "error",
                        from: "top",
                        preset: "error",
                    });
                    break;
                default:
                    toast({
                        title: "Erro",
                        message: `Um erro inesperado ocorreu. tente novamente mais tarde!, error: ${error}`,
                        duration: 5000,
                        haptic: "error",
                        from: "top",
                        preset: "error",
                    });
                    break;
            }
        } else {
            toast({
                title: "Erro",
                message: `Um erro inesperado ocorreu. tente novamente mais tarde!, error: ${error}`,
                duration: 5000,
                haptic: "error",
                from: "top",
                preset: "error",
            });
        }
    };

    return (
        <GoogleAuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </GoogleAuthContext.Provider>
    );
};

export const useGoogleAuth = () => {
    return useContext(GoogleAuthContext);
};
