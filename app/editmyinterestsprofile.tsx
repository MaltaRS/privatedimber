import { TouchableOpacity, View,} from 'react-native';

import { 
    Text,
    VStack,
    HStack
 } from "@/gluestackComponents";

import { StatusBar } from 'expo-status-bar';
import HeaderContainer from '../components/HeaderContainer'
import TitleContainer from "@/components/TitleContainer";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import { BaseContainer } from "@/components/BaseContainer";
import Row from '../components/Row'


export default function EdityMyInterestsProfileScreen() {

    const ComponentProfileStatistics = (title) => {
        return(
        <View 
           style={{
              width: '45%', height: 100, paddingLeft: 15, justifyContent: 'center',
               margin: 5, borderRadius: 10, borderWidth: 1, borderColor: '#999' 
            }} >
               
            <Text size="15" >{title.name}</Text>
         </View>   
        )
    }


      // Area do Perfil - Atividade de Mensagens
        const ContainerStatistics = () => {
            return(
                <VStack>
    
                    <HStack 
                        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}} >
                        <ComponentProfileStatistics name="Financas e Economia" number="398" nameicon="comment" />
                        <ComponentProfileStatistics name="Esportes" number="15" nameicon="comment-o" />
                    </HStack>
    
                    <HStack 
                        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}} >
                        <ComponentProfileStatistics name="Arte e Cultura" number="398" nameicon="comment" />
                        <ComponentProfileStatistics name="Viagens" number="15" nameicon="comment-o" />
                    </HStack>
    
                    <HStack 
                        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}} >
                        <ComponentProfileStatistics name="Beleza" number="398" nameicon="comment" />
                        <ComponentProfileStatistics name="Saude" number="15" nameicon="comment-o" />
                    </HStack>

                    <HStack 
                        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}} >
                        <ComponentProfileStatistics name="Tecnologia" number="398" nameicon="comment" />
                        <ComponentProfileStatistics name="Entretenimento" number="15" nameicon="comment-o" />
                    </HStack>

                    <HStack 
                        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}} >
                        <ComponentProfileStatistics name="Religiao" number="398" nameicon="comment" />
                        <ComponentProfileStatistics name="Musica" number="15" nameicon="comment-o" />
                    </HStack>
                    
    
                    <VStack className="ml-4 mr-4"  >
                        <View style={{ marginTop: 25, width: '100%', height: 7, backgroundColor: '#f2f2f2', borderRadius: 10}}  />
                    </VStack>
    
               </VStack>
            );
        }


  return (
      <BaseContainer >

        <HeaderContainer name="Interesses" />

        <Text style={{fontSize: 16,}} color='#15161E' marginTop={30}  >Selecione pelo menos 3 categorias para personalizarmos sua experiência. </Text>

        <VStack pl="$4" borderRadius="$xl"  marginTop={30} >
            <ContainerStatistics />
        </VStack>


      <StatusBar style="auto" />
    </BaseContainer>
  );
}