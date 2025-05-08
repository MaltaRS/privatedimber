import { View, Image, Share, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";
import {
    Text,
    Heading,
    VStack,
    HStack,
    ScrollView,
    ButtonText,
    Pressable,
} from "@/gluestackComponents";
import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import iconqrcode from "@/assets/images/iconqrcode.png";
import icongift from "@/assets/images/icongift.png";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";

export default function SharedDimberScreen() {
    const { t } = useTranslation();
    const codigoIndicacao = "979848389";
    const router = useRouter();

    const copiarCodigo = async () => {
        await Clipboard.setStringAsync(codigoIndicacao);
        Alert.alert(t("invite.copiedTitle"), t("invite.copiedMessage"));
    };

    const compartilharCodigo = async () => {
        try {
            await Share.share({
                message: `Use my referral code to get benefits: https://dimber.io/${codigoIndicacao}`,
            });
        } catch (error) {
            console.error("Erro ao compartilhar:", error);
        }
    };

    const CodigVerific = () => (
        <View
            style={{
                marginTop: 20,
                padding: 16,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                backgroundColor: "#f3f4f6",
                width: "95%",
            }}
        >
            <Text style={{ fontSize: 15 }}>{t("invite.codeLabel")}</Text>
            <HStack
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 5,
                }}
            >
                <Text bold fontSize={21}>
                    {codigoIndicacao}
                </Text>
                <Pressable onPress={copiarCodigo}>
                    <MaterialIcons
                        name="content-copy"
                        size={20}
                        color="#00A8FF"
                        style={{ marginLeft: 15 }}
                    />
                </Pressable>
            </HStack>
        </View>
    );

    const ContainerGiftTitle = () => (
        <VStack alignItems="center" justifyContent="center" mt={10} width="100%">
            <Image
                style={{ width: 100, height: 122, marginTop: 24 }}
                source={icongift}
            />
            <Heading fontSize={21} mt={18} textAlign="center">
                {t("invite.title")}
            </Heading>
            <Text fontSize={17} mt={10} textAlign="center">
                {t("invite.description")}
            </Text>
            <CodigVerific />
        </VStack>
    );

    const ContainerQRcode = () => (
        <VStack alignItems="center" justifyContent="center" mt={40} width="100%">
            <Text size="xl">{t("invite.qrTitle")}</Text>
            <Image
                style={{ width: 120, height: 120, margin: 20 }}
                source={iconqrcode}
            />
            <HStack alignItems="center" justifyContent="center">
                <Pressable onPress={compartilharCodigo}>
                    <Text
                        bold
                        size="sm"
                        mb={6}
                        style={{ color: "#00A8FF", marginLeft: 6 }}
                    >
                        {t("invite.saveQR")}
                    </Text>
                </Pressable>
                <MaterialIcons
                    name="share"
                    size={20}
                    color="#00A8FF"
                    style={{ marginLeft: 8 }}
                />
            </HStack>
            <VStack alignItems="center" justifyContent="center">
                <Text fontSize={15} bold mt={16}>
                    {t("invite.haveQuestions")}
                </Text>
            </VStack>
            <HStack alignItems="center" justifyContent="center" mt={8}>
                <Text size="sm">{t("invite.clickToRead")}</Text>
                <Pressable onPress={() => router.push("/(config)/(app)/terms")}>
                    <Text size="sm" style={{ color: "#00A8FF", marginLeft: 6 }}>
                        {t("invite.termsLink")}
                    </Text>
                </Pressable>
            </HStack>
        </VStack>
    );

    return (
        <BaseContainer>
            <VStack flex={1}>
                <HeaderContainer title={t("invite.header")} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <VStack flex={1} justifyContent="space-between">
                        <VStack>
                            <ContainerGiftTitle />
                            <ContainerQRcode />
                        </VStack>
                        <VStack px="$4" pb="$4" mt="$4">
                            <Button
                                size="lg"
                                variant="solid"
                                action="primary"
                                onPress={compartilharCodigo}
                            >
                                <ButtonText textAlign="center">
                                    {t("invite.shareButton")}
                                </ButtonText>
                            </Button>
                        </VStack>
                    </VStack>
                </ScrollView>
            </VStack>
        </BaseContainer>
    );
}
