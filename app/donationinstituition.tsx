import {View, TouchableOpacity, StyleSheet} from 'react-native'

import { 
    Text,
    Heading,
    VStack,
    Avatar,
    AvatarImage,
    HStack,
    Input,
    InputField
 } from "@/gluestackComponents";

 import { BaseContainer } from '@/components/BaseContainer';
 import  ButtonPadrao  from "@/components/ButtonPadrao";
 import MaterialIcons from '@expo/vector-icons/MaterialIcons';




export default function DonationInstituitionValuescreen() { 
const logoInstituto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5z03a91O5qAqycFrTXVjaBcpy1rOjeBERaw&s"



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


    const PayInput = () => {
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
          <PayInput />

          <ButtonPadrao 
            nav="/saketype"
            name="Confirmar Doacao" 
           />
           <Text>Ola mundo</Text>


          <TouchableOpacity style={{width: '100%', alignItems: 'center'}}>

           <Text>Ola mundo</Text>

            
          </TouchableOpacity>
                    

           
            
        </BaseContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  buttonText: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
});



    