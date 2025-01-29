import { TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from "expo-router";


import { BaseContainer } from "@/components/BaseContainer";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';




import { 
    Text,
    Heading,
    VStack,
    HStack,
    Image,

 } from "@/gluestackComponents";
import { MainTitle } from '@/components/MainTitle';


export default function SakeTypeScreen() {

    const router = useRouter();
    const logoCard = 'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png'

     const CartContainer = (title) => {
      return(
        <View  >
            <TouchableOpacity onPress={() => router.push(title.nav)}  >

              <HStack
                style={{
                    borderWidth: 1, borderColor: '#999',  padding: 15, borderRadius: 10,
                    alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 20 
                    }} >
                    <HStack justifyContent="center" alignItems="center" >
                    <Entypo name="wallet" size={24} color="black" />
                        <VStack space="xs" marginLeft={12} >
                            <Text bold size="15"  >{title.name}</Text>
                            <Text size="15" color="#999" >{title.description}</Text>
                        </VStack>
                    </HStack>

                  <Feather name="more-vertical" size={24} color="black" />
               </HStack>

               </TouchableOpacity>


  
        </View>
      );
  }


  return (
    <BaseContainer>

      <MainTitle title="Pagamento" />
      <Heading style={{fontSize: 15, marginTop: 20}}  >Selecione a melhor opção que deseja realizar o pagamento</Heading>

      <CartContainer
        name="Saldo na Carteira " 
        description="R$ 1400,00" 
        nav="/selectpaytype"
      />      

        <CartContainer
        name="Cartao de Credito" 
        nav="/saketype"
      />      

    <CartContainer
        name="Pix" 
        nav="/comprovantpix"
      />      
     
      <StatusBar style="auto" />
    </BaseContainer>
  );
}


