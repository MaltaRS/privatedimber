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
 import HeaderContainer from "@/components/HeaderContainer";
 import  ButtonPadrao  from "@/components/ButtonPadrao";
 import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function DonationInstituitionValuescreen() { 
const logoInstituto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5z03a91O5qAqycFrTXVjaBcpy1rOjeBERaw&s"

    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonOpacity] = useState(new Animated.Value(0.3));

    const HeaderInfoProfile = () => {
      return(
        <View style={{alignItems: 'center', marginTop: 70}} >

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

            <Text className="text-sm font-normal  text-typography-900" >
              Esportes, Criancas * Santos - SP
            </Text>

            <View style={{ marginTop: 25, width: '100%', height: 3, backgroundColor: '#f2f2f2', borderRadius: 10}}  />

        </View>
      );
    }

    return(
        <BaseContainer className=" flex-1" >
          <HeaderContainer title="Doação" />
          <HeaderInfoProfile />
          
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
  confirmButton: {
      width: 358,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00A8FF',
      borderRadius: 40,
  }
});