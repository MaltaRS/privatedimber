import { useState } from "react";

import {
    VStack,
    HStack,
    Text,
    Switch,
    Heading,
    Pressable,
    Icon,
} from "@/gluestackComponents";

import { Check } from "lucide-react-native";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";
import Row from "@/components/Row";

const OtherInfoProfile = ({
    name,
    onSelect,
    isSelected,
}: {
    name: string;
    onSelect: (name: string) => void;
    isSelected: boolean;
}) => (
    <Pressable onPress={() => onSelect(name)}>
        <VStack px="$4">
            <HStack justifyContent="space-between" alignItems="center" py="$3">
                <Text fontSize={15} fontWeight={isSelected ? "bold" : "normal"}>
                    {name}
                </Text>
                {isSelected && <Icon as={Check} size="md" color="#007BFF" />}
            </HStack>
        </VStack>
    </Pressable>
);

const SwitchOption = ({
    title,
    value,
    onToggle,
}: {
    title: string;
    value: boolean;
    onToggle: () => void;
}) => (
    <VStack>
        <HStack
            justifyContent="space-between"
            alignItems="center"
            px="$4"
            py="$3"
        >
            <Text fontSize={17}>{title}</Text>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: "#ccc", true: "#007BFF" }}
                thumbColor={value ? "#fff" : "#f4f4f4"}
            />
        </HStack>
        <Row />
    </VStack>
);

export default function IdiomScreen() {
    const [isSwitchOn, setIsSwitchOn] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
        null,
    );

    const handleToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        if (!isSwitchOn) {
            setSelectedLanguage(null);
        }
    };

    const handleSelectLanguage = (language: string) => {
        setSelectedLanguage(language);
        setIsSwitchOn(false);
    };

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title="Idiomas" />

                <SwitchOption
                    title="Traduzir automaticamente"
                    value={isSwitchOn}
                    onToggle={handleToggleSwitch}
                />

                <Heading py="$4" fontSize={19}>
                    Idioma de Interface
                </Heading>

                <VStack
                    bgColor="#fff"
                    px="$4"
                    py="$4"
                    borderRadius="$xl"
                    elevation={2}
                    gap="$2"
                >
                    {[
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
                    ].map((language) => (
                        <OtherInfoProfile
                            key={language}
                            name={language}
                            onSelect={handleSelectLanguage}
                            isSelected={selectedLanguage === language}
                        />
                    ))}
                </VStack>
            </VStack>
        </BaseContainer>
    );
}
