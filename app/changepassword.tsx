import { StatusBar } from 'expo-status-bar';

import { 
    Text,
    VStack,
    HStack,
 } from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from '../components/HeaderContainer'


export default function ChangePasswordScreen() { 
       
    return(
        <BaseContainer >
          <HeaderContainer title="Alterar senha" />
    
          <StatusBar style="auto" />
        </BaseContainer>

    );
}


    