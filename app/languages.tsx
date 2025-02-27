import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, } from 'react-native';

import { 
    Text,
    VStack,
    HStack,
    Image,
    Heading,
    Switch
 } from "@/gluestackComponents";

 import { BaseContainer } from '@/components/BaseContainer';
 import HeaderContainer from '../components/HeaderContainer'
 import Row from '../components/Row'


export default function IdiomScreen() {
      const [isSwitchOn, setIsSwitchOn] = useState(true);
  

    const OtherInfoProfile = (notific) => {
        return(
        <View style={{ marginTop: 8, width: '98%', borderRadius: 10}} > 

                <HStack
                    style={{ alignItems: 'center',  justifyContent: 'space-between', marginTop: 10 
                    }}  className="bg-white" >
                        
                      <VStack>
                         <Text size="15"  >{notific.name}</Text>         
                      </VStack>
                </HStack>
          
          </View>
        );
    }

    const SwitchOption = () => {
      return(
      <VStack>
        <HStack 
          space="md" 
          style={{
            width: '100%', justifyContent: 'space-between', marginTop: 23, paddingRight: 5
            }}  
          >
            <Text style={{fontSize: 17}} >Traduzir automaticamente</Text>
                <Switch
                  value={isSwitchOn}
                  onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                  trackColor={{ false: "#ccc", true: "#007BFF" }}
                  thumbColor={isSwitchOn ? "#fff" : "#f4f4f4"}
                />
          </HStack>
          <Row />
      </VStack>

      );
  }


  return (
    <BaseContainer backgroundColor="white">
      <HeaderContainer name="Idiomas" />

      <SwitchOption />

          <Heading 
            style={{fontSize: 19, marginTop: 15}} >
            Idioma de Interface
          </Heading>


          <VStack 
            style={{backgroundColor: '#fff', paddingLeft: 10, borderRadius: 5, elevation: 1, paddingBottom: 20}}  >
            <OtherInfoProfile name="Portugues(Brasil)" />
            <OtherInfoProfile name="English" />
            <OtherInfoProfile name="Arabic" />
            <OtherInfoProfile name="Belarusian" />
            <OtherInfoProfile name="Catalan" />
            <OtherInfoProfile name="Coroatian" />
            <OtherInfoProfile name="Czech" />
            <OtherInfoProfile name="Dutch" />
            <OtherInfoProfile name="Finnish" />
            <OtherInfoProfile name="French" />
            <OtherInfoProfile name="German" />
          </VStack>

       
      <StatusBar style="auto" />
    </BaseContainer>
  );
}
