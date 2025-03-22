import React, { Fragment } from "react";

import { TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";

import { BaseContainer } from "@/components/BaseContainer";

import HeaderContainer from "@/components/HeaderContainer";

import Pix from "@/assets/icons/appIcons/pix.svg";

import {
    Text,
    VStack,
    HStack,
    Input,
    InputField,
    InputSlot,
    Box,
    ButtonText,
} from "@/gluestackComponents";

import { Button } from "@/components/ui/Button";

export default function SakeScreen() {
    const router = useRouter();

    const PayInput = () => {
        return (
            <Fragment>
                <Input
                    size="lg"
                    borderWidth={1}
                    borderColor="#999"
                    paddingVertical={10}
                    borderRadius={10}
                    alignItems="center"
                    height={68}
                    justifyContent="space-between"
                    marginTop={10}
                >
                    <InputField fontSize={19} placeholder="Digite um valor" />
                    <InputSlot mr="$4">
                        <Text fontSize={17} color="$primaryDefault">
                            máx
                        </Text>
                    </InputSlot>
                </Input>
            </Fragment>
        );
    };

    const ContainerInputTransf = () => {
        return (
            <Fragment>
                <VStack>
                    <HStack
                        mt={25}
                        width="100%"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Text
                            fontSize={18}
                            color="$black"
                            fontFamily="$novaBody"
                            bold
                        >
                            Quanto você quer sacar?
                        </Text>
                    </HStack>
                </VStack>

                <PayInput />

                <VStack>
                    <HStack width="100%" alignItems="center" mt={5}>
                        <Text fontSize={18} color="$gray900" mb={2}>
                            Saldo disponível:{" "}
                        </Text>

                        <Text
                            fontSize={18}
                            fontFamily="$heading"
                            color="$black"
                            letterSpacing={0}
                            bold
                        >
                            R$ 1.400,00
                        </Text>
                    </HStack>
                </VStack>
            </Fragment>
        );
    };

    const ComponentTransf = () => {
        return (
            <Box mt={32}>
                <Text fontSize={21} bold color="$black">
                    Método de recebimento
                </Text>

                <TouchableOpacity onPress={() => router.push("/saketype")}>
                    <HStack
                        width="100%"
                        alignItems="center"
                        justifyContent="space-between"
                        marginTop={20}
                        p="$5"
                        borderRadius={10}
                        bgColor="$gray50"
                    >
                        <HStack alignItems="center" gap="$3">
                            <Pix width={22} height={22} color="#777" />

                            <Text fontSize={18} color="$gray900">
                                Transferência bancária via PIX
                            </Text>
                        </HStack>
                    </HStack>
                </TouchableOpacity>
            </Box>
        );
    };

    return (
        <BaseContainer>
            <Box flex={1}>
                <HeaderContainer title="Saque" />

                <ContainerInputTransf />

                <ComponentTransf />
            </Box>

            <Button onPress={() => router.push("/saketype")} mb="$4">
                <ButtonText textAlign="center" fontFamily="$heading" size="xl">
                    Continuar
                </ButtonText>
            </Button>
        </BaseContainer>
    );
}
