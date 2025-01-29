import { View, Image, ScrollView, TouchableOpacity } from 'react-native';

import { 
    Text,
    Heading,
    VStack,
    HStack,
    Avatar,
    AvatarImage,
    AvatarFallbackText

 } from "@/gluestackComponents";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { BaseContainer } from '@/components/BaseContainer';
import  ButtonPadrao  from "@/components/ButtonPadrao";


import { useRouter } from "expo-router";

import { useAuth } from "@/Context/AuthProvider";



export default function ProfileUserMsgScreen() {
    const { user } = useAuth();
    const router = useRouter();


    const contentSobreProfile = "O meu grande objetivo de vida é ajudar você e sua empresa a expandir sua capacidade e visão empreendedora"
    const urlLogoProfile = 'data:image/jpeg;base64,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'

    const HeaderProfile = (title) => {
        return(
            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center',  }}  >
                <HStack 
                    className="bg-white " style={{ width: 400, justifyContent: 'space-between'}}  >
                    <VStack className="bg-white " >

                        <View>
                            <HStack>
                               <Avatar width={56} height={56}>
                                    <AvatarFallbackText>
                                        {user?.name}
                                        </AvatarFallbackText>
                                        <AvatarImage
                                            source={{
                                                uri: user?.icon,
                                            }}
                                            alt={user?.name}
                                            />
                                </Avatar>
                                
                                <View style={{marginLeft: 7}}  >    
                                    <HStack style={{alignItems: 'center'}} >                
                                        <Text 
                                            bold style={{fontSize: 18}} >
                                             {user?.name}
                                            </Text>
                                        <MaterialIcons name="verified" size={24} color="#00A8FF" style={{paddingLeft: 4}} />

                                    </HStack>
                                    <Text 
                                        style={{fontSize: 14}} >
                                        @Camila Farani
                                    </Text>
                                    <Text 
                                        style={{fontSize: 12}} >
                                        Ultima conexão ontem as 21:30
                                    </Text>
                                </View>
                            </HStack>
                            
                        </View>
                    </VStack>

        
                    <TouchableOpacity 
                        onPress={() => router.push("/editmyprofile")}
                        style={{ 
                        borderRadius: 300, backgroundColor: '#F9F9F9', alignContent: 'flex-end',
                        width: 50, height: 50, alignItems: 'center', justifyContent: 'center'
                    }} >
                        <Feather name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </HStack>


                <VStack style={{ width: '100%', marginTop: 10 }}  >
                    <Text 
                        className="text-md mt-10 font-normal   text-typography-900" >
                        Mais Influente da América Latina pela Blomberg \n kkdk 
                    </Text>
                    <Text 
                        className="text-md mt-2 font-normal   text-typography-900"  >
                        Investidora Shark Tank Brasil  Empreendedora Linkedin
                    </Text>
                </VStack>
                    
            </View>
        );
    }


    const TabCategoryProfile = (title) => {
        return(
            <View style={{marginRight: 13}}  >    
                <HStack style={{alignItems: 'center', marginTop: 12}}>  
                    <View 
                        style={{padding: 6, borderRadius: 30, borderWidth: 1, borderColor: '#999' }} >
                        <Text bold size="sm" >{title.name}</Text>
                    </View>   
               </HStack>
           </View>
        );
    }


    const TitleContainer = (title) => {
        return(
            <Heading
                style={{marginTop: 30, marginBottom: 5}}
                size="lg" >
                {title.name}
            </Heading>
        );
    }


   // Area do Perfil - Sobre
    const AboutProfile = (title) => {
        return(
            <VStack>
                 <TitleContainer name="Sobre Min" />
                
                <Text 
                    style={{fontSize: 15}} >
                    {title.content}
                </Text>

                <Text 
                    size="lg" style={{marginTop: 5, color: '#00A8FF'}} >
                    Ver mais
                </Text>

                <View style={{ marginTop: 25, width: '100%', height: 3, backgroundColor: '#f2f2f2', borderRadius: 10}}  />

               

                <VStack>
                    <TitleContainer name="Meus Interesses" />
                    <HStack>
                        <TabCategoryProfile name="Financas e Negocios"  />
                        <TabCategoryProfile name="Empreendedorismo"  />
                   </HStack>
                </VStack>

                <View style={{ marginTop: 25, width: '100%', height: 7, backgroundColor: '#f2f2f2', borderRadius: 10}}  />
               

            </VStack>
        )
    }


    const ButtontTab = (title) => {
        return(
        <View 
           style={{
              width: '45%', alignItems: 'center', justifyContent: 'center',
              padding: 6, margin: 2, borderRadius: 30, borderWidth: 1, borderColor: '#999' 
            }} >
           <Text bold size="sm" >{title.name}</Text>
         </View>   
        )
    }


    const Tab = () => {
        return(
            <View style={{width: "100%", alignItems: "center"}}  >    
                <HStack style={{alignItems: 'center', marginTop: 30}}>  

                    <ButtontTab name="Sobre"/>
                    <ButtontTab name="Estatisticas"/>         

                </HStack>
            </View>
        )
    }



    


    const SocialLinks = (title) => {
        return(
        <VStack className="ml-4 mr-4" >
            <TitleContainer name="Social" />

            <Text size="lg" style={{marginTop: 1}} >{title.username}</Text>
            <Text size="lg" style={{marginTop: 1}} >{title.linkednanme}</Text>
            <View style={{ 
                marginTop: 25, width: '100%', height: 7, backgroundColor: '#f2f2f2', borderRadius: 10, marginBottom: 13
            }}  />
            
        </VStack>
        );
    }


    const ButtonPayMsg = (title) => {
        return(
            <VStack 
              alignItems="center"  
              justifyContent="center" 
             >

                <TouchableOpacity 
                    onPress={() => router.push(title.nav)}
                    style={{
                        width: 358,
                        height: 48,
                        backgroundColor: '#00A8FF',
                        borderRadius: 40,
                        alignItems: "center",
                        justifyContent: "space-between"
                    }} 
                >
                        
                    <HStack 
                        style={{width: '100%', }}
                        justifyContent="space-between" alignItems="center"  >
                        <Text color="white" margin={10}  > {title.name} </Text>
                        <Text color="white" marginRight={6}   > {title.price} </Text>
                    </HStack>
            
                </TouchableOpacity>

            </VStack>

         
        );
    }

  return (
        <BaseContainer
         gap="$2" 
         style={{flex: 1, backgroundColor: '#FFF', marginTop: 10  }}  >
            <ScrollView>

               

                        <HeaderProfile />
                        <Tab />
                    
                        <AboutProfile content={contentSobreProfile} />
                        
                        <SocialLinks 
                         linkednanme="@linkedin/@camilafarani" 
                         username="@camilafarani"
                        />

                        <ButtonPayMsg 
                            nav="/saketype"
                            name="Enviar Mensagem" 
                            price="R$ 600,00"
                        />
                    
            </ScrollView>
        </BaseContainer>
  );
}

