import { StatusBar } from 'expo-status-bar';
import React, {useState } from 'react'
import { useRouter } from "expo-router";
import {View, TouchableOpacity, StyleSheet, TextInput} from 'react-native'

import { 
    Text,
    VStack,
    HStack,
    Input,
    InputSlot,
    InputIcon,
    InputField,
    Modal,
    Image
 } from "@/gluestackComponents";
 import {
    Search,
} from "lucide-react-native";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from '../components/HeaderContainer'
import { MainTitle } from "@/components/MainTitle";

 import MaterialIcons from '@expo/vector-icons/MaterialIcons';
 import FontAwesome from '@expo/vector-icons/FontAwesome';
 import iconlistpay from '../assets/images/iconlistpay.png'


export default function ExtractsPay() { 
      const [modalVisible, setModalVisible] = useState(false);
    
     const MiniButtonsWallet = (title) => {
        return(
         <TouchableOpacity
            onPress={() => { 
              setModalVisible(true); 
            }} 
            style={{
               marginTop: 20,
               borderRadius: 300, backgroundColor: '#fff', width: 150, height: 36, alignItems: 'center', justifyContent: 'center'}} >
            <HStack alignItems="center"  >
                <FontAwesome name={title.icon} size={15} color="black" />
                <Text size="0"  >{title.name}</Text>
            </HStack>    

         </TouchableOpacity>

        );
    }

    const ContainerCategoryPay = () => {
        return(
         <HStack>
            <MiniButtonsWallet
              name="Periodo"
              icon="bank" />

            <MiniButtonsWallet
              name="Pagamento"
              icon="bank" />

            <MiniButtonsWallet
              name="Estorno"
              icon="bank" />
            
         </HStack>
        );
    }
  

   
    const ItemListPayWallet = (title) => {
        return(
          <View>
                <HStack 
                  style={{
                    alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 20 
                  }}  >
                    
                    <HStack 
                      alignItems="center"
                      justifyContent="space-between" >
                        <Image 
                           source={iconlistpay}
                           style={{width: 25, height: 25}}
                        />
                        
                        <VStack style={{marginLeft: 12}}  >
                            <Text bold size="15" >{title.name}</Text>
                            <Text size="14" color="#999" >{title.description}</Text>
                        </VStack>
                    </HStack>

                    <Text 
                       bold size="15" >
                      -R$1.500,00
                    </Text>

                </HStack>
        
               <View style={{ marginTop: 15, width: '100%', height: 2, backgroundColor: '#f1f1f1', borderRadius: 10}} />

          </View>
        )
      }
      

    return(
        <BaseContainer >
          <HeaderContainer name="Sacar" />

            <Input
                mt="$2"
                variant="rounded"
                bgColor="#E5E7EB"
                size="xl"
                borderWidth={0}
            >
                <InputSlot bgColor="#E5E7EB" pl="$5" pt="$1">
                    <InputIcon>
                        <Search size={20} color="#6B7280" />
                    </InputIcon>
                </InputSlot>
                <InputField
                    pl="$3"
                    bgColor="#E5E7EB"
                    placeholder="Pesquisar"
                    placeholderTextColor="#6B7280"
                    size="lg"
                />
            </Input>

            <ContainerCategoryPay />

        
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <Modal.Content style={styles.modalBottom}>
                <Modal.Header>
                    <Text style={styles.modalTitle}>Filtrar por periodo</Text>
                </Modal.Header>
                <HStack justifyContent='space-between' padding={10} >
                    <Text style={styles.modalBody}>Ultimos 15 dias.</Text>
                    <Text style={styles.modalBody}>Ultimos 30 dias.</Text>
                </HStack>

                <HStack justifyContent='space-between' padding={10} >
                    <Text style={styles.modalBody}>Ultimos 60 dias.</Text>
                    <Text style={styles.modalBody}>Ultimos 90 dias.</Text>
                </HStack>

                <Modal.Footer>
                <HStack style={{width: '100%'}} >

                    <VStack  
                      style={{ width: '45%', borderWidth: 1,  borderColor: '#999',  paddingTop: 10, paddingBottom: 10,  borderRadius: 10,  alignItems: 'center', marginRight: 15
                      }} 
                    >
                    <Input 
                      borderColor="#fff"
                      size="lg" >

                      <InputField 
                        fontSize={15}
                        placeholder="De"
                      />
                    </Input>     
                    </VStack>

                    <VStack  
                      style={{ width: '45%', borderWidth: 1,  borderColor: '#999',  paddingTop: 10, paddingBottom: 10,  borderRadius: 10,  alignItems: 'center',  marginRight: 15
                      }} 
                    >
                    <Input 
                      borderColor="#fff"
                      size="lg" >

                      <InputField 
                        fontSize={15}
                        placeholder="Até"
                      />
                    </Input>     
                    </VStack>
                </HStack>


                <VStack alignItems="center" marginTop={40}>
                  <TouchableOpacity 
                      onPress={() => {setModalVisible(false);}}
                      style={styles.confirmButton} >
                      <Text color="white">Filtrar</Text>
                  </TouchableOpacity>
                  <Text color="blue">Cancelar</Text>
                </VStack>
                  </Modal.Footer>
              </Modal.Content>
        </Modal>


         
            <ItemListPayWallet
              name="Pagamento de mensagem" 
              description="Envio para Camila Farani" 
            />

            <ItemListPayWallet
              name="Pagamento de mensagem" 
              description="Envio para Camila Farani" 
            />

            <ItemListPayWallet
              name="Pagamento de mensagem" 
              description="Envio para Camila Farani" 
            />

            <ItemListPayWallet
              name="Pagamento de mensagem" 
              description="Envio para Camila Farani" 
            />

            <ItemListPayWallet
              name="Pagamento de mensagem" 
              description="Envio para Camila Farani" 
            />
          <StatusBar style="auto" />

        </BaseContainer>

    );
}

    const styles = StyleSheet.create({
      optionContainer: {
          marginTop: 20,
          padding: 15,
          borderWidth: 1,
          borderColor: '#999',
          borderRadius: 10,
          alignItems: 'center'
      },
      input: {
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginTop: 10,
          borderRadius: 5
      },
      confirmButton: {
          width: 358,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00A8FF',
          borderRadius: 40,
      },
      floatingButtonContainer: {
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          alignItems: 'center',
      },
      modalBottom: {
          position: "absolute",
          bottom: 0,
          paddingTop: 12,
          width: "100%",
          backgroundColor: "white",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
      },
      modalTitle: {
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
      },
      modalBody: {
          fontSize: 16,
          margin: 2
      },
    });
    
        
        