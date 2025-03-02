import { TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useRouter } from "expo-router";

import { BaseContainer } from "@/components/BaseContainer";
import  ButtonPadrao  from "@/components/ButtonPadrao";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';


import { 
    Text,
    Heading,
    VStack,
    HStack,
    Input,
    InputField
 } from "@/gluestackComponents";
import { MainTitle } from '@/components/MainTitle';
import  HeaderContainer  from "@/components/HeaderContainer";



export default function ConfigDefinedValueMsgScreen() {
      const router = useRouter();

     const SelectValueInput = (title) => {
         return(
         <View>

            <VStack marginTop={20} >
                <Heading>
                    {title.nameinput}
                </Heading>
                <Text fontSize={15} color="#374151" >
                   {title.descriptioninput}  
                </Text>
            </VStack>
            
   
             <HStack
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    borderWidth: 1, 
                    borderColor: '#999',  
                    paddingTop: 10, 
                    paddingBottom: 10, 
                    borderRadius: 10,
                   marginTop: 12
                   }} >
   
                 <HStack alignItems="center" justifyContent="space-between" >
                         <VStack  
                           style={{width: '90%', alignItems: "center", justifyContent: 'center'}} >
                             <Input 
                               borderColor="#fff"
                               size="lg" >
   
                               <InputField 
                                fontSize={15}
                                placeholder={title.placetitle}
                               />
                             </Input>             
                         </VStack>
                 </HStack>
                    <AntDesign name="down" size={17} color="black" />
                 </HStack>
   
              
     
           </View>
         )
     }


  return (
    <BaseContainer backgroundColor="#fff"  >

      <HeaderContainer title="Definir valores"/>

      <VStack marginTop={20}  >
        <Text fontSize={17} color="#374151" >
            Defina o valor que você deseja cobrar por cada interação.
        </Text>
      </VStack>

      <VStack marginTop={10} >
        <SelectValueInput nameinput="Base de preço" descriptioninput="Preço mínimo por mensagem" placetitle="R$ 100,00" />
        <SelectValueInput nameinput="Anexo" descriptioninput="Porcentagem extra a ser cobrada por anexo" placetitle="Selecione" />
        <SelectValueInput nameinput="Video" descriptioninput="Porcentagem extra a ser cobrada por video" placetitle="Selecione"/>
        <SelectValueInput nameinput="Imagem" descriptioninput="Porcentagem extra a ser cobrada por imagem" placetitle="Selecione"/>
      </VStack>

      <ButtonPadrao 
       nav="/configdefinedvaluemsg"
       name="Salvar"  />

     
      <StatusBar style="auto" />
    </BaseContainer>
  );
}
