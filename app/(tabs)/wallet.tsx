import {View, TouchableOpacity, Image} from 'react-native'
import { useRouter } from "expo-router";

import { 
    Text,
    VStack,
    HStack,
    Heading,
 } from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import iconsake from '../../assets/images/iconsake.png'
import iconhand from '../../assets/images/iconhand.png'
import iconcartwallet from '../../assets/images/iconcartwallet.png'






const  WalletScreen = ()  => {
    const router = useRouter();
  
    const HeaaderInfosWallet = () => {
      return(
        <VStack 
          alignItems="center"
          justifyContent="center"
          style={{marginTop: 30}} >

                <View
                 style={{
                  width: 102, height: 28,
                  alignItems: 'center', justifyContent: 'center',
                  borderRadius: 30, borderWidth: 1, borderColor: '#999' 
                  }} >
                    <Text size="md" color="#999" bold >
                      Saldo Total
                    </Text>   
                </View>   

                <HStack 
                    style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}  >
                    <Heading size="4xl" >
                        R$ 7,023,99
                    </Heading>
                    <AntDesign name="circledowno" size={17} color="#999" style={{marginLeft: 5}} />
                </HStack>

                <HStack>
                    <Text 
                      size="md" >
                      Disponivel para uso  
                    </Text>

                    <Text bold size="md" style={{marginLeft: 5}} >
                      1.400,00S
                    </Text>
                </HStack>

        </VStack>
      );
  }


    const MiniButtonsWallet = (title) => {
      return(
        <TouchableOpacity
          onPress={() => router.push(title.nav)}
          style={{
            margin: 10,
            borderRadius: 300,
            backgroundColor: '#F9F9F9',
            width: 80, height: 80, 
            alignItems: 'center',
            justifyContent: 'center'}} 
          >

            
          <Image 
           source={title.icon}
           style={{width: 50, height: 50}}
           />
          <Text style={{fontSize: 15}} >{title.name}</Text>
       </TouchableOpacity>
      );
  }



    const ContainerMiniButtonsWallet = () => {
      return(
            <HStack 
                alignItems="center"
                justifyContent="center"
                style={{marginTop: 25, width: '100%'}} >

                <MiniButtonsWallet 
                  name="Sacar"
                  icon={iconsake}
                  nav="/sake"
                  />

                <MiniButtonsWallet 
                  name="Cartoes"
                  icon={iconcartwallet}
                  nav="/mycarts"
                  />

                <MiniButtonsWallet 
                  name="Doar"
                  icon={iconhand}
                  nav="/listinstituition"
                  />

            </HStack>
      );
}


  const ItemListPayWallet = (title) => {
        return(
          <View>
                <HStack 
                  style={{
                    alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 20 
                  }}  className="bg-white  mr-4 " >
                    <HStack style={{alignItems: 'center', justifyContent: 'space-between' }} >
                        <MaterialIcons name="attach-money" size={24} color="black" style={{marginRight: 2}} />
                        <VStack space="xs" style={{marginLeft: 12}}  >
                            <Text bold size="15"  >{title.name}</Text>
                            <Text size="14" style={{color: '#999'}} >{title.description}</Text>
                        </VStack>
                    </HStack>

                    <Text 
                      bold size="16" >
                      -R$1.500,00
                    </Text>

                </HStack>
        
               <View style={{ marginTop: 20, width: '100%', height: 2, backgroundColor: '#f1f1f1', borderRadius: 10}} />

          </View>
        )
      }



  const ContainerListPayWallet = () => {
      return(
        <VStack className="mt-5 p-2"  >

          <HStack style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', }}  >
            <TouchableOpacity
              onPress={() => router.push("/profileusermsg")} >
              <Heading size="25">Extrato</Heading>
            </TouchableOpacity>
                    
            <TouchableOpacity  
              onPress={() => router.push("/extractspay")} >  
              <Text color="#00A8FF"  >Ver extratoss</Text>
            </TouchableOpacity>

          </HStack>

            <ItemListPayWallet
              name="Pagamento de mensagem" 
              description="Envio para Camila Farani" 
            />

        </VStack>
      );
  }



    return(
        <BaseContainer>

          <MainTitle title="Carteira" />

          <HeaaderInfosWallet />
          <ContainerMiniButtonsWallet />
          <ContainerListPayWallet />
                   
        </BaseContainer>
    )
}

export default WalletScreen;



    


