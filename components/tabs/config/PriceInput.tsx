import { Input, InputField, Text } from "@/gluestackComponents";

interface PriceInputProps {
    value: string;
    onChangeText: (value: string) => void;
    placeholder?: string;
}

export function PriceInput({
    value,
    onChangeText,
    placeholder = "0,00",
}: PriceInputProps) {
    const handleChange = (text: string) => {
        const numbers = text.replace(/\D/g, "");

        onChangeText(numbers);
    };

    const displayValue = value
        ? (Number(value) / 100).toFixed(2).replace(".", ",")
        : "";

    return (
        <Input
            py={6}
            h={58}
            mt={10}
            size="lg"
            borderWidth={1}
            borderColor="#999"
            borderRadius={10}
            alignItems="center"
            justifyContent="space-between"
        >
            <InputField
                fontSize={19}
                placeholder={placeholder}
                value={displayValue}
                onChangeText={handleChange}
                keyboardType="numeric"
                maxLength={10}
            />
        </Input>
    );
}
