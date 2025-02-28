import {TouchableOpacity, } from 'react-native'
import { useRouter } from "expo-router";

import { 
    Text,
    HStack,
    VStack,
 } from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import { StatusBar } from 'expo-status-bar';
import HeaderContainer from '../components/HeaderContainer'



export default function TotalBalanceScreen() {
      const router = useRouter();
      const logoCard4 = 'data:image/png;base64,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'


    const ContainerNewCart = (title) => {
        return(
          <TouchableOpacity
             onPress={() => router.push("/historicbalance")}
          >
                <HStack
                  style={{
                    borderWidth: 1, borderColor: '#d6d6d6',  padding: 15, borderRadius: 10,
                    alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 20 
                    }} >
                        <VStack space="xs" marginLeft={12} style={{width: '100%', paddingRight: 50}} >
                            <Text bold fontSize={20}  >R$ 1.400,00</Text>
                            <Text bold fontSize={17} marginTop={12} >Disponivel</Text>
                            <Text fontSize={15} color="#999" >O valor total ja foi liberado e está pronto para ser utilizado</Text>
                        </VStack>
                 </HStack>
          </TouchableOpacity>
        );
    }

  return (
      <BaseContainer backgroundColor="#fff"  >

        <HeaderContainer title="Saldos" />

        <ContainerNewCart logo={logoCard4} />
        <ContainerNewCart logo={logoCard4} />
        <ContainerNewCart logo={logoCard4} />
        <ContainerNewCart logo={logoCard4} />

      <StatusBar style="auto" />
    </BaseContainer>
  );
}