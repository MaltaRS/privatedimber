import { View, ScrollView,  } from 'react-native';

import { 
    Text,
    VStack,
    HStack,
    Heading,
    Box,
    Button,
    ButtonText
 } from "@/gluestackComponents";

 import AntDesign from '@expo/vector-icons/AntDesign';


export default function TabProfile() {


    const ButtontTab = (title) => {
        return(
        <View 
           style={{
              width: '45%', alignItems: 'center', justifyContent: 'center',
              padding: 6, margin: 2, borderRadius: 30, borderWidth: 1, borderColor: '#f8f8f8' 
            }} >
           <Text bold size="15" >{title.name}</Text>
         </View>   
        )
    }

    const ButtonSleceted = (title) => {
        return(
        <View 
           style={{
              width: '45%', alignItems: 'center', justifyContent: 'center',
              padding: 10, margin: 2, borderRadius: 30, borderWidth: 1, borderColor: '#f5f5f5',
              backgroundColor: '#fff' 
            }} >
           <Text bold size="15" >{title.name}</Text>
         </View>   
        )
    }


    const Tab = () => {
        return(
            <View style={{width: "100%", alignItems: "center"}}  >    
                <HStack style={{alignItems: 'center', }}>  

                    <ButtontTab name="Sobre"/>
                    <ButtonSleceted name="Estatisticas"/>         

                </HStack>
            </View>
        )
    }


  return (
    <VStack 
     style={{
        backgroundColor: '#F8F8F8', borderRadius: 30,
        alignItems: 'center', justifyContent: 'center',
        marginTop: 10
        }}  >
       <Tab />
     </VStack>

  );
}
