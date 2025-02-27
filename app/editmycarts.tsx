import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Image, TextInput } from 'react-native';

import { 
    Text,
    Heading,
    VStack,
    HStack,
    Button,
    ButtonText,
    Box,
    Input,
    InputField
 } from "@/gluestackComponents";

 import { MainTitle } from "@/components/MainTitle";
 import { BaseContainer } from "@/components/BaseContainer";
 import  ButtonPadrao  from "@/components/ButtonPadrao";
 import HeaderContainer from '../components/HeaderContainer'



import Feather from '@expo/vector-icons/Feather';


export default function EditMyCartScreen() {
  

  const PayInput = (title) => {
        return(
           
        <VStack  
              style={{
              width: '100%',
              borderWidth: 1, 
              borderColor: '#999',  
              paddingTop: 10, 
              paddingBottom: 10, 
              borderRadius: 10,
              alignItems: 'center', 
              marginTop: 10
              }} 
            >
            <Input 
              borderColor="#fff"
              size="lg" >

              <InputField 
                fontSize={15}
                placeholder={title.icon}
              />
            </Input>             
        </VStack>

        )
    }


  return (
    <BaseContainer>

      <HeaderContainer name="Adicionar cartao" />

      <Heading 
        style={{fontSize: 15, marginTop: 20, marginBottom: 20}} >
        Preencha os dados abaixo para o cadastro de um novo cartao
      </Heading>

  
      <Heading style={{fontSize: 15}} >
        Numero do cartao
      </Heading>

      <PayInput icon={"0000.000.0000.000"} /> 



      <Heading style={{fontSize: 15, marginTop: 20}} >
        Nome impresso no cartao
      </Heading>
      
      <HStack>

          <VStack  
            style={{
            width: '40%',
            borderWidth: 1, 
            borderColor: '#999',  
            paddingTop: 10, 
            paddingBottom: 10, 
            borderRadius: 10,
            alignItems: 'center', 
            marginTop: 20,
            marginRight: 15
            }} 
          >
            <Input 
              borderColor="#fff"
              size="lg" >

              <InputField 
                fontSize={15}
                placeholder="De"
              />
            </Input>             
          </VStack>

          <VStack  
                style={{
                width: '40%',
                borderWidth: 1, 
                borderColor: '#999',  
                paddingTop: 10, 
                paddingBottom: 10, 
                borderRadius: 10,
                alignItems: 'center', 
                marginTop: 20
                }} 
              >
              <Input 
                borderColor="#fff"
                size="lg" >

                <InputField 
                  fontSize={15}
                  placeholder="123"
                />
              </Input>             
          </VStack>
    
      </HStack>

      <Heading style={{fontSize: 15, marginTop: 15}} >
        Nome Impresso no cartao
      </Heading>
      <PayInput icon={"Ex: Antonio Ataide"} /> 


      <Heading style={{fontSize: 15,  marginTop: 15}} >
        CPF / CNPJ do titular
      </Heading>
      <PayInput icon={"0000.000.0000.000"} /> 

      <Heading style={{fontSize: 15,  marginTop: 15}} >
       Apelido
      </Heading>
      <PayInput icon={"Ex: Antonio Ataide"} /> 

       <ButtonPadrao 
             nav="/saketype"
             name="Continuar"  />




     
      




        
      
 
      <StatusBar style="auto" />
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 7,
    padding: 10,
    marginTop: 4
  },
});