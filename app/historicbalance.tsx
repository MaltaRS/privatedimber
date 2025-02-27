import { TouchableOpacity, View } from 'react-native'
import { useRouter } from "expo-router";

import { 
    Text,
    HStack,
    VStack,
 } from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import { StatusBar } from 'expo-status-bar';
import HeaderContainer from '../components/HeaderContainer'


export default function HistoricBalanceScreen() {
      const router = useRouter();


    const ItemListPayWallet = (title) => {
        return(
          <TouchableOpacity
          onPress={() => router.push("/detailinfomsg")}
          >
                <HStack 
                  style={{
                    alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 20 
                  }}  className="bg-white  mr-4 " >
                    <HStack style={{alignItems: 'center', justifyContent: 'space-between' }} >
                        <VStack  style={{marginLeft: 12}}  >
                            <Text bold size="15" color="#1F2937" >{title.name}</Text>
                            <Text size="14" style={{color: '#7D8697'}} >{title.description}</Text>
                        </VStack>
                    </HStack>

                    <Text 
                      bold size="16" color="#374151" >
                      -R$1.500,00
                    </Text>

                </HStack>
               <View style={{ marginTop: 20, width: '100%', height: 2, backgroundColor: '#f1f1f1', borderRadius: 10}} />
          </TouchableOpacity>
        )
      }

  return (
      <BaseContainer backgroundColor="#fff"  >

        <HeaderContainer name="Saldo a receber" />
        <Text 
          style={{fontSize: 15, marginTop: 20, marginBottom: 20, color: '#15161E'}} >
          Seu saldo a receber é de R$ 1.400,00, correspondente a mensagens nao lidas ou ainda 
          pendentes de resposta, dentro do prazo do direito de resposta
        </Text>

            <ItemListPayWallet
                name="Mensagem de Laura e Fernando R." 
                description="Disponivel em 19/11/2024" 
                />

             <ItemListPayWallet
              name="Mensagem de Bianca Mendes" 
              description="Disponivel em 19/11/2024" 
            /> 

            <ItemListPayWallet
             name="Mensagem de Bruna Marquezine" 
             description="Disponivel em 19/11/2024" 
          />

            <ItemListPayWallet
                name="Mensagem de Bruna Marquezine" 
                description="Disponivel em 19/11/2024" 
            />

      <StatusBar style="auto" />
    </BaseContainer>
  );
}