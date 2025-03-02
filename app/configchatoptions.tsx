import { useState } from "react";
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Box,
    HStack,
    Pressable,
    ScrollView,
    Text,
    VStack,
} from "@/gluestackComponents";

import { StatusBar } from "expo-status-bar";
import HeaderContainer from '../components/HeaderContainer'
import { Colors } from "@/constants/Colors";
import { MainTitle } from "@/components/MainTitle";
import { ConfigCardNoIcon } from "@/components/tabs/config/configCardNoIcon";
import { BaseContainer } from "@/components/BaseContainer";


const PrivacyScreen = () => {

    return (
        <BaseContainer>
            <VStack gap="$4">
        <HeaderContainer title="Conversas" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 46,
                    }}
                >
                    <VStack p="$1" pt="$2" gap="$6">

                        <ConfigCardNoIcon 
                            items={[
                                { title: "Exportar"}, 
                                { title: "Arquivar todas as conversas"}, 
                                { title: "Apagar todas as conversas"}
               
                            ]}
                        />
              

                    </VStack>
                </ScrollView>
            </VStack>
            <StatusBar style="auto" />
        </BaseContainer>
    );
};

export default PrivacyScreen;
