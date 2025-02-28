import { StatusBar } from 'expo-status-bar';
import { View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { 
    Text,
    VStack,
    HStack,
    Heading
} from "@/gluestackComponents";
import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";
import HeaderContainer from "@/components/HeaderContainer";
import ButtonPadrao from "@/components/ButtonPadrao";
import Row from "../components/Row";
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

export default function SelectPayTypeScreen() {
    const router = useRouter();
    
    const logoCard = 'https://brand.mastercard.com/...';
    const logoCardVisa = "https://e7.pngegg.com/pngimages/686/...";
    
    const CartContainer = ({ name, description, nav, logo }) => (
        <View>
            <TouchableOpacity onPress={() => router.push(nav)}>
                <HStack style={styles.cardContainer}>
                    <HStack justifyContent="center" alignItems="center">
                        <Feather name="circle" size={24} color="black" style={{ marginRight: 5 }} />
                        <Image style={styles.cardImage} source={{ uri: logo }} />
                        <VStack space="xs" marginLeft={12}>
                            <Text bold size="16">{name}</Text>
                            <Text size="15" color="#999">{description}</Text>
                        </VStack>
                    </HStack>
                </HStack>
            </TouchableOpacity>
            <Row />
        </View>
    );

    const ContainerNewCart = () => (
        <TouchableOpacity onPress={() => router.push("/mycarts")}> 
            <HStack style={styles.cardContainer}>
                <HStack justifyContent="center" alignItems="center">
                    <SimpleLineIcons name="wallet" size={24} color="black" />
                    <VStack space="xs" marginLeft={12}>
                        <Text bold size="16">Pagar com outro cartão</Text>
                        <Text size="15" color="#999">Selecione seu banco</Text>
                    </VStack>
                </HStack>
            </HStack>
            <Row />
        </TouchableOpacity>
    );

    return (
        <BaseContainer backgroundColor="#fff">
            <HeaderContainer title="Pagamentos" />
            <VStack className="mt-5">
                <MainTitle title="Selecione o Cartão" />
                <Heading style={styles.heading}>
                    Você está utilizando R$ 402,00 do seu saldo, o valor restante de R$ 638,00 será cobrado no cartão de crédito selecionado.
                </Heading>
                <CartContainer name="Crédito" description="R$ 1,402,00" nav="/confirmpaymsg" logo={logoCard} />
                <CartContainer name="Cartão de Crédito" description="Visa crédito ••••6143" nav="profile" logo={logoCardVisa} />
                <ContainerNewCart />
                <ButtonPadrao nav="/confirmpaymsg" name="Continuar" />
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
    heading: {
        fontSize: 15,
        marginTop: 20,
    }
};