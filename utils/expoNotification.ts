import * as Notifications from "expo-notifications";

import * as Device from "expo-device";

import { useEffect, useState } from "react";

export const useExpoPushToken = () => {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

    useEffect(() => {
        const registerToken = async () => {
            if (Device.isDevice) {
                const { status: existingStatus } =
                    await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== "granted") {
                    const { status } =
                        await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }
                if (finalStatus !== "granted") return;
                const token = (await Notifications.getExpoPushTokenAsync())
                    .data;
                setExpoPushToken(token);
            }
        };
        registerToken();
    }, []);

    return expoPushToken;
};
