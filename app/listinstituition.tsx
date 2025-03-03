import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";

import {View, TouchableOpacity, } from 'react-native'
import { useRouter } from "expo-router";

import { 
    Text,
    VStack,
    HStack,
    Image,
 } from "@/gluestackComponents";

 import {
    Search,
} from "lucide-react-native";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from '../components/HeaderContainer'

 import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function ListInstituition() { 
     const router = useRouter();
     const logoInstituto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5z03a91O5qAqycFrTXVjaBcpy1rOjeBERaw&s"

    const ItemListProfile = () => {
        return(
            <View>
    
                <HStack style={{width: '100%', alignItems: 'center', }}  >
                    
                    <Image 
                     source={{ uri: logoInstituto}} 
                     className="h-[60] w-[60] mr-3"
                     alt="image"
                    />        

                    <TouchableOpacity 
                      onPress={() => router.push("/profileinstituition")}  >
                        <VStack marginLeft={20}  >
                            <HStack alignItems='center' >
                                <Text bold fontSize={16} >Instituto Neymar</Text>
                                <MaterialIcons 
                                style={{paddingLeft: 4}}
                                name="verified" size={14} color="#00A8FF" 
                                />
                            </HStack>
                                <Text fontSize={15} >Esporte, Criancas * Rio de Janeiro</Text>
                        </VStack>
                    </TouchableOpacity>

                </HStack>

            </View>
        );
    }


   
    
      

    return(
        <BaseContainer >
          <HeaderContainer title="Doar" />

            <ItemListProfile />
            <ItemListProfile />
            <ItemListProfile />
            <ItemListProfile />
            <ItemListProfile />
            <ItemListProfile />

          <StatusBar style="auto" />
        </BaseContainer>

    );
}


    