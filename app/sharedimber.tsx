import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity, Share, Clipboard, Alert } from 'react-native';

import ButtonPadrao from "@/components/ButtonPadrao";
import HeaderContainer from '../components/HeaderContainer';
import iconqrcode from '../assets/images/iconqrcode.png';
import icongift from '../assets/images/icongift.png';
import { useRouter } from "expo-router";
import { 
    Text,
    Heading,
    VStack,
    HStack,
} from "@/gluestackComponents";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BaseContainer } from '@/components/BaseContainer';

export default function SharedDimberScreen() {
    const codigoIndicacao = "979848389";

    // Função para copiar código
    const copiarCodigo = () => {
        Clipboard.setString(codigoIndicacao);
        Alert.alert("Copiado!", "Seu código de indicação foi copiado.");
    };
    const router = useRouter();
    // Função para compartilhar código
    const compartilharCodigo = async () => {
        try {
            await Share.share({
                message: `Use meu código de indicação para ganhar benefícios: https://dimber.io/${codigoIndicacao}`,
            });
        } catch (error) {
            console.error("Erro ao compartilhar:", error);
        }
    };

    // Componente do código de indicação
    const CodigVerific = () => {
        return (
            <View
                style={{
                    marginTop: 20, padding: 16,
                    alignItems: 'center', justifyContent: 'center', borderRadius: 10,
                    backgroundColor: "#f3f4f6", width: "95%"
                }} 
            >
                <Text style={{ fontSize: 15 }}>Seu código de indicação:</Text>
                <HStack style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text bold size="21">{codigoIndicacao}</Text>
                    <TouchableOpacity onPress={copiarCodigo}>
                        <MaterialIcons name="content-copy" size={20} color="#00A8FF" style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                </HStack>
            </View>
        );
    };

    // Componente do título e imagem de presente
    const ContainerGiftTitle = () => {
        return (
            <VStack 
                style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
                className="mt-10"
            >
                <Image
                    style={{ width: 100, height: 122, marginTop: 24 }}
                    source={icongift}
                />
                <Heading fontSize={21} marginTop={18} style={{ textAlign: 'center' }}>
                    Compartilhe o Dimber e ganhe benefícios!
                </Heading>

                <Text fontSize={17} marginTop={10} style={{ textAlign: 'center' }}>
                    Convide seus amigos e aproveite vantagens exclusivas (colocar as vantagens aqui)
                </Text>

                <CodigVerific />
            </VStack>
        );
    };

    // Componente do QR Code
    const ContainerQRcode = () => {
        return (
            <VStack 
                style={{
                    width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 40
                }} 
            >
                <Text size="xl">Compartilhe com QR Code</Text>

                <Image
                    style={{ width: 100, height: 100, margin: 20 }}
                    source={iconqrcode}
                />

                <HStack>
                    <TouchableOpacity onPress={compartilharCodigo}>
                        <Text  bold size="sm" style={{ color: '#00A8FF', marginLeft: 6 }}>Compartilhar QR Code</Text>
                    </TouchableOpacity>
                    
                    <MaterialIcons name="share" size={20} color="#00A8FF" style={{ marginLeft: 15 }} />
                </HStack>

                      <VStack alignItems="center" justifyContent="center">
                                 <Text size="15" bold marginTop={15}>Ficou com alguma dúvida?</Text>
                             </VStack>
             
                             {/* Botão para abrir a página de Termos e Condições */}
                             <HStack style={{ alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
                                 <Text size="sm">Clique aqui e leia os</Text>
                                 <TouchableOpacity  onPress={() => router.push("/terms")}>
                                     <Text size="sm" style={{ color: '#00A8FF', marginLeft: 6 }}>termos e condições</Text>
                                 </TouchableOpacity>
                             </HStack>

                <ButtonPadrao
                    name="Compartilhar código"
                    onPress={compartilharCodigo}
                />
            </VStack>
        );
    };

    return (
        <BaseContainer>
            <HeaderContainer title="Convidar amigos"/>
            <ContainerGiftTitle />
            <ContainerQRcode />
            <StatusBar style="auto" />
        </BaseContainer>
    );
}
