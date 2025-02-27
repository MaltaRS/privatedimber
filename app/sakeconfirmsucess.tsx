import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';


import { 
    Text,
    VStack,
    HStack,
    Image,
    Heading,
 } from "@/gluestackComponents";

import iconsucesspix from '../assets/images/iconsucesspix.png'
import { BaseContainer } from '@/components/BaseContainer';

import  ButtonPadrao  from "@/components/ButtonPadrao";

export default function SakeConfirmSucessScreen() {

    

    const ItemTitleInfoContainer = (title) => {
        return(
        <View>
            <VStack 
            style={{marginTop: 0}}>
    
                <Image 
                    source={iconsucesspix } 
                    style={{height: 120, width: 130}} />
                
                    <VStack 
                        space="xs" 
                        style={{ marginTop: 20,}}  >
                        <Text bold style={{fontSize: 30}} >{title.name}</Text>
                        <HStack>
                            <Text marginTop={20} style={{fontSize: 18}} >O valor solicitado sera processado e transferido para a conta informada dentro do prazo estimado</Text>
                        </HStack>
                    </VStack>
        
                <View style={{ marginTop: 34, width: '100%', height: 2, backgroundColor: '#f2f2f2', borderRadius: 10}}  />
        
            </VStack>    
    
          </View>
        );
    }



    
    

  return (
    <BaseContainer>
      
       <ItemTitleInfoContainer
             name="Saque realizado com sucesso!" 
        />

      <StatusBar style="auto" />
    </BaseContainer>
  );
}