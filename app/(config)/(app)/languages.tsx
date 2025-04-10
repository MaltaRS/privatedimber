import { useState } from "react";

import {
    VStack,
    HStack,
    Text,
    Switch,
    Pressable,
    Icon,
    FlatList,
    useToast,
    Toast,
    ToastTitle,
    ToastDescription,
} from "@/gluestackComponents";

import { Check } from "lucide-react-native";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";
import Row from "@/components/Row";

const OtherInfoProfile = ({
    name,
    onSelect,
    isSelected,
    isDisabled,
}: {
    name: string;
    onSelect: (name: string) => void;
    isSelected: boolean;
    isDisabled?: boolean;
}) => (
    <Pressable onPress={() => onSelect(name)} opacity={isDisabled ? 0.9 : 1}>
        <VStack px="$1">
            <HStack justifyContent="space-between" alignItems="center" py="$3">
                <Text
                    fontSize={19}
                    fontWeight={isSelected ? "bold" : "normal"}
                    color={isDisabled ? "$gray400" : "$black"}
                >
                    {name}
                </Text>
                {isSelected && <Icon as={Check} size="xl" color="#007BFF" />}
            </HStack>
        </VStack>
    </Pressable>
);

const SwitchOption = ({
    title,
    value,
    onToggle,
    textSize,
    disabled,
}: {
    title: string;
    value: boolean;
    onToggle: () => void;
    textSize?: number;
    disabled?: boolean;
}) => (
    <VStack>
        <HStack
            justifyContent="space-between"
            alignItems="center"
            mt="$1"
            px="$1"
            pt="$3"
        >
            <Text fontSize={textSize || 17} color="$black">
                {title}
            </Text>
            <Switch
                disabled={disabled}
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: "#ccc", true: "$primaryDefault" }}
                thumbColor={value ? "#fff" : "#f4f4f4"}
            />
        </HStack>
        <Row />
    </VStack>
);

export default function IdiomScreen() {
    const toast = useToast();
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [selectedLanguage, setSelectedLanguage] =
        useState<string>("Português (Brasil)");

    const languages = [
        "Português (Brasil)",
        "English",
        "Arabic",
        "Belarusian",
        "Catalan",
        "Croatian",
        "Czech",
        "Dutch",
        "Finnish",
        "French",
        "German",
    ];

    const handleToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        if (!isSwitchOn) {
            setSelectedLanguage("Português (Brasil)");
        }
    };

    const handleSelectLanguage = (language: string) => {
        if (language !== "Português (Brasil)") {
            toast.show({
                placement: "bottom",
                duration: 2500,
                render: ({ id }) => {
                    const toastId = "toast-" + id;
                    return (
                        <Toast
                            nativeID={toastId}
                            action="warning"
                            variant="accent"
                        >
                            <VStack space="xs">
                                <ToastTitle>Atenção</ToastTitle>
                                <ToastDescription>
                                    Este idioma ainda não está disponível.
                                </ToastDescription>
                            </VStack>
                        </Toast>
                    );
                },
            });
            return;
        }
        setSelectedLanguage(language);
        setIsSwitchOn(false);
    };

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4" flex={1}>
                <HeaderContainer title="Idiomas" />

                <VStack flex={1}>
                    <SwitchOption
                        title="Traduzir automaticamente"
                        value={isSwitchOn}
                        onToggle={handleToggleSwitch}
                        textSize={18}
                        disabled={true}
                    />

                    <Text
                        mt="$5"
                        fontSize={21}
                        fontFamily="$heading"
                        color="$black"
                    >
                        Idioma da Interface
                    </Text>

                    <VStack
                        bgColor="#fff"
                        px="$4"
                        borderRadius="$xl"
                        elevation={2}
                        my="$3"
                        flex={1}
                    >
                        <FlatList
                            data={languages}
                            renderItem={({ item }: { item: any }) => (
                                <OtherInfoProfile
                                    name={item}
                                    onSelect={handleSelectLanguage}
                                    isSelected={selectedLanguage === item}
                                    isDisabled={item !== "Português (Brasil)"}
                                />
                            )}
                            keyExtractor={(item: any) => item}
                            showsVerticalScrollIndicator={false}
                        />
                    </VStack>
                </VStack>
            </VStack>
        </BaseContainer>
    );
}
