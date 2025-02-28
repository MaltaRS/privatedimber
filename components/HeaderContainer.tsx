import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { HStack, Text } from "@/gluestackComponents";
import { useRouter } from "expo-router";
import { GoBack } from "@/components/utils/GoBack"; 

const HeaderContainer = ({ title, namebuttontab, onSave }) => {
    const router = useRouter();

    return (
        <HStack
            pt="$1"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            px="$1"
        >
            {/* Botão Voltar usando o componente GoBack */}
            <GoBack onPress={() => router.back()} />

            {/* Título Centralizado */}
            <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
                <Text fontFamily="$arialHeading" size="lg" color="#000" textAlign="center">
                    {title}
                </Text>
            </View>

            {/* Botão "Salvar" (se existir) */}
            {namebuttontab ? (
                <TouchableOpacity 
                    onPress={onSave ? onSave : () => console.log(`${namebuttontab} pressionado`)}
                >
                    <Text color="#00A8FF" bold fontSize={17}>{namebuttontab}</Text>
                </TouchableOpacity>
            ) : (
                <View style={{ width: 50 }} /> // Para garantir alinhamento sem "Salvar"
            )}
        </HStack>
    );
};

export default HeaderContainer;
