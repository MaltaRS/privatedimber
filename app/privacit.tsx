
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useRouter } from "expo-router";

import { StatusBar } from 'expo-status-bar';
import HeaderContainer from '../components/HeaderContainer'

import { 
    Text,
    VStack,
    HStack,
    Switch
 } from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import Row from '../components/Row'


import AntDesign from '@expo/vector-icons/AntDesign';

export default function PrivacitScreen() {
    const router = useRouter();
    const [isSwitchOn, setIsSwitchOn] = useState(true);


  return (
      <BaseContainer backgroundColor="#fff"  >

        <HeaderContainer name="Privacidade" />


        <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={2} marginTop={30} >


          <TouchableOpacity onPress={() => router.push("/listblockusers")} >
            <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 30, marginBottom: 20, paddingRight: 10}}  >
              <Text fontSize={17} >Bloqueados</Text>
              <AntDesign name="right" size={18} color="black" />
            </HStack>
          </TouchableOpacity>




            <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 23, paddingRight: 5}}  >
              <Text style={{fontSize: 17}} >Mostrar online</Text>
              <Switch
                value={isSwitchOn}
                onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                trackColor={{ false: "#ccc", true: "#00A8FF" }}
                thumbColor={isSwitchOn ? "#fff" : "#00A8FF"}
                />
            </HStack>
            <Row />

              



                <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 23, paddingRight: 5}}  >
                 <Text style={{fontSize: 17}}>Mostrar ultima visualizacao</Text>
                 <Switch
                    value={isSwitchOn}
                    onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                    trackColor={{ false: "#ccc", true: "#00A8FF" }}
                    thumbColor={isSwitchOn ? "#fff" : "#00A8FF"}
                    />
                </HStack>
                <Row />


                <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 23, paddingRight: 5}}  >
                 <Text style={{fontSize: 17}}>Exibir estatisticas</Text>
                 <Switch
                    value={isSwitchOn}
                    onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                    trackColor={{ false: "#ccc", true: "#00A8FF" }}
                    thumbColor={isSwitchOn ? "#fff" : "#f4f4f4"}
                    />
                </HStack>
                <Row />

                <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 23, paddingRight: 5, marginBottom: 7}}  >
                 <Text style={{fontSize: 17}}>Modo ferias</Text>
                 <Switch
                    value={isSwitchOn}
                    onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                    trackColor={{ false: "#ccc", true: "#00A8FF" }}
                    thumbColor={isSwitchOn ? "#fff" : "#f4f4f4"}
                    />
                </HStack>
                <Row />


           
        </VStack>


                <Row />

    

              

      <StatusBar style="auto" />
    </BaseContainer>
  );
}