import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { VStack, HStack, Text, Switch, Heading, Pressable, Icon } from "@/gluestackComponents";
import { Check } from "lucide-react-native"; // Ícone de verificação

import { BaseContainer } from '@/components/BaseContainer';
import HeaderContainer from '../components/HeaderContainer';
import Row from '../components/Row';

const OtherInfoProfile = ({ name, onSelect, isSelected }) => (
    <Pressable onPress={() => onSelect(name)}>
        <VStack px="$4" >
            <HStack justifyContent="space-between" alignItems="center" py="$3">
                <Text fontSize={15} fontWeight={isSelected ? "bold" : "normal"}>
                    {name}
                </Text>
                {isSelected && (
                    <Icon as={Check} size="md" color="#007BFF" /> // Ícone azul de seleção
                )}
            </HStack>
        </VStack>
    </Pressable>
);

const SwitchOption = ({ title, value, onToggle }) => (
    <VStack>
        <HStack justifyContent="space-between" alignItems="center" px="$4" py="$3">
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
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const handleToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        if (!isSwitchOn) {
            setSelectedLanguage(null); // Desseleciona o idioma ao ativar o switch
        }
    };

    const handleSelectLanguage = (language) => {
        setSelectedLanguage(language);
        setIsSwitchOn(false); // Desliga o switch ao selecionar um idioma
    };

    return (
        <BaseContainer>
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

                <VStack bgColor="#fff" px="$4" py="$4" borderRadius="$xl" elevation={2} gap="$2">
                    {[
                        "Português (Brasil)", "English", "Arabic", "Belarusian",
                        "Catalan", "Croatian", "Czech", "Dutch", "Finnish",
                        "French", "German"
                    ].map((language) => (
                        <OtherInfoProfile
                            key={language}
                            name={language}
                            onSelect={handleSelectLanguage}
                            isSelected={selectedLanguage === language}
                        />
                    ))}
                </VStack>

                <StatusBar style="auto" />
            </VStack>
        </BaseContainer>
    );
}
