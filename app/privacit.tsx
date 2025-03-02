import { useState } from "react";
import {
    HStack,
    ScrollView,
    Text,
    VStack,
} from "@/gluestackComponents";

import { StatusBar } from "expo-status-bar";
import HeaderContainer from '../components/HeaderContainer'
import { Colors } from "@/constants/Colors";
import { MainTitle } from "@/components/MainTitle";
import { ConfigCardSwitch } from "@/components/tabs/config/configCardSwitch";
import { ConfigCard } from "@/components/tabs/config/configCard";
import { BaseContainer } from "@/components/BaseContainer";


const PrivacyScreen = () => {
   

    return (
        <BaseContainer>
            <VStack gap="$4">
        <HeaderContainer title="Privacidade" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 46,
                    }}
                >
                    <VStack p="$1" pt="$2" gap="$6">

                        <ConfigCard 
                            items={[
                                { title: "Bloqueados", href: "/listblockusers" },
               
                            ]}
                        />
                             <ConfigCardSwitch 
                                                       items={[
                                                           { title: "Mostrar Online"},
                                                           { title: "Mostrar última atualização"},
                                                           { title: "Exibir estatísticas"},
                                                           { title: "Modo férias" },
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

