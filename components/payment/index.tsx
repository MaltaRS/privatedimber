import { useEffect } from "react";

import { Alert } from "react-native";

import {
    initPaymentSheet,
    presentPaymentSheet,
} from "@stripe/stripe-react-native";

type PaymentSheetProps = {
    clientSecret: string;
    onSuccess?: () => Promise<void>;
    onError?: (error: Error) => void;
    autoPresent?: boolean;
};

export function PaymentSheetComponent({
    clientSecret,
    onSuccess,
    onError,
    autoPresent = true,
}: PaymentSheetProps) {
    useEffect(() => {
        if (!clientSecret) {
            Alert.alert("Erro", "Client secret não foi fornecido");
            return;
        }

        async function initializeSheet() {
            const { error } = await initPaymentSheet({
                paymentIntentClientSecret: clientSecret,
                merchantDisplayName: "Dimber",
                allowsDelayedPaymentMethods: true,
                allowsRemovalOfLastSavedPaymentMethod: true,
                style: "automatic",
                googlePay: {
                    merchantCountryCode: "BR",
                },
                applePay: {
                    merchantCountryCode: "BR",
                },
            });

            if (error) {
                console.error("Erro ao inicializar PaymentSheet:", error);
                onError?.(new Error(error.message));
                return;
            }

            if (autoPresent) {
                present();
            }
        }

        initializeSheet();
    }, [clientSecret]);

    async function present() {
        const { error } = await presentPaymentSheet();

        if (error) {
            onError?.(new Error(error.message));
        } else {
            console.log("Pagamento realizado com sucesso");

            await onSuccess?.();
        }
    }

    return null;
}
