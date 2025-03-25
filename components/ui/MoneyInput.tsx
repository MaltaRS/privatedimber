import { TouchableOpacity } from "react-native";

import { Controller, useFormContext } from "react-hook-form";

import { Input, InputField, InputSlot, Text } from "@/gluestackComponents";

import { formatCurrency } from "@/utils/formatters";

interface MoneyInputProps {
    name: string;
    onMaxPress?: () => void;
}

export function MoneyInput({ name, onMaxPress }: MoneyInputProps) {
    const { control, setValue, watch } = useFormContext();
    const value = watch(name) || "0,00";

    const handleChange = (text: string) => {
        // Remove todos os caracteres não numéricos
        const numbers = text.replace(/\D/g, "");

        // Converte para número e divide por 100 para obter os centavos
        const amount = Number(numbers) / 100;

        // Formata o valor com 2 casas decimais
        const formattedValue = amount.toFixed(2).replace(".", ",");

        setValue(name, formattedValue);
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <Input
                    size="lg"
                    borderWidth={1}
                    borderColor="#999"
                    paddingVertical={10}
                    borderRadius={10}
                    alignItems="center"
                    height={68}
                    justifyContent="space-between"
                    marginTop={10}
                >
                    <InputField
                        fontSize={19}
                        placeholder="0,00"
                        value={value}
                        onChangeText={handleChange}
                        keyboardType="numeric"
                        maxLength={10}
                    />
                    {onMaxPress && (
                        <InputSlot mr="$4">
                            <TouchableOpacity onPress={onMaxPress}>
                                <Text fontSize={17} color="$primaryDefault">
                                    máx
                                </Text>
                            </TouchableOpacity>
                        </InputSlot>
                    )}
                </Input>
            )}
        />
    );
}
