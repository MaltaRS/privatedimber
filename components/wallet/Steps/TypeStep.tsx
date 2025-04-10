import { Fragment } from "react";

import { TouchableOpacity } from "react-native";

import { Controller, useFormContext } from "react-hook-form";

import { toast } from "burnt";

import {
    Text,
    VStack,
    HStack,
    Radio,
    RadioIndicator,
    RadioGroup,
    InputField,
} from "@/gluestackComponents";

import { CircleIcon } from "lucide-react-native";

import { Colors } from "@/constants/Colors";

import { MaskedInput } from "@/components/ui/MaskedInput";
import { Input } from "@/components/ui/Input";

interface BankData {
    bankName: string;
    agency: string;
    accountNumber: string;
}

export function TypeStep() {
    const { control, setValue, watch } = useFormContext();
    const withdrawalType = watch("withdrawalType");

    const handleTypeSelect = (value: "pix" | "bank") => {
        if (value === "pix") {
            toast({
                title: "O saque via PIX ainda não está disponível. Por favor, utilize a opção de dados bancários.",
                preset: "error",
                haptic: "error",
            });
            return;
        }
        setValue("withdrawalType", value);
    };

    const RadioOption = ({
        label,
        value,
    }: {
        label: string;
        value: "pix" | "bank";
    }) => (
        <TouchableOpacity onPress={() => handleTypeSelect(value)}>
            <HStack
                borderWidth={1}
                borderColor="$gray300"
                p="$5"
                borderRadius="$lg"
                alignItems="center"
                justifyContent="space-between"
                mt="$5"
            >
                <HStack alignItems="center">
                    <Radio value={value}>
                        <RadioIndicator>
                            <CircleIcon
                                size={20}
                                color={Colors.primaryDefault}
                            />
                        </RadioIndicator>
                    </Radio>
                    <Text
                        color="$gray900"
                        bold
                        fontFamily="$novaBody"
                        ml="$3"
                        fontSize="$lg"
                    >
                        {label}
                    </Text>
                </HStack>
            </HStack>
        </TouchableOpacity>
    );

    return (
        <Fragment>
            {!withdrawalType ? (
                <Fragment>
                    <Text fontSize="$md" color="$gray900" mt="$5">
                        Escolha como deseja preencher seus dados.
                    </Text>

                    <RadioGroup>
                        <RadioOption label="Chave Pix" value="pix" />
                        <RadioOption label="Dados Bancários" value="bank" />
                    </RadioGroup>
                </Fragment>
            ) : (
                <Fragment>
                    <Text fontSize="$md" color="$gray900" mt="$5">
                        Preencha seus dados bancários para realizar o saque
                    </Text>

                    <VStack mt="$5">
                        <VStack mt="$5">
                            <Text fontSize={17.5} bold color="$black">
                                Nome do banco
                            </Text>

                            <Controller
                                control={control}
                                name={`bankData.bankName`}
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
                                        <InputField
                                            value={value}
                                            onChangeText={onChange}
                                            placeholder={
                                                "Digite o nome do banco"
                                            }
                                            fontSize={19}
                                        />
                                    </Input>
                                )}
                            />
                        </VStack>

                        <VStack mt="$5">
                            <Text fontSize={17.5} bold color="$black">
                                Agencia
                            </Text>
                            <MaskedInput
                                name={`bankData.agency`}
                                placeholder={"0000"}
                                mask={[/\d/, /\d/, /\d/, /\d/]}
                                keyboardType={"numeric"}
                            />
                        </VStack>

                        <VStack mt="$5">
                            <Text fontSize={17.5} bold color="$black">
                                Numero da conta com digito
                            </Text>
                            <MaskedInput
                                name={`bankData.accountNumber`}
                                placeholder="00000-0"
                                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]}
                                keyboardType={"numeric"}
                            />
                        </VStack>
                    </VStack>
                </Fragment>
            )}
        </Fragment>
    );
}
