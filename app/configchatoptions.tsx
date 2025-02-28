
import { TouchableOpacity, } from 'react-native';

import { 
    Text,
    VStack
 } from "@/gluestackComponents";

 import { StatusBar } from 'expo-status-bar';
 import HeaderContainer from '../components/HeaderContainer'


import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";
import Row from '../components/Row'




export default function ConfigNotificScreen() {


  return (
      <BaseContainer backgroundColor="#fff"  >

        <HeaderContainer title="Conversas" />

         <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={2} marginTop={30} >


   
          
        <TouchableOpacity style={{marginTop: 30}} >
           <Text size="17">Exportar conversas</Text>
        </TouchableOpacity>
        <Row />


        <TouchableOpacity style={{marginTop: 30}} >
           <Text size="17">Arquivar todas as conversas</Text>
        </TouchableOpacity>
        <Row />


        <TouchableOpacity style={{marginTop: 30}} >
           <Text size="17" color="#ff0000" >Apagar todas as conversas</Text>
        </TouchableOpacity>
           
        <Row />

        </VStack>


      <StatusBar style="auto" />
    </BaseContainer>
  );
}