import { View, Image, TouchableOpacity, Share, Alert } from "react-native";

import { useRouter } from "expo-router";

import * as Clipboard from "expo-clipboard";

import { Text, Heading, VStack, HStack } from "@/gluestackComponents";

import ButtonPadrao from "@/components/ButtonPadrao";
import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import iconqrcode from "@/assets/images/iconqrcode.png";
import icongift from "@/assets/images/icongift.png";

export default function SharedDimberScreen() {
    const codigoIndicacao = "979848389";
    const router = useRouter();

    const copiarCodigo = async () => {
        await Clipboard.setStringAsync(codigoIndicacao);
        Alert.alert("Copiado!", "Seu código de indicação foi copiado.");
    };

    const compartilharCodigo = async () => {
        try {
            await Share.share({
                message: `Use meu código de indicação para ganhar benefícios: https://dimber.io/${codigoIndicacao}`,
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
            <Text style={{ fontSize: 15 }}>Seu código de indicação:</Text>
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
                <TouchableOpacity onPress={copiarCodigo}>
                    <MaterialIcons
                        name="content-copy"
                        size={20}
                        color="#00A8FF"
                        style={{ marginLeft: 15 }}
                    />
                </TouchableOpacity>
            </HStack>
        </View>
    );

    const ContainerGiftTitle = () => (
        <VStack
            alignItems="center"
            justifyContent="center"
            mt={10}
            width="100%"
        >
            <Image
                style={{ width: 100, height: 122, marginTop: 24 }}
                source={icongift}
            />
            <Heading fontSize={21} mt={18} textAlign="center">
                Compartilhe o Dimber e ganhe benefícios!
            </Heading>
            <Text fontSize={17} mt={10} textAlign="center">
                Convide seus amigos e aproveite vantagens exclusivas (colocar as
                vantagens aqui)
            </Text>
            <CodigVerific />
        </VStack>
    );

    const ContainerQRcode = () => (
        <VStack
            alignItems="center"
            justifyContent="center"
            mt={40}
            width="100%"
        >
            <Text size="xl">Compartilhe com QR Code</Text>
            <Image
                style={{ width: 120, height: 120, margin: 20 }}
                source={iconqrcode}
            />

            <HStack alignItems="center" justifyContent="center">
                <TouchableOpacity onPress={compartilharCodigo}>
                    <Text
                        bold
                        size="sm"
                        mb={6}
                        style={{ color: "#00A8FF", marginLeft: 6 }}
                    >
                        Salvar QR Code
                    </Text>
                </TouchableOpacity>
                <MaterialIcons
                    name="share"
                    size={20}
                    color="#00A8FF"
                    style={{ marginLeft: 8 }}
                />
            </HStack>

            <VStack alignItems="center" justifyContent="center">
                <Text fontSize={15} bold mt={16}>
                    Ficou com alguma dúvida?
                </Text>
            </VStack>

            <HStack alignItems="center" justifyContent="center" mt={8}>
                <Text size="sm">Clique aqui e leia os</Text>
                <TouchableOpacity onPress={() => router.push("/terms")}>
                    <Text size="sm" style={{ color: "#00A8FF", marginLeft: 6 }}>
                        termos e condições
                    </Text>
                </TouchableOpacity>
            </HStack>
        </VStack>
    );

    return (
        <BaseContainer>
            <HeaderContainer title="Convidar amigos" />
            <ContainerGiftTitle />
            <ContainerQRcode />
            <ButtonPadrao
                name="Compartilhar código"
                onPress={compartilharCodigo}
            />
        </BaseContainer>
    );
}
