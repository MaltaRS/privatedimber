import { TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from "expo-router";

import { BaseContainer } from "@/components/BaseContainer";
import ButtonPadrao from "@/components/ButtonPadrao";
import HeaderContainer from "@/components/HeaderContainer";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { 
    Text,
    Heading,
    VStack,
    HStack,
    Input,
    InputField
 } from "@/gluestackComponents";

export default function SakeScreen() {
    const router = useRouter();

    // Componente de entrada para digitar valor de saque
    const PayInput = () => {
        return (
            <View>
                <HStack
                    style={{
                        borderWidth: 1,
                        borderColor: '#999',
                        paddingVertical: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 10
                    }}
                >
                    <VStack style={{ width: '90%' }}>
                        <Input borderColor="#f6f6f6" size="lg">
                            <InputField fontSize={15} placeholder="Digite um valor" />
                        </Input>             
                    </VStack>
                    <Text size="15" style={{ color: "#00A8FF" }}>Max</Text>
                </HStack>
            </View>
        );
    };

    // Container que exibe o saldo disponível e permite inserir um valor
    const ContainerInputTransf = () => {
        return (
            <View>
                <VStack>
                    <HStack 
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 25
                        }}
                    >
                        <Text style={{ fontSize: 15 }}>Quanto você quer sacar?</Text>
                    </HStack>
                </VStack>
                
                <PayInput />

                <VStack>
                    <HStack style={{ width: '100%', alignItems: 'center', marginTop: 5 }}>
                        <Text style={{ fontSize: 15 }}>Saldo disponível: </Text>
                        <Heading style={{ fontSize: 15 }}>R$ 1.400,00</Heading>
                    </HStack>
                </VStack>
            </View>
        );
    };

    // Método de recebimento do saque
    const ComponentTransf = () => {
        return (
            <View style={{ marginTop: 40 }}>
                <Heading style={{ fontSize: 15 }}>Método de recebimento</Heading>

                <TouchableOpacity onPress={() => router.push("/saketype")}>
                    <HStack
                        style={{
                            width: '100%',
                            paddingVertical: 20,
                            borderRadius: 10,
                            backgroundColor: '#f9f9f9',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: 20
                        }}
                    >
                        <HStack style={{ alignItems: 'center' }}>
                            <MaterialIcons name="account-balance" size={24} color="#777" />
                            <Text size="17" style={{ marginLeft: 5 }}>Transferência Bancária via PIX</Text>
                        </HStack>
                    </HStack>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <BaseContainer>
            <HeaderContainer title="Saque" />

            <ContainerInputTransf />
            <ComponentTransf />

            <View style={{ marginTop: 30 }}>
                <ButtonPadrao nav="/saketype" name="Continuar" />
            </View>

            <StatusBar style="auto" />
        </BaseContainer>
    );
}
