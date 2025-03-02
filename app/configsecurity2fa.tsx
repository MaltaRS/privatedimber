import { StatusBar } from 'expo-status-bar';

import { 
    Text,
    VStack,
    HStack,
 } from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from '../components/HeaderContainer'


export default function ConfigSecurity2fa() { 

       
    return(
        <BaseContainer >
          <HeaderContainer title="Ativar seguranca 2FA" />
    
          <StatusBar style="auto" />
        </BaseContainer>

    );
}


    