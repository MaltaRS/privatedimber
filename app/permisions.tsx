
import { useState } from 'react';

import { 
    Text,
    HStack,
    Switch
 } from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";
import Row from '../components/Row'
import { StatusBar } from 'expo-status-bar';
import HeaderContainer from '../components/HeaderContainer'


import Entypo from '@expo/vector-icons/Entypo';


export default function PermisionsScreen() {
    const [isSwitchOn, setIsSwitchOn] = useState(true);


  return (
      <BaseContainer backgroundColor="#fff"  >

        <HeaderContainer title="Permissões" />


                <Text bold style={{fontSize: 17}} marginTop={20} >
                Anexo
                </Text>


                <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 20}}  >
                 <Text  style={{fontSize: 17}} >Permitir Anexo</Text>
                 <Switch
                    value={isSwitchOn}
                    onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                    trackColor={{ false: "#ccc", true: "#00A8FF" }}
                    thumbColor={isSwitchOn ? "#fff" : "#00A8FF"}
                    />
                </HStack>

                 <Text style={{fontSize: 19}} bold marginTop={30}>Midia</Text>


                <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 20}}  >
                 <Text style={{fontSize: 17}} >Permitir video</Text>
                 <Switch
                    value={isSwitchOn}
                    onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                    trackColor={{ false: "#ccc", true: "#00A8FF" }}
                    thumbColor={isSwitchOn ? "#fff" : "#f4f4f4"}
                    />
                </HStack>


                <HStack alignItems="center" justifyContent="space-between"  marginBottom={28} marginTop={35} >
                 <Text style={{fontSize: 17}} >Ativado</Text>

                 <Entypo name="circle" size={18} color="black" />
                </HStack>


                <HStack alignItems="center" justifyContent="space-between" >
                 <Text style={{fontSize: 17}} >Desativado</Text>

                 <Entypo name="circle" size={18} color="black" />
                </HStack>

               

                <Row />

                <Text style={{fontSize: 19}} bold marginTop={20}>Permitir fotos</Text>
                <Text size="17" marginTop={15}  >Limite de fotos ( foto unica ) </Text>


                <HStack alignItems="center" justifyContent="space-between"  marginBottom={28} marginTop={25} >
                    <Text style={{fontSize: 17}} >Ativado</Text>
                    <Entypo name="circle" size={18} color="black" />
                </HStack>

                <HStack alignItems="center" justifyContent="space-between"  marginBottom={28}  >
                    <Text style={{fontSize: 17}} >Desativado</Text>
                    <Entypo name="circle" size={18} color="black" />
                </HStack>


                <Text style={{fontSize: 19}} bold marginTop={20}>Direito de respostas</Text>
                <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 20}}  >
                    <Text style={{fontSize: 17}} >Conceder resposta</Text>
                    <Switch
                        value={isSwitchOn}
                        onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                        trackColor={{ false: "#ccc", true: "#00A8FF" }}
                        thumbColor={isSwitchOn ? "#fff" : "#f4f4f4"}
                        />
                </HStack>

      <StatusBar style="auto" />
    </BaseContainer>
  );
}