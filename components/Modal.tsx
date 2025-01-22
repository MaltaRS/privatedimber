import { View, ScrollView,  } from 'react-native';

import { 
    Text,
    VStack,
    HStack,
    Heading,
    Box,
    Button,
    ButtonText
 } from "@/gluestackComponents";

 import AntDesign from '@expo/vector-icons/AntDesign';


export default function ModalScreen() {


    const ModalComponent = (notific) => {
          return(
             <View style={{}} > 
                  <HStack
                   style={{
                     alignItems: 'center',  justifyContent: 'space-between', marginTop: 20 
                    }}  className="bg-white  mr-4 " >
                          
                        <VStack  style={{marginLeft: 12, width: '100%'}} >
                            <Heading size="md" className="mb-4">
                            Cancelar Mensagem ?
                            </Heading>
                                
                            <Text size={17}  >{notific.place}</Text>            
                        </VStack>

                        <VStack className="mb-6">
                            <Heading size={24} className="mb-4"  >
                               Cancelar Mensagem ?
                            </Heading>
                       </VStack>
                  </HStack>

            <Box style={{ width: '100%', alignItems: 'center', justifyContent: 'center'}}  >
                <Button 
                 style={{
                    width: 356, height: 48,
                    backgroundColor: '#C82844', borderRadius: 40, marginTop: 20}}  >
                    <ButtonText size={19} >Apagar Conversas</ButtonText>
                </Button>
            </Box>

            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10}} >
               <Text  >Cancelar</Text>            
            </View>
        
            </View>
          )
      }
    

      const TextOptions = (notific) => {
        return(
           <View> 
             
                <HStack
               style={{
                 padding: 15, borderRadius: 10,
                 alignItems: 'center', width: '100%', justifyContent: 'space-between', 
                }}  className="bg-white  mr-4 " >
                  <HStack style={{alignItems: 'center', justifyContent: 'space-between', }} >
                      
                      <VStack space="xs" style={{marginLeft: 12}}  >
                          <Text>{notific.name}</Text>
                      </VStack>
                  </HStack>

                  <AntDesign name="right" size={24} color="black" />

              </HStack>

          </View>
        )
    }
  



    


  return (
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}  >

      <View style={{flex: 1, backgroundColor: '#FFF', }}  >


        <VStack style={{marginTop: 20}} >

        <VStack  style={{ width: '100%', padding: 15}} >

            <Heading size="md" >
              Denunciar Usuario
            </Heading>
            <Text>
                Se este usuário teve um comportamento inadequado, selecione o motivo da denúncia. Sua identidade não será revelada.
            </Text>

                              
        </VStack>

            


            <TextOptions
            name="Comportamento improprio" />

            <TextOptions
            name="Assedio ou abuso verbal" />


            <TextOptions
            name="Conteudo ofensivo ou inapropriado" />


            <TextOptions
            name="Falsificacao de identidade" />

            <TextOptions
            name="Golpe ou Fraude" />

            <TextOptions
            name="Comportamento improprio" />
 

            <ModalComponent
            name="Assedio ou abuso verbal" 
            place="Você está prestes a cancelar o envio da mensagem paga para Virgínia Fonseca."
            nav="profile" />

        </VStack>

        
      </View>
    </ScrollView>


  );
}
