 import React, {useState } from 'react'
import { StatusBar } from 'expo-status-bar';

import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';


import { 
    Text,
    Heading,
    VStack,
    HStack,
    Avatar,
    AvatarImage,
    AvatarFallbackText, 

 } from "@/gluestackComponents";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { BaseContainer } from '@/components/BaseContainer';
import ProfileStatistics from '../components/ProfileStatistics'
import TitleContainerProfile from "@/components/TitleContainerProfile";
import Row from '../components/Row'
import { GoBack } from "@/components/utils/GoBack"; 

import { useRouter } from "expo-router";

import { useAuth } from "@/Context/AuthProvider";

const HeaderContainer = ({ title }) => {
    const router = useRouter();
    return (
        <HStack
            pt="$1"
                 justifyContent="space-between"
                 alignItems="center"
                 width="100%"
                 px="1"
             >
        >
            <GoBack onPress={() => router.back()} />
            <View style={{ flex: 1, alignItems: 'center', position: 'absolute', left: 0, right: 0 }}>
                <Text fontFamily="$title" fontSize={17} color="#0F1010" textAlign="center">
                    {title}
                </Text>
            </View>
            <GoBack onPress={() => router.back()} />
        </HStack>
    );
};
export default function ProfileScreen() {
    const { user } = useAuth();
    const router = useRouter();
    
    

    
    const [activeTab, setActiveTab] = useState("tab1");
    


    const contentSobreProfile = "O meu grande objetivo de vida é ajudar você e sua empresa a expandir sua capacidade e visão empreendedora"

    const HeaderProfile = () => {
        return(
            <View style={{width: '100%', alignItems: 'left', marginTop: 20}}  >
                <HStack 
                     style={{ width: '100%', justifyContent: 'space-between'}}  >
                    <VStack>

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
                                        <MaterialIcons name="verified" size={22} color="#00A8FF" style={{paddingLeft: 4}} />

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
                        borderRadius: 300, backgroundColor: '#f6f6f6', alignContent: 'flex-end',
                        width: 48, height: 48, alignItems: 'center', justifyContent: 'center',
                         borderWidth: 1, borderColor: '#f3f4f6'
                    }} >
                        <Feather name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </HStack>


                <VStack style={{ width: '100%', marginTop: 10 }}  >
                    <Text 
                        className="text-md mt-10 font-normal   text-typography-900" fontSize={14}>
                        Mais Influente da América Latina pela Blomberg \n kkdk 
                    </Text>
                    <Text 
                        className="text-md mt-2 font-normal   text-typography-900" fontSize={14}  >
                        Investidora Shark Tank Brasil  Empreendedora Linkedin
                    </Text>
                </VStack>
                    
            </View>
        );
    }


    const TabCategoryProfile = (title) => {
        return(
   <View style={{marginRight: 8 }}  >    
                <HStack style={{alignItems: 'center'}}>  
                    <VStack 
                        style={{padding: 4, borderRadius: 50, borderWidth: 1.5, borderColor: '#D1D5DB' }} >
                        <Text textAlign= "center" paddingLeft={10} paddingRight={10}
                         color= "$gray500"  fontSize={12} textAlign="absolute"  lineHeight={14} >{title.name}</Text>
                    </VStack>   
               </HStack>
           </View>
        );
    }

const AboutProfile = (title) => {
        return(
            
            <VStack>
             <VStack mt="24">
                 <TitleContainerProfile name="Sobre Mim" />
            </VStack>
                <Text 
                    style={{fontSize: 15}} >
                    {title.content}
                </Text>

                <Text 
                    size="15" style={{color: '#00A8FF'}} >
                    Ver mais
                </Text>

                <View style={{ marginTop: 18, width: '100%', height: 6, backgroundColor: '#F8F8F9', borderRadius: 10}}  />

                  <VStack mt="24" mb="16" >
                    <TitleContainerProfile name="Minhas Categorias"/>
                    <VStack mt="24">
                    <HStack>
                        <TabCategoryProfile name="Financas e Negocios"  />
                        <TabCategoryProfile name="Empreendedorismo"  />
                   </HStack>  
                </VStack>
                  </VStack>
 <View style={{ marginTop: 18, width: '100%', height: 6, backgroundColor: '#F8F8F9', borderRadius: 10}}  />
                 <VStack mt="24" mb="16" >
                    <TitleContainerProfile name="Meus Interesses" />
                  <VStack mt="24">
                    <HStack>
                        <TabCategoryProfile name="Financas e Negocios"  />
                        <TabCategoryProfile name="Empreendedorismo"  />
                   </HStack>
                </VStack>
                  </VStack>
            <View style={{ marginTop: 18, width: '100%', height: 6, backgroundColor: '#F8F8F9', borderRadius: 10}}  />
            </VStack>
        )
    }


 




    const SocialLinks = (title) => {
        return(
             <VStack mt="24" mb="16" >
                        <TitleContainerProfile name="Social"  />
                             <VStack mt="16">
                                <HStack>
 <Text paddingBottom={20} size="15" color="#00A8FF" >{title.linkednanme}</Text>
                               </HStack>
                            </VStack>
                              </VStack>
                       
                       
        );
    }




  return (
    <ScrollView>

        <BaseContainer>

       <VStack gap="$4">
         <HeaderContainer  />
  <VStack p="1">
            <HeaderProfile />
         

<HStack backgroundColor="$gray100" padding={2} marginTop={12} borderRadius={30} >

                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === "tab1" ? styles.activeTab : styles.inactiveTab]} 
                    onPress={() => setActiveTab("tab1")} >
                    <Text style={[activeTab === "tab1" ? styles.titleTabActive : styles.titleTabInactive]}  >Sobre</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === "tab2" ? styles.activeTab : styles.inactiveTab]} 
                    onPress={() => setActiveTab("tab2")}  >
                   <Text       fontFamily= 'title' style={[activeTab === "tab2" ? styles.titleTabActive : styles.titleTabInactive]}  >Estatísticas</Text>

                </TouchableOpacity>

            </HStack>

                
                    {activeTab === "tab1" ? (
                        <View />
                   ) : (
                        <ProfileStatistics />

                    )}
                          
            <AboutProfile content={contentSobreProfile} />
                        
            <SocialLinks 
             linkednanme="@linkedin/@camilafarani" 
             username="@camilafarani"
            />
             </VStack>
    </VStack>
        <StatusBar style="auto" />
        </BaseContainer>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F8F9FA",
    },
    text: {
      fontSize: 17,
      marginBottom: 10,
      color: "#333",

    },
    tabContainer: {
      flexDirection: "row",

    },
    tabButton: {
      marginHorizontal: 'auto',
      borderRadius: 10,
      backgroundColor: "#f4f4f4",
      height: 36
      
    },

    titleTabActive: {
        color: '#000', fontFamily: 'body'
    },

    titleTabInactive: {
        color: '#374151', fontFamily: 'body'
    },
    activeTab: {
        width: '48%', alignItems: 'center', justifyContent: 'center',
        padding: 2, margin: 2, borderRadius: 30, borderWidth: 1, borderColor: '#fff', backgroundColor: "#fff"  },
    inactiveTab: {
        width: '48%', alignItems: 'center', justifyContent: 'center',
        padding: 6, margin: 2, borderRadius: 30, borderWidth: 1, borderColor: '#f8f8f8',
      opacity: 0.6,
    },
    contentView: {
      padding: 20,
      backgroundColor: "#000",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 20,
    }
  });