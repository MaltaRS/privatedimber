import { useState } from 'react';

import { 
    Text,
    HStack,
    VStack,
    Switch
 } from "@/gluestackComponents";

 import { StatusBar } from 'expo-status-bar';

import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";
import  HeaderContainer  from "@/components/HeaderContainer";


export default function ConfigNotificScreen() {
    const [isSwitchOn, setIsSwitchOn] = useState(false);


  return (
      <BaseContainer backgroundColor="#fff" >

        <HeaderContainer name="Notificações" />

            <Text style={{fontSize: 17,}} color='#15161E' marginTop={30} bold >Notificações de mensagens</Text>

            <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={2}  alignItems="center" padding={10} marginTop={15}  >
                <HStack  style={{width: '100%', justifyContent: 'space-between', alignItems:"center", paddingTop: 7, paddingBottom: 7 }} >
                 <Text fontFamily="$novaBody"  style={{fontSize: 17}} >Mostrar notificações</Text>
                 <Switch
                    value={isSwitchOn}
                    onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                    trackColor={{ false: "#ccc", true: "#00A8FF" }}
                    thumbColor={isSwitchOn ? "#fff" : "#f4f4f4"}
                    />
                </HStack>
            </VStack>

            <Text style={{fontSize: 17,}} color='#15161E' marginTop={30} bold >Notificações de mensagens</Text>





           <VStack bgColor="#fff"  >

            <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={2}  alignItems="center" padding={10} marginTop={15}  >
                <HStack  style={{width: '100%', justifyContent: 'space-between', alignItems:"center", paddingTop: 7, paddingBottom: 7 }} >
                <Text fontFamily="$novaBody"  style={{fontSize: 17}} >Solicitacao de mensagens</Text>
                <Switch
                    value={isSwitchOn}
                    onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                    trackColor={{ false: "#ccc", true: "#00A8FF" }}
                    thumbColor={isSwitchOn ? "#fff" : "#f4f4f4"}
                    />
                </HStack>
            </VStack>

            <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={2}  alignItems="center" padding={10} marginTop={15}  >
                <HStack  style={{width: '100%', justifyContent: 'space-between', alignItems:"center", paddingTop: 7, paddingBottom: 7 }} >
                <Text fontFamily="$novaBody"  style={{fontSize: 17}} >Pagamentos</Text>
                <Switch
                    value={isSwitchOn}
                    onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                    trackColor={{ false: "#ccc", true: "#00A8FF" }}
                    thumbColor={isSwitchOn ? "#fff" : "#f4f4f4"}
                    />
                </HStack>
            </VStack>

            <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={2}  alignItems="center" padding={10} marginTop={15}  >
                <HStack  style={{width: '100%', justifyContent: 'space-between', alignItems:"center", paddingTop: 7, paddingBottom: 7 }} >
                <Text fontFamily="$novaBody"  style={{fontSize: 17}} >Suporte</Text>
                <Switch
                    value={isSwitchOn}
                    onValueChange={() => setIsSwitchOn(!isSwitchOn)}
                    trackColor={{ false: "#ccc", true: "#00A8FF" }}
                    thumbColor={isSwitchOn ? "#fff" : "#f4f4f4"}
                    />
                </HStack>
            </VStack>


          </VStack>





      <StatusBar style="auto" />
    </BaseContainer>
  );
}