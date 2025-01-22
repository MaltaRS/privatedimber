import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, } from 'react-native';

import { 
    Text,
    Image,
    VStack,
    HStack,
    Box,
 } from "@/gluestackComponents";


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';


export default function ConfirmPayScreen() {

    const logoCard3 = 'data:image/png;base64,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'
    const logoPix2 ='data:image/png;base64,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'

    const ComponentTypePay = () => {
        <View style={{marginTop: 20}}  >

        </View>
    }

     
        const PayListComponent = (notific) => {
          return(
          <View   >
                  <HStack
                   style={{
                     borderWidth: 1, borderColor: '#f5f5f5',  padding: 15, borderRadius: 10,
                     alignItems: 'center',  justifyContent: 'space-between', marginTop: 20 
                    }}  className="bg-white  " >
                      <HStack style={{alignItems: 'center', justifyContent: 'space-between', }} >
                          
                          <VStack space="xs" >
                              <Text bold size="xl"  >{notific.name}</Text>
                          </VStack>
                      </HStack>
    
                      <Feather name="copy" size={24} color="#00A8FF" />
                  </HStack>

                  <VStack space="xs" style={{ marginTop: 30, width: '100%', alignItems: 'center'}}  >
                        <Text 
                            size="sm" style={{alignItems: 'center', textAlign: 'center', }} >
                            Finalize o pagamento em até 30 minutos para garantir o envio da mensagem.
                        </Text>

                    </VStack>

            
      
            </View>
          )
      }

    
const NotificationsComponent = (notific) => {
    return(
        <View  >
        <VStack  style={{padding: 12, }} >

            

        <VStack space="xs" style={{ marginTop: 40,}}  >
           <Text  bold size="4xl"  >{notific.name}</Text>
               <HStack>
                    <Text size="sm" >26 de setembro, 2024 as 18h21</Text>
                    <Text size="sm" >19h</Text>
                </HStack>
         </VStack>



         <VStack space="xs" style={{ marginTop: 30}}  >

               <HStack style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', marginTop: 15}}  >
                    <Text size="2xl"  bold >Detalhes do envio</Text>
                    
                    <AntDesign name="down" size={18} color="black" />
                </HStack>
                <VStack space="xs" style={{ marginTop: 30}}  >
                    <Text size="2xl"  bold >Forma de pagamento</Text>
                </VStack>

                <HStack style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', marginTop: 6}}  >
                    <Text size="sm" >Pix</Text>
                    <Text bold size="2x1" >R$ 1.400,00</Text>
                </HStack>


       

               

               

         </VStack>

         <View style={{ marginTop: 34, width: '100%', height: 2, backgroundColor: '#f2f2f2', borderRadius: 10}}  />


        <View style={{backgroundColor: '#f1f1f1', alignItems: 'center'}}  >
         <VStack space="xs" style={{ marginTop: 30, width: '100%', alignItems: 'center'}}  >
            <Image
            style={{width: 50, height: 30}}
            source={{
                uri: logoPix2
                }}
            />           
              <Text 
                  size="2xl" bold >Mensagem aguardando pagamento
              </Text>
               <Text 
                 style={{alignItems: 'center', textAlign: 'center',}} >
                 Copie o código Pix abaixo e cole no seu aplicativo bancário para concluir o pagamento.
               </Text>
         </VStack>

         <PayListComponent
                name="MAPPRVU71LFFABUEY5" 
                description="Selecione seu valor" 
                nav="profile"
                logo={logoPix2}
                />

        </View>





       
        
         
      </VStack>

      <View style={{ marginTop: 12, width: '100%', height: 2, backgroundColor: '#f2f2f2', borderRadius: 10}}  />

      <VStack style={{  width: '100%', alignItems: 'center', justifyContent: 'center'}}   >
         <Text style={{color: "#00A8FF", marginTop: 30 }} >Copiar codigo Pix</Text>
      </VStack>


      </View>
    )
}



  return (
    <View style={styles.container}>
      

       <NotificationsComponent
             name="Enviando mensagem para Camila Farani"    
             description="Você recebeu uma resposta de Camila Farani, Confira" 
             descnameinst="Nome da Instituicao" 
             nameinst="Instituto Neymar" 
        />

       

      
       

     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
