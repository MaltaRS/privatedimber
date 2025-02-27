import { StatusBar } from 'expo-status-bar';

import {View, TouchableOpacity, } from 'react-native'
import { useRouter } from "expo-router";

import { 
    Text,
    VStack,
    HStack,
    Image

 } from "@/gluestackComponents";

 import {
    Search,
} from "lucide-react-native";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from '../components/HeaderContainer'
import Row from "../components/Row";

import AntDesign from '@expo/vector-icons/AntDesign';


export default function ConfigSecurityScreen() { 
     const router = useRouter();

    const ItemListProfile = (title) => {
        return(
            <TouchableOpacity onPress={() => router.push(title.nav)} >
                <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 30, marginBottom: 20, paddingRight: 10}}  >
                    <Text fontSize={17} >{title.name}</Text>
                    <AntDesign name="right" size={18} color="black" />
                </HStack>
                <Row />
           </TouchableOpacity>
        );
    }


      

    return(
        <BaseContainer >
          <HeaderContainer name="Seguranca" />
          <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={2} marginTop={30} >

          <ItemListProfile name="Alterr senha"  nav="/changepassword" />
          <ItemListProfile name="Ativar seguranca 2FA" nav="/configsecurity2fa"  />

          </VStack>

          <StatusBar style="auto" />
        </BaseContainer>

    );
}


    