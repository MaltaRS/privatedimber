import { TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useRouter } from "expo-router";

import { BaseContainer } from "@/components/BaseContainer";
import  ButtonPadrao  from "@/components/ButtonPadrao";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';


import { 
    Text,
    Heading,
    VStack,
    HStack,
    Input,
    InputField
 } from "@/gluestackComponents";
import { MainTitle } from '@/components/MainTitle';


export default function SakeScreen() {
      const router = useRouter();

   
  
  const ContainerInputTransf = () => {
    return(
    <View>
  
        <VStack>
          <HStack 
            style={{width: '100%', alignItems: 'center', justifyContent: 'space-between'}} >
            <Heading style={{fontSize: 15}}>Quanto voce quer sacar ?</Heading>
          </HStack>
        </VStack>
            
  
        <PayInput />

        <VStack>
          <HStack style={{width: '100%', alignItems: 'center', marginTop: 5 }} >
            <Text style={{fontSize: 15}} >Saldo disponivel: </Text>
            <Heading style={{fontSize: 15}}>R$ 1.400,00</Heading>
          </HStack>
        </VStack>
      
      </View>
    )
  }

    const PayInput = () => {
      return(
      <View >
          <HStack
               style={{
                 borderWidth: 1, 
                 borderColor: '#999',  
                 paddingTop: 10, 
                 paddingBottom: 10, 
                 borderRadius: 10,
                 alignItems: 'center', 
                 justifyContent: 'space-between', 
                marginTop: 10
                }} >

              <HStack style={{alignItems: 'center', justifyContent: 'space-between', }} >
                      
                      <VStack  
                        style={{width: '90%'}} >
                          <Input 
                            borderColor="#fff"
                            size="lg" >

                            <InputField 
                             fontSize={15}
                             placeholder="Digite um valor"
                            />
                          </Input>             
                      </VStack>
              </HStack>

                   <Text size="15" style={{ color: "#00A8FF"}} >max</Text>

              </HStack>
        
  
        </View>
      )
  }

  const ComponentTransf = () => {
    return(
       <View style={{marginTop: 40}} >

            <Heading style={{fontSize: 15}}  >Método de recebimento</Heading>


            <TouchableOpacity onPress={() => router.push("/saketype")} >
              <HStack
                  style={{
                    width: '100%', paddingTop: 20, paddingBottom: 20,
                    borderRadius: 10, backgroundColor: '#f9f9f9',
                    alignItems: 'center', justifyContent: 'space-between', 
                    marginTop: 20 
                  }} >

                
                <HStack style={{ alignItems: 'center'}} > 
                    <MaterialIcons name="pix" size={24} color="black" />
                    <Text bold size="17" style={{marginLeft: 5}} >Transferencia Bancaria via PIX</Text>
                </HStack>
              </HStack>
            </TouchableOpacity>


      </View>
    )
}




  return (
    <BaseContainer>

      <MainTitle title="Sacar" />

      <ContainerInputTransf />
      <ComponentTransf />

      <ButtonPadrao 
       nav="/saketype"
       name="Continuar"  />
     
      <StatusBar style="auto" />
    </BaseContainer>
  );
}


