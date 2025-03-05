import { useState } from "react";
import {
    HStack,
    Text,
    VStack,
} from "@/gluestackComponents";

import { StatusBar } from "expo-status-bar";
import HeaderContainer from '../components/HeaderContainer'
import { Colors } from "@/constants/Colors";
import { ConfigCard } from "@/components/tabs/config/configCard";
import { BaseContainer } from "@/components/BaseContainer";

const Configsecurity = () => {
   

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
               <HeaderContainer title="Segurança" />
                    <VStack p="$1" pt="$2" gap="$6">
                        <ConfigCard 
                            items={[
                                { title: "Alterar senha", href: "/changepassword" },
                                { title: "Ativar segurança 2FA", href: "/configsecurity2fa"  },
               
                            ]}
                        />
                    </VStack>
               </VStack>
            <StatusBar style="auto" />
        </BaseContainer>
    );
};

export default Configsecurity;

