import { TouchableOpacity, } from 'react-native';

import { 
    Text,
    VStack
 } from "@/gluestackComponents";

 import { StatusBar } from 'expo-status-bar';
 import HeaderContainer from '../components/HeaderContainer'


import { BaseContainer } from "@/components/BaseContainer";
import Row from '../components/Row'


export default function HelpScreen() {


  return (
      <BaseContainer>

        <HeaderContainer title="Ajuda" />
         <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={2} marginTop={30} >


   
      


           

        </VStack>


      <StatusBar style="auto" />
    </BaseContainer>
  );
}