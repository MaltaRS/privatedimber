import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, TextInput } from 'react-native';

import { 
    Text,
    VStack,
    HStack,
    Input,
    InputField, 
    InputSlot, 
    InputIcon
 } from "@/gluestackComponents";

 import { MainTitle } from "@/components/MainTitle";
 import { BaseContainer } from "@/components/BaseContainer";
 import  ButtonPadrao  from "@/components/ButtonPadrao";


import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function CreateNewCartScreen() {
  

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


      <MainTitle  title="Meus Cartoes" />

      <Text 
        style={{fontSize: 15, marginTop: 20, marginBottom: 20, color: '#15161E'}} >
        Preencha os dados abaixo para o cadastro de sssum novo cartao
      </Text>

  
      <Text style={{fontSize: 15, color: '#474151'}} >
        Numero do cartao
      </Text>
      <PayInput icon={"0000.000.0000.000"} /> 



    <HStack style={{width: '100%',}}  >

      <VStack style={{width: '40%'}}  >
          <Text style={{fontSize: 15, marginTop: 20, color: '#374151'}} >
            Validade
          </Text>
          
          <VStack  
            style={{
              width: '100%',
              borderWidth: 1, 
              borderColor: '#999',  
              paddingTop: 10, 
              paddingBottom: 10, 
              borderRadius: 10,
              marginTop: 10,
            }} 
            >
            <Input 
              borderColor="#fff"
              size="lg" 
              >
      
              <InputField 
                fontSize={15}
                placeholder="MM / AA"
              />

              <InputSlot>
                <InputIcon>
                    <AntDesign name="questioncircleo" size={20} color="black" marginRight={10} />   
                 </InputIcon>
              </InputSlot>
          </Input>         

          </VStack>
      </VStack>


      <VStack  style={{marginLeft: 20, width: '50%'}} >
          <Text style={{fontSize: 15, marginTop: 20, color: '#374151'}} >
            CVV
        </Text>

          <VStack  
            style={{
               width: '100%',
              borderWidth: 1, 
              borderColor: '#999',  
              paddingTop: 10, 
              paddingBottom: 10, 
              borderRadius: 10,
              marginTop: 10,
            }} 
            >
            <Input 
              borderColor="#fff"
              size="lg" 
              >
      
              <InputField 
                fontSize={15}
                placeholder="123"
              />

              <InputSlot marginRight={10}  >
                  <InputIcon>
                     <AntDesign name="questioncircleo" size={20} color="black" />   
                  </InputIcon>
              </InputSlot>  

          </Input>         
          </VStack>

      </VStack>  

    </HStack>

     

                        

      <Text style={{fontSize: 15, color: '#474151', marginTop: 15}} >
        Nome Impresso no cartao
      </Text>
      <PayInput icon={"Ex: Antonio Ataide"} /> 


      <Text style={{fontSize: 15, color: '#474151', marginTop: 15}} >
        CPF/CNPJ do titular
      </Text>
      <PayInput icon={"0000.000.0000.000"} /> 

      <Text style={{fontSize: 15, color: '#474151', marginTop: 15}} >
        Apelido
      </Text>
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