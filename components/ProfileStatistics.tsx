import { TouchableOpacity, View,  } from "react-native";

import { 
    Text,
    Heading,
    VStack,
    HStack,
    Avatar,
    AvatarImage,
    AvatarFallbackText

 } from "@/gluestackComponents";

import { useRouter } from "expo-router";

import FontAwesome from '@expo/vector-icons/FontAwesome';



export default function ProfileStatistics(title) {

    const TitleContainer = (title) => {
        return(
            <Heading
                style={{marginTop: 30, marginBottom: 20}}
                fontSize={17} >
                {title.name}
            </Heading>
        );
    }



    const ComponentProfileStatistics = (title) => {
        return(
        <View 
           style={{
              width: '45%', height: 100, alignItems: 'center', justifyContent: 'center',
               margin: 5, borderRadius: 10, borderWidth: 1, borderColor: '#999' 
            }} >
                <HStack style={{alignItems: 'center', justifyContent: 'center'}}  >
                   <FontAwesome name={title.nameicon} size={18} color="black" style={{paddingRight: 8}} />
                   <Text bold style={{fontSize: 20}} >{title.number}</Text>
                </HStack>
            <Text bold size="sm" >{title.name}</Text>
         </View>   
        )
    }


      // Area do Perfil - Atividade de Mensagens
        const ContainerStatistics = () => {
            return(
                <VStack>
                    <TitleContainer name="Atividade de Mensagem" />
    
                    <HStack 
                        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}} >
                        <ComponentProfileStatistics name="Curtidas" number="398" nameicon="comment" />
                        <ComponentProfileStatistics name="Estimativa de resposta" number="15" nameicon="comment-o" />
                    </HStack>
    
                    <HStack 
                        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}} >
                        <ComponentProfileStatistics name="Conexoes" number="398" nameicon="comment" />
                        <ComponentProfileStatistics name="Pendentes" number="15" nameicon="comment-o" />
                    </HStack>
    
                    <HStack 
                        style={{width: '100%', alignItems: 'center', justifyContent: 'center'}} >
                        <ComponentProfileStatistics name="Aceitas" number="398" nameicon="comment" />
                        <ComponentProfileStatistics name="Recusadas" number="15" nameicon="comment-o" />
                    </HStack>
                    
    
                    <VStack className="ml-4 mr-4"  >
                        <View style={{ marginTop: 25, width: '100%', height: 7, backgroundColor: '#f2f2f2', borderRadius: 10}}  />
                    </VStack>
    
               </VStack>
            );
        }


  const router = useRouter();

  return (
    <ContainerStatistics />
  

  );
}
