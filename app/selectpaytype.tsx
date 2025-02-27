import { StatusBar } from 'expo-status-bar';
import { View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";

import { 
    Text,
    VStack,
    HStack,
    Heading
 } from "@/gluestackComponents";
 
import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";
import  HeaderContainer from "@/components/HeaderContainer";

import  ButtonPadrao  from "@/components/ButtonPadrao";

import  Row  from "../components/Row"

import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';




export default function SelectPayTypeScreen() {

  const router = useRouter();
  
  const logoCard4 = 'data:image/png;base64,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'
  const logoCard3 = 'data:image/png;base64,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'
  const logoCard2 = 'data:image/jpeg;base64,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'
  const logoCard = 'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png'
  const logoCardVisa = "https://e7.pngegg.com/pngimages/686/207/png-clipart-visa-logo-credit-card-american-express-jcb-co-ltd-visa-blue-text-thumbnail.png"
    
    const CartContainer = (title) => {
      return(
        <View >
          <TouchableOpacity onPress={() => router.push(title.nav)}  >


              <HStack
                style={{
                    borderWidth: 1, borderColor: '#999',  padding: 15, borderRadius: 10,
                    alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 20 
                    }} >
                    <HStack justifyContent="center" alignItems="center" >
                    <Feather name="circle" size={24} color="black" style={{marginRight: 5}} />

                        <Image
                            style={{width: 30, height: 30}}
                            source={{
                             uri: title.logo
                            }}
                        />
                        <VStack space="xs" marginLeft={12} >
                            <Text bold size="16"  >{title.name}</Text>
                            <Text size="15" color="#999" >{title.description}</Text>
                        </VStack>
                    </HStack>

               </HStack>
          </TouchableOpacity>


              <Row />
  
        </View>
      );
  }


  const ContainerNewCart = (notific) => {
    return(
      <TouchableOpacity onPress={() => router.push("/mycarts")}  >
            <HStack
              style={{
                  borderWidth: 1, borderColor: '#999',  padding: 15, borderRadius: 10,
                  alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 20 
                  }} >
                  <HStack 
                   justifyContent="center" 
                   alignItems="center" 
                   >

                      <SimpleLineIcons name="wallet" size={24} color="black" />        

                      <VStack space="xs" marginLeft={12} >
                          <Text bold size="16"  >Pagar com outro cartao</Text>
                          <Text size="15" color="#999" >Selecione seu banco</Text>
                      </VStack>
                 </HStack>
            </HStack>

            <Row />

      </TouchableOpacity>
    );
}




  return (
    <BaseContainer backgroundColor="#fff" >
       <VStack className="mt-5 " >

            <MainTitle  title="Selecione o Cartao" />
            <HeaderContainer name="Pagamentos"  />
            
            <Heading style={{fontSize: 15, marginTop: 20}}  >
                Você está utilizando R$ 402,00 do seu saldo,o valor restante de R$ 638,00 será cobrado no cartão de crédito selecionado.
            </Heading>

            
            <CartContainer
             name="Credito" 
             description="R$ 1,402,00" 
             nav="/confirmpaymsg"
             logo={logoCard}
            />

         

                
            <CartContainer
             name="Cartão de Credito" 
             description="Visa crédito ••••6143"  
             nav="profile"
             logo={logoCardVisa}
            />

            <ContainerNewCart logo={logoCard4} />

            <ButtonPadrao 
              nav="/confirmpaymsg"
              name="Continuar"  />

        </VStack>

        

      <StatusBar style="auto" />
    </BaseContainer>
  );
}