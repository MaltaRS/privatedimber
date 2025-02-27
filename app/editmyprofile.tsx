import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, TextInput, StyleSheet } from 'react-native';

import { 
    Text,
    Heading,
    VStack,
    HStack,
    Avatar,
    AvatarImage,
    AvatarFallbackText,
 } from "@/gluestackComponents";
 
import { useAuth } from "@/Context/AuthProvider";

import { BaseContainer } from '@/components/BaseContainer';
import HeaderContainer from '../components/HeaderContainer'
import { ConfigCard } from "@/components/tabs/config/configCard";


export default function EditProfileScreen() {
    const { user } = useAuth();


    const TitleContainer = (title) => {
        return(
            <Heading
                style={{marginTop: 13, marginBottom: 13}}
                fontSize={17} className="mb-1 mt-10" >
                {title.name}
            </Heading>
        );
    }

    const ContainerInput = (notific) => {
          return(
          <View> 
                  <HStack
                   style={{
                     alignItems: 'center',  justifyContent: 'space-between', marginTop: 20 
                    }}  className="bg-white  " >
                          
                        <VStack style={{width: '100%'}}  >
                              <Text  size="17"  >{notific.name}</Text>
                              <TextInput
                                style={styles.input}
                                placeholder={notific.place}
                                />                 
                        </VStack>
    
                  </HStack>
            </View>
          )
      }
    

    const HeaderLogoProfile = () => {
        return(
            <VStack className="bg-white " style={{width: '100%', alignItems: 'center', justifyContent: 'center'}} >

              <Avatar width={56} height={56}>
                <AvatarFallbackText>
                  {user?.name}
                    </AvatarFallbackText>
                        <AvatarImage
                            source={{
                              uri: user?.icon,
                            }}
                              alt={user?.name} >
                    </AvatarImage>
              </Avatar>
            
            </VStack>
        

        )
    }


    const AboutProfile = () => {
        return(
          <View>
            <TitleContainer name="Sobre" />

                <VStack 
                  style={{
                    marginTop: 0 , borderWidth: 1, borderColor: '#f2f2f2', padding: 2, borderRadius: 6
                      }} >
                       
                    <Text 
                        size="15" style={{marginTop: 10, color: '#999'}} >
                        O meu grande objetivo de vida é ajudar você e sua empresa a expandir sua capacidade e visão empreendedora
                    </Text>
                   <View style={{ marginTop: 25, width: '100%', height: 3, backgroundColor: '#f2f2f2', borderRadius: 10}}  />

                </VStack>
          </View>
        );
    }



  return (
    <ScrollView style={{flex: 1}} >
        <BaseContainer
         backgroundColor="#fff"
         gap="$2" >

            <HeaderContainer name="Editar perfil" namebuttontab="Salvar" />
            <HeaderLogoProfile />

            <ContainerInput
             name="Nome" 
             place={user.name}
            />

            <ContainerInput
             name="Bio" 
             place="O meu grande objetivo de vida é ajudar você e sua empresa a expandir sua capacidade e visão empreendedora"
            />

            <ContainerInput
             name="Usuario" 
             place="@CamilaFarani"
            />

            <AboutProfile />
        

            <VStack>
              <TitleContainer name="Informações profissionais" />
                <ConfigCard
                    items={[
                        {
                           title: "Categorias",
                           href: "/editcategorysmyprofile",
                                                   
                        },
                        {
                            title: "Interesses",
                            href: "/editmyinterestsprofile",
                        },
                        {
                            title: "Social",
                            href: "editsocialinfosmyprofile",
                        },

                        {
                          title: "Verificar Conta",
                          href: "verifyaccount",
                      },
                    ]} >
                </ConfigCard>
            </VStack>

          <StatusBar style="auto" />
       </BaseContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 7,
    padding: 10,
    marginTop: 4
  },
});