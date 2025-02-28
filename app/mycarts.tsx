import { StatusBar } from 'expo-status-bar';
import { View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { 
    Text,
    VStack,
    HStack,
    Input,
    InputField,
} from "@/gluestackComponents";
import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";
import Row from "../components/Row";
import HeaderContainer from "../components/HeaderContainer";
import Feather from '@expo/vector-icons/Feather';

export default function MyCartsScreen() {
    const router = useRouter();

    const logoCard4 = 'data:image/png;base64,iVBORw0KG...';
    const logoCard3 = 'data:image/png;base64,iVBORw0KG...';
    const logoCard2 = 'data:image/jpeg;base64,/9j/4AAQ...';
    const logoCard = 'https://brand.mastercard.com/...';

    const CartContainer = ({ name, description, logo }) => (
        <View>
            <HStack style={styles.cardContainer}>
                <HStack justifyContent="center" alignItems="center">
                    <Image style={styles.cardImage} source={{ uri: logo }} />
                    <VStack space="xs" marginLeft={12}>
                        <Text bold size="15">{name}</Text>
                        <Text size="15" color="#999">{description}</Text>
                    </VStack>
                </HStack>
                <Feather name="more-vertical" size={24} color="black" />
            </HStack>
            <Row />
        </View>
    );

    const ContainerNewCart = ({ logo }) => (
        <TouchableOpacity onPress={() => router.push("/editmycarts")}>
            <HStack style={styles.cardContainer}>
                <HStack justifyContent="center" alignItems="center">
                    <Image style={styles.cardImage} source={{ uri: logo }} />
                    <VStack space="xs" marginLeft={12}>
                        <Text bold size="15">Adicionar Novo Cartão</Text>
                        <Text size="15" color="#999">Selecione seu banco</Text>
                    </VStack>
                </HStack>
                <Feather name="more-vertical" size={24} color="black" />
            </HStack>
            <Row />
        </TouchableOpacity>
    );

    return (
        <BaseContainer backgroundColor="#fff">
            <HeaderContainer title="Meus Cartões" backgroundColor="#fff" />
            <VStack className="mt-5" backgroundColor="#fff">
                <CartContainer name="Cartão " description="C6 Bank Crédito ******1540" logo={logoCard3} />
                <CartContainer name="Cartão " description="Master Card Crédito ******7076" logo={logoCard} />
                <CartContainer name="Cartão " description="Nubank Crédito ******8010" logo={logoCard2} />
                <ContainerNewCart logo={logoCard4} />
            </VStack>
            <StatusBar style="auto" />
        </BaseContainer>
    );
}

const styles = {
    cardContainer: {
        borderWidth: 1,
        borderColor: '#999',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 20,
        backgroundColor: '#fff',
    },
    cardImage: {
        width: 30,
        height: 30,
    },
};