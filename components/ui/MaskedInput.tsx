import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/gluestackComponents";
import MaskInput from "react-native-mask-input";

interface MaskedInputProps {
    name: string;
    placeholder: string;
    mask: (string | RegExp)[];
    keyboardType?: "default" | "numeric";
}

export function MaskedInput({
    name,
    placeholder,
    mask,
    keyboardType = "default",
}: MaskedInputProps) {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <Input
                    size="md"
                    borderWidth={1}
                    borderColor="#999"
                    borderRadius={10}
                    height={48}
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop={8}
                >
                    <MaskInput
                        value={value}
                        onChangeText={onChange}
                        mask={mask}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        style={{
                            fontSize: 19,
                            flex: 1,
                            paddingHorizontal: 12,
                        }}
                    />
                </Input>
            )}
        />
    );
}
