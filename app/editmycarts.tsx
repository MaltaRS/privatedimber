import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TextInput } from 'react-native';
import { 
    Text,
    Heading,
    VStack,
    HStack,
    Button,
    ButtonText,
    Box,
    Input,
    InputField
} from "@/gluestackComponents";
import { MainTitle } from "@/components/MainTitle";
import { BaseContainer } from "@/components/BaseContainer";
import ButtonPadrao from "@/components/ButtonPadrao";
import HeaderContainer from '../components/HeaderContainer';
import Feather from '@expo/vector-icons/Feather';

const PayInput = ({ placeholder }) => (
    <VStack  
        style={{
            width: '100%',
            borderWidth: 1, 
            borderColor: '#999',  
            paddingTop: 10, 
            paddingBottom: 10, 
            borderRadius: 10,
            alignItems: 'center', 
            marginTop: 10
        }}
    >
        <Input borderColor="#fff" size="lg">
            <InputField fontSize={15} placeholder={placeholder} />
        </Input>             
    </VStack>
);

export default function EditMyCartScreen() {
    return (
        <BaseContainer>
            <HeaderContainer title="Adicionar cartão" />

            <Heading style={{ fontSize: 15, marginTop: 20, marginBottom: 20 }}>
                Preencha os dados abaixo para o cadastro de um novo cartão
            </Heading>

            <Heading style={{ fontSize: 15 }}>Número do cartão</Heading>
            <PayInput placeholder="0000.000.0000.000" />

            <Heading style={{ fontSize: 15, marginTop: 20 }}>Nome impresso no cartão</Heading>
            <PayInput placeholder="Ex: Antonio Ataide" />

            <Heading style={{ fontSize: 15, marginTop: 15 }}>CPF / CNPJ do titular</Heading>
            <PayInput placeholder="0000.000.0000.000" />

            <Heading style={{ fontSize: 15, marginTop: 15 }}>Apelido</Heading>
            <PayInput placeholder="Ex: Antonio Ataide" />

            <View style={styles.buttonContainer}>
                <ButtonPadrao nav="/saketype" name="Continuar" />
            </View>

            <StatusBar style="auto" />
        </BaseContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        borderRadius: 7,
        padding: 10,
        marginTop: 4
    },
    buttonContainer: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1
    }
});