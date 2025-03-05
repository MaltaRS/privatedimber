import { useState } from "react";
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Box,
    HStack,
    Pressable,
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
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
               <HeaderContainer title="Conversas" />
                <VStack>

                    <ConfigCardNoIcon 
                        items={[
                            { title: "Exportar"}, 
                            { title: "Arquivar todas as conversas"}, 
                            { title: "Apagar todas as conversas"}
           
                        ]}
                    />
                </VStack>
            </VStack>
          <StatusBar style="auto" />
        </BaseContainer>
    );
};

export default PrivacyScreen;
