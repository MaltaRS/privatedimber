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
            px="1"
        >
            <GoBack onPress={() => router.back()} />


            <View style={{ flex: 1, alignItems: 'center', position: 'absolute', left: 0, right: 0 }}>
                <Text fontFamily="$arialHeading" size="lg" color="#000" textAlign="center">
                    {title}
                </Text>
            </View>


            {namebuttontab ? (
                <TouchableOpacity
                    style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                    onPress={onSave || (() => console.log(`${namebuttontab} pressionado`))}
                >
                    <Text color="#00A8FF" bold fontSize={17}>{namebuttontab}</Text>
                </TouchableOpacity>
            ) : (
                <View style={{ width: 50, }} /> // Mantém alinhamento sem o botão "Salvar"
            )}
        </HStack>
    );
};

export default HeaderContainer;
