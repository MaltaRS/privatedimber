import { Fragment } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { toast } from "burnt";
import { Controller, useFormContext } from "react-hook-form";

import {
    Text,
    VStack,
    HStack,
    Input,
    InputField,
    Box,
    ButtonText,
    Radio,
    RadioIndicator,
    RadioGroup,
    ScrollView,
} from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";
import { Button } from "@/components/ui/Button";
import { CircleIcon } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { useKeyboardVisibility } from "@/hooks/KeyboardVisibilityHook";

interface BankData {
    bankName: string;
    agency: string;
    accountNumber: string;
}

export default function WithdrawTypeScreen() {
    const router = useRouter();
    const { control, setValue, watch } = useFormContext();
    const isKeyboardVisible = useKeyboardVisibility();

    const withdrawalType = watch("withdrawalType");
    const bankData = watch("bankData") as BankData;

    const handleConfirm = () => {
        if (withdrawalType === "pix") {
            toast({
                title: "O saque via PIX ainda não está disponível. Por favor, utilize a opção de dados bancários.",
                preset: "error",
                haptic: "error",
            });
            return;
        }

        router.push("/confirmwithdraw");
    };

    const handleBack = () => {
        if (withdrawalType) {
            setValue("withdrawalType", "bank");
            setValue("pixKey", "");
            setValue("bankData", {
                bankName: "",
                agency: "",
                accountNumber: "",
            });
        } else {
            router.back();
        }
    };

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

    const SelectValueInput = ({
        descriptionInput,
        placeholder,
        field,
    }: {
        descriptionInput: string;
        placeholder: string;
        field: keyof BankData;
    }) => {
        return (
            <VStack mt="$5">
                <Text fontSize={17.5} bold color="$black">
                    {descriptionInput}
                </Text>

                <Controller
                    control={control}
                    name={`bankData.${field}`}
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
                                fontSize={19}
                                placeholder={placeholder}
                                value={value}
                                onChangeText={onChange}
                                keyboardType={
                                    field === "accountNumber"
                                        ? "numeric"
                                        : "default"
                                }
                            />
                        </Input>
                    )}
                />
            </VStack>
        );
    };

    return (
        <BaseContainer>
            <Box flex={1}>
                <HeaderContainer title="Saque" onBackPress={handleBack} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 100,
                    }}
                >
                    {!withdrawalType ? (
                        <Fragment>
                            <Text fontSize="$md" color="$gray900" mt="$5">
                                Escolha como deseja preencher seus dados.
                            </Text>

                            <RadioGroup>
                                <RadioOption label="Chave Pix" value="pix" />
                                <RadioOption
                                    label="Dados Bancários"
                                    value="bank"
                                />
                            </RadioGroup>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Text fontSize="$md" color="$gray900" mt="$5">
                                Preencha seus dados bancários para realizar o
                                saque
                            </Text>

                            <VStack mt="$5">
                                <SelectValueInput
                                    descriptionInput="Nome do banco"
                                    placeholder="Selecionar"
                                    field="bankName"
                                />

                                <SelectValueInput
                                    descriptionInput="Agencia"
                                    placeholder="Insira o numero da agencia"
                                    field="agency"
                                />

                                <SelectValueInput
                                    descriptionInput="Numero da conta com digito"
                                    placeholder="Insira o numero da conta"
                                    field="accountNumber"
                                />
                            </VStack>
                        </Fragment>
                    )}
                </ScrollView>
            </Box>

            {!isKeyboardVisible && (
                <Button
                    onPress={handleConfirm}
                    mb="$4"
                    isDisabled={
                        !bankData?.bankName ||
                        !bankData?.agency ||
                        !bankData?.accountNumber
                    }
                >
                    <ButtonText
                        textAlign="center"
                        fontFamily="$heading"
                        size="xl"
                    >
                        Continuar
                    </ButtonText>
                </Button>
            )}
        </BaseContainer>
    );
}
