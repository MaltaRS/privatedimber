import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Colors } from "@/constants/Colors";

type OTPInputProps = {
    code: string;
    setCode: (code: string) => void;
    numDigits: number;
    disabled?: boolean;
};

const OTPInput = ({
    code,
    setCode,
    numDigits = 6,
    disabled = false,
}: OTPInputProps) => {
    const inputsRef = useRef<(TextInput | null)[]>([]);

    const handleChange = async (text: string, index: number) => {
        if (disabled) return;

        if (text.length > 1) {
            const clipboardText = await Clipboard.getStringAsync();
            if (clipboardText && clipboardText.length >= numDigits) {
                const newCode = clipboardText.slice(0, numDigits).toUpperCase();
                setCode(newCode);

                inputsRef.current.forEach((input, idx) => {
                    if (input) {
                        input.setNativeProps({ text: newCode[idx] || "" });
                    }
                });
                return;
            }
        }

        const newCode = code.split("");
        newCode[index] = text[0] || "";
        setCode(newCode.join("").toUpperCase());

        if (text && index < numDigits - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (disabled) return;

        if (e.nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {Array.from({ length: numDigits }).map((_, index) => (
                <TextInput
                    key={`otp-${index}`}
                    style={[styles.input, disabled && styles.disabledInput]}
                    maxLength={numDigits}
                    ref={(el) => (inputsRef.current[index] = el)}
                    value={code[index] || ""}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    textAlign="center"
                    editable={!disabled}
                    selectTextOnFocus={!disabled}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },
    input: {
        width: 45,
        height: 55,
        borderWidth: 1,
        borderColor: Colors.gray400,
        borderRadius: 12,
        marginHorizontal: 5,
        fontSize: 18,
        textAlign: "center",
    },
    disabledInput: {
        backgroundColor: Colors.gray200,
        borderColor: Colors.gray300,
        color: Colors.gray500,
    },
});

export default OTPInput;
