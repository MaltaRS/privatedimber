import { StatusBar } from 'expo-status-bar';

import {View, TouchableOpacity, } from 'react-native'
import { useRouter } from "expo-router";

import { 
    Text,
    VStack,
    HStack,
    Image,
    Input,
    InputSlot,
    InputIcon,
    InputField,

 } from "@/gluestackComponents";

 import {
    Search,
} from "lucide-react-native";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from '../components/HeaderContainer'
import Row from "../components/Row";

 import MaterialIcons from '@expo/vector-icons/MaterialIcons';



export default function ListBlockUsers() { 
     const router = useRouter();
     const logoUser = "data:image/jpeg;base64,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"


    const ItemListProfile = () => {
        return(
            <View  >
    
                <HStack style={{width: '100%', alignItems: 'center',}}  >
                    <Image 
                        borderRadius={10}
                        source={{ uri: logoUser}} 
                        className="h-[60] w-[60] mr-3 "
                        alt="image"
                    />        

                    <TouchableOpacity 
                        onPress={() => router.push("/myprofile")}  >
                        <VStack marginLeft={20}  >
                            <HStack alignItems='center' >
                                <Text bold fontSize={16} >Neymar Junior</Text>
                                <MaterialIcons 
                                style={{paddingLeft: 4}}
                                name="verified" size={14} color="#00A8FF" 
                                />
                            </HStack>
                                <Text fontSize={15} >Atleta, Influencer</Text>
                                <Text fontSize={15} color="#00A8FF" >Desbloquear, </Text>
                        </VStack>
                    </TouchableOpacity>

                </HStack>
            <Row />
                
            </View>
        );
    }


   
    
      

    return(
        <BaseContainer >
          <HeaderContainer name="Bloqueados" />


            <Input
                mt="$2"
                variant="rounded"
                bgColor="#E5E7EB"
                size="xl"
                borderWidth={0}
                marginBottom={15}
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


            <ItemListProfile />
            <ItemListProfile />
            <ItemListProfile />
         

          <StatusBar style="auto" />
        </BaseContainer>

    );
}


    