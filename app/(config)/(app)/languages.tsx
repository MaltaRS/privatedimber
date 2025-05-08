import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLocales } from "expo-localization";

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

// Mapeia o idioma do sistema para os códigos do i18n
const mapLanguageCode = (locale: string | undefined): string => {
  if (!locale) return "en";
  switch (locale) {
    case "pt-BR":
      return "ptBR";
    case "pt-PT":
      return "ptPT";
    case "en":
    case "en-US":
      return "en";
    case "es":
    case "es-ES":
      return "es";
    case "it":
    case "it-IT":
      return "it";
    case "fr":
    case "fr-FR":
      return "fr";
    default:
      return "en";
  }
};

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
  const { t, i18n } = useTranslation();

  const systemLanguageCode = mapLanguageCode(getLocales()[0]?.languageTag);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const lang = i18n.language;
    return mapLanguageCode(lang);
  });

  const languages = [
    { label: t("language.ptBR"), code: "ptBR" },
    { label: t("language.ptPT"), code: "ptPT" },
    { label: t("language.en"), code: "en" },
    { label: t("language.es"), code: "es" },
    { label: t("language.it"), code: "it" },
    { label: t("language.fr"), code: "fr" },
  ];

  const handleToggleSwitch = async () => {
    const newValue = !isSwitchOn;
    setIsSwitchOn(newValue);

    if (newValue) {
      const systemLang = mapLanguageCode(getLocales()[0]?.languageTag);
      await i18n.changeLanguage(systemLang);
      setSelectedLanguage(systemLang);
      toast.show({
        placement: "bottom",
        duration: 1500,
        render: ({ id }) => (
          <Toast nativeID={"toast-" + id} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>{t("language.autoActivatedTitle")}</ToastTitle>
              <ToastDescription>
                {t("language.autoActivatedDescription")}
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
    }
  };

  const handleSelectLanguage = async (code: string) => {
    try {
      await i18n.changeLanguage(code);
      setSelectedLanguage(code);
      setIsSwitchOn(false);
      toast.show({
        placement: "bottom",
        duration: 1500,
        render: ({ id }) => (
          <Toast nativeID={"toast-" + id} action="success" variant="solid">
            <VStack space="xs">
              <ToastTitle>{t("language.changedTitle")}</ToastTitle>
              <ToastDescription>
                {t("language.changedDescription")}
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
    } catch (err) {
      console.error("Erro ao trocar idioma:", err);
    }
  };

  return (
    <BaseContainer backgroundColor="$gray50">
      <VStack gap="$4" flex={1}>
        <HeaderContainer title={t("language.title")} />

        <VStack flex={1}>
          <SwitchOption
            title={t("language.autoTranslate")}
            value={isSwitchOn}
            onToggle={handleToggleSwitch}
            textSize={18}
          />

          <Text mt="$5" fontSize={21} fontFamily="$heading" color="$black">
            {t("language.interfaceLanguage")}
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
              renderItem={({ item }) => (
                <OtherInfoProfile
                  name={item.label}
                  onSelect={() => handleSelectLanguage(item.code)}
                  isSelected={selectedLanguage === item.code}
                  isDisabled={false}
                />
              )}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
            />
          </VStack>
        </VStack>
      </VStack>
    </BaseContainer>
  );
}
