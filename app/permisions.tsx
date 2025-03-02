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

const Permitions = () => {

    return (
        <BaseContainer>
            <VStack gap="$4">
        <HeaderContainer title="Permições" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 46,
                    }}
                >
                    <VStack p="$1" pt="$2" gap="$4">
                      <Text fontSize={21} fontFamily="$heading" color="#000" lineHeight={24}>
                                                Direito a resposta
                                            </Text>

                      <ConfigCardSwitch 
                                                                          items={[
                                                                              { title: "Conceder resposta"}
                                                                        
                                                                          ]}
                                                                      />
                                                                        <Text pt="$4" fontSize={21} fontFamily="$heading" color="#000" lineHeight={24}>
                                                                                                  Anexos
                                                                                              </Text>
                             <ConfigCardSwitch 
                                                       items={[
                                                           { title: "Permitir arquivo"},
                                                           { title: "Permitir foto"},
                                                           { title: "Permitir vídeo" },
                                                       ]}
                                                   />

                    </VStack>
                </ScrollView>
            </VStack>
            <StatusBar style="auto" />
        </BaseContainer>
    );
};

export default Permitions;
