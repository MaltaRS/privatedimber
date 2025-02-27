import React, {useState } from 'react'
import { useRouter } from "expo-router";

import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native'

import { 
    Text,
    Heading,
    VStack,
    Avatar,
    AvatarImage,
    HStack,
    Input,
    InputField,
    Modal
 } from "@/gluestackComponents";

 import { BaseContainer } from '@/components/BaseContainer';
 import  ButtonPadrao  from "@/components/ButtonPadrao";
 import MaterialIcons from '@expo/vector-icons/MaterialIcons';




export default function DonationInstituitionValuescreen() { 
const logoInstituto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5z03a91O5qAqycFrTXVjaBcpy1rOjeBERaw&s"


    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonOpacity] = useState(new Animated.Value(0.3));




    const HeaderInfoProfile = () => {
      return(
        <View 
         style={{alignItems: 'center', marginTop: 70}} >

            <Avatar className="mt-7 ">
              <AvatarImage 
                className="w-[80px] h-[80px] mt-10"
                source={{uri: logoInstituto}}
              />
            </Avatar>

            <HStack alignItems="center" >
                
                <Heading size="lg" className="mb-1 mt-10" >
                  Instituto Neymar
                </Heading>

                <MaterialIcons name="verified" size={20} color="#00A8FF" style={{paddingLeft: 4}} />

            </HStack>

            <Text 
                className="text-sm font-normal  text-typography-900" >
              Esportes, Criancas * Santos - SP
            </Text>

            <View style={{ marginTop: 25, width: '100%', height: 3, backgroundColor: '#f2f2f2', borderRadius: 10}}  />

        </View>
      );
    }


    const SelectValueInput = () => {
      return(
      <View style={{marginTop: 20}}  >

        <Text>
          Escolha o valor que deseja doar e ajude a transformar vidas
        </Text>

          <HStack
               style={{
                 width: '100%',
                 alignItems: 'center',
                 borderWidth: 1, 
                 borderColor: '#999',  
                 paddingTop: 10, 
                 paddingBottom: 10, 
                 borderRadius: 10,
                marginTop: 40
                }} >

              <HStack alignItems="center" justifyContent="space-between" >
                      <VStack  
                        style={{width: '90%', alignItems: "center", justifyContent: 'center'}} >
                          <Input 
                            borderColor="#fff"
                            size="lg" >

                            <InputField 
                             fontSize={15}
                             placeholder="Insira um Valor"
                            />
                          </Input>             
                      </VStack>
              </HStack>

                   <Text size="15" style={{ color: "#00A8FF"}} >max</Text>

              </HStack>

              <VStack>
                <HStack style={{width: '100%', alignItems: 'center', marginTop: 10 }} >
                  <Text style={{fontSize: 15}} >Saldo disponivel: </Text>
                  <Heading style={{fontSize: 15}}>R$ 1.400,00</Heading>
                </HStack>
            </VStack>
            
  
        </View>
      )
  }

    return(
        <BaseContainer className=" flex-1" >

          <HeaderInfoProfile />
          <SelectValueInput />
          
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <Modal.Content style={styles.modalBottom}>
                    <Modal.Header>
                        <Text style={styles.modalTitle}>Confirmação de doação</Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Text style={styles.modalBody}>Você está prestes a doar R$ 500,00 para Instituto Neymar. Deseja confirmar essa ação? Sua contribuição fará a diferença.</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <VStack alignItems="center" marginTop={20}>
                            <TouchableOpacity 
                                onPress={() => {
                                    router.push("/comprovantpix");
                                    setModalVisible(false);
                                }}
                                style={styles.confirmButton}
                            >
                                <Text color="white">Confirmar</Text>
                            </TouchableOpacity>
                        </VStack>
                    </Modal.Footer>
                </Modal.Content>
          </Modal>
          
          <VStack style={{width: '100%', marginBottom: 280}}>
              <HStack marginTop={20}  >
                  <Text color="#000" paddingRight={15}  >R$ 300,00</Text>
                  <Text color="#000" paddingRight={15}  >R$ 300,00</Text>
                  <Text color="#000" paddingRight={15}  >R$ 300,00</Text>
              </HStack>
          </VStack>

            <VStack alignItems="center" marginTop={20}>

                <TouchableOpacity 
                onPress={() => { 
                  setModalVisible(true); 
                }}
                  style={{width: 358,
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#00A8FF',
                    borderRadius: 40,}}
                  >
                           
                    <Text color="white" >Confirmar</Text> 
       
                </TouchableOpacity>

                </VStack>
         
                
            
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
      margin: 4,
  },
});

    