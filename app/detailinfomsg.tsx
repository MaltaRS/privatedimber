import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { View, TouchableOpacity } from "react-native";

import { Text, VStack, HStack, Image, Heading } from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


import HeaderContainer from '../components/HeaderContainer'
import Row from "../components/Row";

export default function DetailInfoMsgScreen() {
          const router = useRouter();
    

    const logoUser = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-X2sLwvRd-LBjUibmTjV2yR0VI2Ni4UJ2IA&s'


    const ItemInfoUser = (title) => {
        return(
          <View>

                <Heading fontSize={19} bold marginTop={30} >
                  Informacoes do remetente
                </Heading>
                <HStack 
                  style={{
                    alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 20 
                  }}  className="bg-white  mr-4 " >
                    <HStack style={{alignItems: 'center', justifyContent: 'space-between' }} >
                         <Image
                            style={{width: 60, height: 60, borderRadius: 100}}
                            source={{
                                uri: title.logo
                            }}
                        />
                        <VStack  style={{marginLeft: 12}}  >
                            <Text bold size="15" color="#1F2937" >{title.name}</Text>
                            <Text size="14" style={{color: '#7D8697'}} >{title.description}</Text>
                        </VStack>
                    </HStack>
    

                </HStack>
                <Row />

          </View>
        )
    }


    const ItemTitleInfoContainer = (title: { name: string }) => {
        return (
            <View>
                <VStack style={{ marginTop: 0 }}>
                 

                    <VStack space="xs" style={{ marginTop: 20 }}>
                        <Text bold style={{ fontSize: 20 }}>
                            Detalhes da mensagem
                        </Text>
                            <HStack
                                style={{
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between",                                   
                                }}
                             >
                                <Text size="md">Assunto</Text>
                                <Text bold size="md">
                                    Parceria Paga
                                </Text>
                            </HStack>

                            <HStack
                                style={{
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: 1,
                                }}
                             >
                                <Text size="md">Prazo de resposta</Text>
                                <Text bold size="md">
                                    até 20/02/2025
                                </Text>
                            </HStack>
                    </VStack>

                    <Row />
                </VStack>
            </View>
        );
    };

    const ContainerInfoPay = () => {
        return (
            <VStack style={{width: '100%'}}>

                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 20, marginBottom: 13
                    }}
                >
                    <Heading size="md">Detalhes do pagamento</Heading>
                    <TouchableOpacity                
                    style={{
                    width: 102, height: 28,
                    alignItems: 'center', justifyContent: 'center',
                    borderRadius: 30, borderWidth: 1, borderColor: 'green' 
                }} >
                    <Text fontSize={13} color="#999" color="green" bold >
                         Disponivel
                    </Text>   
                </TouchableOpacity>   
            </HStack>

            


                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 1,
                    }}
                >
                    <Text size="md">Mensagem</Text>
                    <Text bold size="md">
                        R$ 800,00
                    </Text>
                </HStack>

                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 7,
                    }}
                >
                    <Text size="md">Direito de resposta</Text>
                    <Text bold size="md">
                      R$ 80,00
                    </Text>
                </HStack>

                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 7,
                    }}
                >
                    <Text size="md">Arquivo</Text>
                    <Text bold size="md">
                       R$ 80,00
                    </Text>
                </HStack>

                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 7,
                    }}
                >
                    <Text size="md">Imagem</Text>
                    <Text bold size="md">
                      R$ 80,00
                    </Text>
                </HStack>

                <HStack
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 7,
                    }}
                >
                    <Text size="md">Valor total</Text>
                    <Text bold size="md">
                      R$ 1.400,00
                    </Text>
                </HStack>

            </VStack>
        );
    };




    const FotterMensageContainer = () => {
        return(
        <TouchableOpacity
          onPress={() => router.push("/listinstituition")}
        >

          <VStack 
          marginTop={90} 
          style={{width: '100%', alignItems: 'center', backgroundColor: '#f1f1f1',}}>
            <Text alignContent="center" fontSize={14} color="#1F2937" >Voce pode escolher como doar o valor da mensagem</Text>

            <HStack alignItems="center" justifyContent="center">
               <Text size="14" style={{color: '#00A8FF', paddingRight: 10}} >Doar para uma causa</Text>
               <FontAwesome5 name="hand-holding" size={24} color="#00A8FF" />
            </HStack>
            <Row />
          </VStack>
        </TouchableOpacity>

        )
        
    }
 


    return (
        <BaseContainer>
            <HeaderContainer name="Detalhes da mensagem" />

            <ItemInfoUser
                name="Neymar Junior" 
                description="Recebido dia 19/02/2024 as 14h:42" 
                logo={logoUser}
            />

        
            <ItemTitleInfoContainer name={"sss"} />
            <ContainerInfoPay />

            <FotterMensageContainer
                name="Neymar Junior" 
                description="Recebido dia 19/02/2024 as 14h:42" 
            />

            <StatusBar style="auto" />
        </BaseContainer>
    );
}