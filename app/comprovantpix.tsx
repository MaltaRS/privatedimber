import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import { Text, VStack, HStack, Image, Heading } from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";

import ButtonPadrao from "@/components/ButtonPadrao";

import Row from "../components/Row";

export default function ComprovantPixScreen() {
    const ItemTitleInfoContainer = (title: { name: string }) => {
        return (
            <View>
                <VStack style={{ marginTop: 0 }}>
                    <Image
                        source={require("../assets/images/iconsucesspix.png")}
                        style={{ height: 92, width: 92 }}
                    />

                    <VStack space="xs" style={{ marginTop: 20 }}>
                        <Text bold style={{ fontSize: 20 }}>
                            {title.name}
                        </Text>
                        <HStack>
                            <Text size="sm">26 de setembro, 2024 as 18h21</Text>
                            <Text size="sm">19h</Text>
                        </HStack>
                    </VStack>

                    <View
                        style={{
                            marginTop: 34,
                            width: "100%",
                            height: 2,
                            backgroundColor: "#f2f2f2",
                            borderRadius: 10,
                        }}
                    />
                </VStack>
            </View>
        );
    };

    const ItemContainerBody = () => {
        return (
            <VStack space="xs" style={{ marginTop: 5 }}>
                <Heading size="lg" bold>
                    Detalhes da doação
                </Heading>
                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 1,
                    }}
                >
                    <Text size="md">Nome da instituição</Text>
                    <Text bold size="md">
                        Camila Farani
                    </Text>
                </HStack>

                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 6,
                    }}
                >
                    <Text size="md">CNPJ</Text>
                    <Text bold size="md">
                        ***506.858/001***
                    </Text>
                </HStack>

                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 6,
                    }}
                >
                    <Text size="md">Código do banco</Text>
                    <Text bold size="md">
                        336 - Itaú
                    </Text>
                </HStack>

                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 6,
                    }}
                >
                    <Text size="md">Tipo de Conta</Text>
                    <Text bold size="md">
                        Corrente
                    </Text>
                </HStack>

                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 6,
                    }}
                >
                    <Text size="md">Agência</Text>
                    <Text bold size="md">
                        1000
                    </Text>
                </HStack>

                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 6,
                    }}
                >
                    <Text size="md">Numero da Conta</Text>
                    <Text bold size="md">
                        283853219
                    </Text>
                </HStack>

                <VStack space="xs" style={{ marginTop: 23 }}>
                    <Heading size="md" bold>
                        Detalhes do remetente
                    </Heading>
                    <HStack
                        style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 6,
                        }}
                    >
                        <Text size="md">Nome Completo</Text>
                        <Text bold size="md">
                            Camila Farani
                        </Text>
                    </HStack>

                    <HStack
                        style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 6,
                        }}
                    >
                        <Text size="md">Meio de Pagamento</Text>
                        <Text bold size="md">
                            Saldo na Carteira
                        </Text>
                    </HStack>

                    <HStack
                        style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 6,
                        }}
                    >
                        <Text size="md">Valor</Text>
                        <Text bold size="md">
                            R$ 250,00
                        </Text>
                    </HStack>
                </VStack>

                <VStack space="xs" style={{ marginTop: 23 }}>
                    <Heading size="lg" bold>
                        ID da transação
                    </Heading>
                    <HStack
                        style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text size="md">
                            c3769d0f-fdab-4cc8-99cb-17fc0dc93c13
                        </Text>
                    </HStack>
                </VStack>
            </VStack>
        );
    };

    const ItemBodyInfoContainer = () => {
        return (
            <VStack style={{ marginTop: 10 }}>
                <ItemContainerBody />
                <Row />
            </VStack>
        );
    };

    return (
        <BaseContainer>
            <ItemTitleInfoContainer name="Agradecemos a sua contribuição!" />

            <ItemBodyInfoContainer />

            <ButtonPadrao nav="/saketype" name="Confirmar Pagamento" />

            <StatusBar style="auto" />
        </BaseContainer>
    );
}
