import { TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";

import { Text, HStack, VStack } from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";

export default function TotalBalanceScreen() {
    const router = useRouter();

    const ContainerNewCart = () => {
        return (
            <TouchableOpacity onPress={() => router.push("/historicbalance")}>
                <HStack
                    style={{
                        backgroundColor: "#f8f8f9",
                        padding: 15,
                        borderRadius: 10,
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "space-between",
                        marginTop: 20,
                    }}
                >
                    <VStack
                        space="xs"
                        marginLeft={12}
                        style={{ width: "100%", paddingRight: 50 }}
                    >
                        <Text bold fontSize={20}>
                            R$ 1.400,00
                        </Text>
                        <Text bold fontSize={17} marginTop={12}>
                            Disponivel
                        </Text>
                        <Text fontSize={15} color="#999">
                            O valor total ja foi liberado e está pronto para ser
                            utilizado
                        </Text>
                    </VStack>
                </HStack>
            </TouchableOpacity>
        );
    };

    return (
        <BaseContainer>
            <HeaderContainer title="Saldos" />

            <ContainerNewCart />
            <ContainerNewCart />
            <ContainerNewCart />
            <ContainerNewCart />
        </BaseContainer>
    );
}
