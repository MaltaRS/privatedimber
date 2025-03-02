import { useState } from "react";
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Box,
    HStack,
    Pressable,
    ScrollView,
    Text,
    VStack,
} from "@/gluestackComponents";

import { StatusBar } from "expo-status-bar";
import HeaderContainer from '../components/HeaderContainer'
import { Colors } from "@/constants/Colors";
import { MainTitle } from "@/components/MainTitle";
import { ConfigCardSwitch } from "@/components/tabs/config/configCardSwitch";
import { ConfigCard } from "@/components/tabs/config/configCard";
import { BaseContainer } from "@/components/BaseContainer";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

const ConfigNotifications = () => {

    return (
        <BaseContainer>
            <VStack gap="$4">
        <HeaderContainer title="Notificações" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 46,
                    }}
                >
                    <VStack p="$1" pt="$2" gap="$4">
                      <Text fontSize={21} fontFamily="$heading" color="#000" lineHeight={24}>
                                                Notificações de mensagens
                                            </Text>

                      <ConfigCardSwitch 
                                                                          items={[
                                                                              { title: "Mostrar Notificações"}
                                                                        
                                                                          ]}
                                                                      />
                                                                        <Text pt="$4" fontSize={21} fontFamily="$heading" color="#000" lineHeight={24}>
                                                                                                  Notificações de email
                                                                                              </Text>
                             <ConfigCardSwitch 
                                                       items={[
                                                           { title: "Solicitação de mensagem"},
                                                           { title: "Pagamentos"},
                                                           { title: "Suporte" },
                                                       ]}
                                                   />

                    </VStack>
                </ScrollView>
            </VStack>
            <StatusBar style="auto" />
        </BaseContainer>
    );
};

export default ConfigNotifications;
