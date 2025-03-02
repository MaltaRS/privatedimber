import {View, TouchableOpacity, Image} from 'react-native'
import { useRouter } from "expo-router";
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNotifications } from "@/hooks/NotificationHook";
import { 
    Text,
    VStack,
    HStack,
    Divider,
    Heading,
 } from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import iconsake from '../../assets/images/iconsake.png'
import iconhand from '../../assets/images/iconhand.png'
import iconcartwallet from '../../assets/images/iconcartwallet.png'
import iconlistpay from '../../assets/images/iconlistpay.png'

const WalletScreen = () => {
    const router = useRouter();
    const [isBalanceHidden, setIsBalanceHidden] = useState(false);
    const { notificationsCount } = useNotifications();
    const HeaderInfosWallet = () => {
      return(
        <VStack 
          alignItems="center"
          justifyContent="center"
          style={{marginTop: 30}} >

                <TouchableOpacity
                   onPress={() => router.push("/totalbalance")}
                   style={{
                     width: 102, height: 28,
                     alignItems: 'center', justifyContent: 'center',
                     borderRadius: 30, borderWidth: 1, borderColor: '#999' 
                    }} >
                    <Text fontSize={13} color="#999" bold >
                      Saldo Total
                    </Text>   
                </TouchableOpacity>   

                <HStack 
                    style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}  >
                    <Heading size="4xl" >
                        {isBalanceHidden ? '****' : 'R$ 7,023,99'}
                    </Heading>

                    <TouchableOpacity  onPress={() => setIsBalanceHidden(!isBalanceHidden)}>
                        <AntDesign name="eye" size={24} color="#999" marginLeft={10} />
                    </TouchableOpacity>
                </HStack>

                <HStack>
                    <Text 
                      size="md" >
                      Disponível para uso  
                    </Text>

                    <Text bold size="md" style={{marginLeft: 5}} >
                      {isBalanceHidden ? '****' : '1.400,00S'}
                    </Text>
                </HStack>


        </VStack>
      );
  }

    const MiniButtonsWallet = (title) => {
      return(
        <VStack alignItems="center" justifyContent="center">

        <TouchableOpacity
          onPress={() => router.push(title.nav)}
          style={{
           
            borderRadius: 300,
            backgroundColor: '#F9F9F9',
            width: 56, height:56, 
            alignItems: 'center',
            justifyContent: 'center'}}  
          > 
          <Image 
           source={title.icon}
           style={{width: 56, height:56}}
           />
       </TouchableOpacity>
       
       <Text style={{fontSize: 15}} >{title.name}</Text>


       </VStack>
      );
  }

    const ContainerMiniButtonsWallet = () => {
      return(
            <HStack 
                alignItems="center"
                justifyContent="center"
                pt="$6" gap="25">

                <MiniButtonsWallet 
                  name="Sacar"
                  icon={iconsake}
                  nav="/sake"
                  />

                <MiniButtonsWallet 
                  name="Cartões"
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
                      <Image 
                        source={iconlistpay}
                        style={{width: 25, height: 25, marginRight: 2}}
                      />
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
          </View>
        )
      }


      



  const ContainerListPayWallet = () => {
      return(
        <VStack style={{width: '100%', marginTop: 30}} >

          <HStack style={{width: '100%', alignItems: 'center', justifyContent: 'space-between',}}  >
            <TouchableOpacity
              onPress={() => router.push("/confignotific")} >
              <Heading size="25">Extrato</Heading>
            </TouchableOpacity>

            <TouchableOpacity  
              onPress={() => router.push("/extractspay")} >  
              <Text color="#00A8FF"  >Ver extrato</Text>
            </TouchableOpacity>
          </HStack>

          <VStack>
            <ItemListPayWallet
              name="Pagamento de mensagem" 
              description="Envio para Camila Farani" 
            />
         </VStack>

        </VStack>
      );
  }

    return(
        <BaseContainer>
          <StatusBar style="auto" />
             <MainTitle
                             title="Carteira"
                             onPress={() => router.push("/notifications")}
                             notificationsCount={notificationsCount}
                         />
          <HeaderInfosWallet />
          <ContainerMiniButtonsWallet />
            <Divider bgColor="$gray300"  marginTop="16"/>
          <ContainerListPayWallet />

        </BaseContainer>
    )
}

export default WalletScreen;