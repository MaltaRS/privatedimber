import { useEffect, useState } from "react";
import { Alert, Button } from "react-native";
import {
    initPaymentSheet,
    presentPaymentSheet,
} from "@stripe/stripe-react-native";

type PaymentSheetProps = {
    clientSecret: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    autoPresent?: boolean;
};

export function PaymentSheetComponent({
    clientSecret,
    onSuccess,
    onError,
    autoPresent = true,
}: PaymentSheetProps) {
    const [sheetReady, setSheetReady] = useState(false);

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

            setSheetReady(true);

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
            Alert.alert("Sucesso", "Pagamento realizado com sucesso!");
            onSuccess?.();
        }
    }

    if (autoPresent) {
        return null;
    }

    return (
        <Button title="Pagar agora" onPress={present} disabled={!sheetReady} />
    );
}
