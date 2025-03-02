import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Image } from 'react-native';

import  ButtonPadrao  from "@/components/ButtonPadrao";
import HeaderContainer from '../components/HeaderContainer'
import iconqrcode from '../assets/images/iconqrcode.png'
import icongift from '../assets/images/icongift.png'




import { 
    Text,
    Heading,
    VStack,
    HStack,
 } from "@/gluestackComponents";


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BaseContainer } from '@/components/BaseContainer';




export default function SharedDimberScreen() {

  const ContainerGiftTitle = () => {
    return(
      <VStack 
      style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}
        className="mt-10 " >
       
          <Image
           
            style={{width: 100, height: 122, marginTop: 20}}
            source={icongift}
          />
         <Heading 
           fontSize={21} marginTop={15}
           style={{textAlign: 'center'}} >
            Compartilhe o Dimber e ganhe benefícios!
         </Heading>

         <Text 
          fontSize={17} marginTop={10}
          style={{textAlign: 'center'}} >
            Convide seus amigos e aproveite vantagens exclusivas (colocar as vantagens aqui)
         </Text>
         <CodigVerific />
    </VStack>

    );
}
 

  const CodigVerific = () => {
    return(
    <View
        style={{
        marginTop: 20, padding: 10,
        alignItems: 'center', justifyContent: 'center', borderRadius: 14
    }} 
    >
        <Text style={{fontSize: 15}} >Seu código de indicação:</Text>
          <HStack style={{alignItems: 'center', justifyContent: 'space-between', marginTop: 5}} >
            <Text bold size="21"  >979848389</Text>
            <MaterialIcons name="content-copy" size={20} color="#00A8FF" style={{marginLeft: 15}} />
          </HStack>
      
      </View>
    );
}


const ContainerQRcode = () => {
  return(
    <VStack 
      style={{
        width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 30
      }} >

        <Text size="xl"  >Compartilhe com QR Code</Text>

        <Image
          style={{width: 100, height: 122, margin: 20}}
          source={iconqrcode}
        />

        <HStack>
          <Text bold size="sm" style={{color: '#00A8FF', marginLeft: 6}} >Salvar QR Code</Text>
          <MaterialIcons name="content-copy" size={20} color="#00A8FF" style={{marginLeft: 15}} />
        </HStack>


        <VStack alignItems="center" justifyContent="center" >
          <Text size="15" bold marginTop={15}  >Ficou com alguma duvida ? </Text>
        </VStack>


        <HStack style={{alignItems: 'center', justifyContent: 'center', marginTop: 12}} >
          <Text  size="sm"  >Clique aqui e leia os</Text>
          <Text  size="sm" style={{color: '#00A8FF', marginLeft: 6}} >termos e condições</Text>
        </HStack>

        <ButtonPadrao 
          nav="/saketype"
          name="Compartilhar código"  />



</VStack>
       

  );
}



  



  return (
    <BaseContainer>
      <HeaderContainer title="Convidar amigos"/>

      <ContainerGiftTitle />
       <ContainerQRcode />

      <StatusBar style="auto" />
    </BaseContainer>
  );
}