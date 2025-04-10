import { View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
    Text,
    Heading,
    VStack,
    HStack,
    Input,
    InputField,
} from "@/gluestackComponents";

type ValueInputProps = {
    title: string;
    description: string;
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
    isPercentage?: boolean;
};

export const ValueInput = ({
    title,
    description,
    placeholder,
    value,
    onChangeText,
    isPercentage = false,
}: ValueInputProps) => {
    const formatValue = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, "");

        if (isPercentage) {
            return numericValue ? `${numericValue}%` : "";
        } else {
            const number = parseInt(numericValue) / 100;
            return number ? `R$ ${number.toFixed(2)}` : "";
        }
    };

    const handleChangeText = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, "");
        onChangeText(numericValue);
    };

    return (
        <View>
            <VStack marginTop={20}>
                <Heading>{title}</Heading>
                <Text fontSize={15} color="#374151">
                    {description}
                </Text>
            </VStack>

            <HStack
                style={{
                    width: "100%",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#999",
                    paddingTop: 6,
                    paddingBottom: 6,
                    borderRadius: 10,
                    marginTop: 12,
                }}
            >
                <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                >
                    <VStack
                        style={{
                            width: "90%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Input borderColor="#fff" size="lg">
                            <InputField
                                fontSize={15}
                                placeholder={placeholder}
                                value={formatValue(value)}
                                onChangeText={handleChangeText}
                                keyboardType="numeric"
                            />
                        </Input>
                    </VStack>
                    <AntDesign name="down" size={17} color="black" />
                </HStack>
            </HStack>
        </View>
    );
};
