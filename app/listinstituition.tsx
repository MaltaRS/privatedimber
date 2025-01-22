import {View, TouchableOpacity} from 'react-native'
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
import { MainTitle } from "@/components/MainTitle";
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
                        <VStack>
                            <HStack alignItems='center' >
                                <Text bold size="17" >Instituto Neymar</Text>
                                <MaterialIcons 
                                style={{paddingLeft: 4}}
                                name="verified" size={14} color="#00A8FF" 
                                />
                            </HStack>
                                <Text size="13" >Esporte, Criancas * Rio de Janeiro</Text>
                        </VStack>
                    </TouchableOpacity>


                </HStack>

            </View>
        );
    }


   
    
      

    return(
        <BaseContainer >
          <MainTitle title="Doar" />


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

            <ItemListProfile />
            <ItemListProfile />
            <ItemListProfile />
            <ItemListProfile />
            <ItemListProfile />
            <ItemListProfile />


        </BaseContainer>

    );
}


    