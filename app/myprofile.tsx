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
import HeaderContainer from '../components/HeaderContainer'
import Row from '../components/Row'


import { useRouter } from "expo-router";

import { useAuth } from "@/Context/AuthProvider";


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
                        style={{padding: 6, borderRadius: 50, borderWidth: 1, borderColor: '#D1D5DB' }} >
                        <Text paddingLeft={10} paddingRight={10} fontSize={12}  >{title.name}</Text>
                    </VStack>   
               </HStack>
           </View>
        );
    }


    const TitleContainer = (title) => {
        return(
            <Text
                fontSize={17} >
                {title.name}
            </Text>
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
                    size="15" style={{color: '#00A8FF'}} >
                    Ver mais
                </Text>

                <View style={{ marginTop: 16, width: '100%', height: 3, backgroundColor: '#f2f2f2', borderRadius: 10}}  />

                  <VStack marginBottom="16" mt="12">
                    <TitleContainer name="Minhas Categorias"/>
                    <VStack mt="16">
                    <HStack>
                        <TabCategoryProfile name="Financas e Negocios"  />
                        <TabCategoryProfile name="Empreendedorismo"  />
                   </HStack>  
                </VStack>
                  </VStack>
 <View style={{ marginTop: 8, width: '100%', height: 3, backgroundColor: '#f2f2f2', borderRadius: 10}}  />
                 <VStack marginBottom="16" mt="12">
                    <TitleContainer name="Meus Interesses" />
                 <VStack mt="16">
                    <HStack>
                        <TabCategoryProfile name="Financas e Negocios"  />
                        <TabCategoryProfile name="Empreendedorismo"  />
                   </HStack>
                </VStack>
                  </VStack>
            <View style={{ marginTop: 8, width: '100%', height: 3, backgroundColor: '#f2f2f2', borderRadius: 10}}  />
            </VStack>
        )
    }


 




    const SocialLinks = (title) => {
        return(
             <VStack marginBottom="16" mt="12">
                        <TitleContainer name="Social"  />
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

        <BaseContainer
         gap="$2" 
         style={{flex: 1}}  >


         <HeaderContainer title="Meu Perfil"  />

            <HeaderProfile />


            <HStack backgroundColor="#f5f5f5" paddingTop={3} paddingBottom={3} marginTop={20} borderRadius={30}  >

                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === "tab1" ? styles.activeTab : styles.inactiveTab]} 
                    onPress={() => setActiveTab("tab1")} >
                    <Text  style={[activeTab === "tab1" ? styles.titleTabActive : styles.titleTabInactive]}  >Sobre</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === "tab2" ? styles.activeTab : styles.inactiveTab]} 
                    onPress={() => setActiveTab("tab2")}  >
                   <Text  style={[activeTab === "tab2" ? styles.titleTabActive : styles.titleTabInactive]}  >Estatisticas</Text>

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
      fontSize: 20,
      marginBottom: 20,
      color: "#333",
    },
    tabContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    tabButton: {
      marginHorizontal: 10,
      padding: 10,
      borderRadius: 8,
      backgroundColor: "#f4f4f4",
      height: 46
      
    },

    titleTabActive: {
        color: '#000', fontWeight: "bold"
    },

    titleTabInactive: {
        color: '#000', 
    },
    activeTab: {
        width: '45%', alignItems: 'center', justifyContent: 'center',
        padding: 6, margin: 2, borderRadius: 30, borderWidth: 1, borderColor: '#fff', backgroundColor: "#fff"  },
    inactiveTab: {
        width: '45%', alignItems: 'center', justifyContent: 'center',
        padding: 6, margin: 2, borderRadius: 30, borderWidth: 1, borderColor: '#f8f8f8',
      opacity: 0.6,
    },
    contentView: {
      padding: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 20,
    }
  });