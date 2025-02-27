import { TouchableOpacity, } from 'react-native';

import { 
    Text,
    VStack,
    HStack
 } from "@/gluestackComponents";

 import { StatusBar } from 'expo-status-bar';
 import HeaderContainer from '../components/HeaderContainer'

 import Entypo from '@expo/vector-icons/Entypo';

import { BaseContainer } from "@/components/BaseContainer";
import Row from '../components/Row'


export default function EditCategorysMyProfileScreen() {


    const CategoryOptions = (title) => {
      return(
        <HStack alignItems="center" justifyContent="space-between"  marginBottom={15} marginTop={15} >
            <Text style={{fontSize: 17}} >{title.namecategory}</Text>
            <Entypo name="circle" size={18} color="black" />
        </HStack>
        )
    }


  return (
      <BaseContainer backgroundColor="white"  >

        <HeaderContainer name="Categorias" />

        <Text style={{fontSize: 16,}} color='#15161E' marginTop={30}  >Essas categorias ajudam os usuários a descobrir perfis semelhantes ao seu. Você pode modificá-las conforme necessário.</Text>

        <VStack pl="$4" borderRadius="$xl"  marginTop={30} >
            <CategoryOptions namecategory="Artista"/>
            <CategoryOptions namecategory="Empresario"/>
            <CategoryOptions namecategory="Influencer"/>
            <CategoryOptions namecategory="Moda e Beleza"/>
            <CategoryOptions namecategory="Religiao"/>
            <CategoryOptions namecategory="Tecnologia"/>
            <CategoryOptions namecategory="Esporte"/>
            <CategoryOptions namecategory="Moda"/>
        </VStack>


      <StatusBar style="auto" />
    </BaseContainer>
  );
}