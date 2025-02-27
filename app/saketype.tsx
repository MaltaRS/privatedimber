import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from "expo-router";

import { View, TouchableOpacity, StyleSheet, TextInput, Animated, ActivityIndicator, Modal } from "react-native";

import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Text, VStack, HStack, Input, InputField } from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";

export default function SakeTypeScreen() {
    const [pixKey, setPixKey] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);

    const router = useRouter();

    const [buttonOpacity] = useState(new Animated.Value(0.3));
    const [loading, setLoading] = useState(false);

    const handleInputChange = (text) => {
        setPixKey(text);
        Animated.timing(buttonOpacity, {
            toValue: text ? 1 : 0.3,
            duration: 210,
            useNativeDriver: true,
        }).start();
    };

    const handleConfirm = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push("/confirmsake");
        }, 1700);
    };

    const RadioOption = ({ label, value }) => (
        <TouchableOpacity onPress={() => setSelectedOption(value)}>
            <HStack style={styles.radioContainer}>
                <HStack style={styles.radioInnerContainer}>
                    <Entypo name={selectedOption === value ? "dot-single" : "circle"} size={24} color="blue" />
                    <VStack marginLeft={12}>
                        <Text color="#15161E" size="15">{label}</Text>
                    </VStack>
                </HStack>
            </HStack>
        </TouchableOpacity>
    );

    const SelectValueInput = (title) => {
        return(
        <View>
      
           <VStack marginTop={20} >
               
               <Text fontSize={15} color="#374151" >
                  {title.descriptioninput}  
               </Text>
           </VStack>
           
      
            <HStack
                 style={{
                   width: '100%',
                   alignItems: 'center',
                   borderWidth: 1, 
                   borderColor: '#d3d3d3',  
                   paddingTop: 10, 
                   paddingBottom: 10, 
                   borderRadius: 10,
                  marginTop:7
                  }} >
      
                <HStack alignItems="center" justifyContent="space-between" >
                        <VStack  
                          style={{width: '90%', alignItems: "center", justifyContent: 'center'}} >
                            <Input 
                              borderColor="#fff"
                              size="lg" >
      
                              <InputField 
                               fontSize={15}
                               placeholder={title.placetitle}
                              />
                            </Input>             
                        </VStack>
                </HStack>
                   <AntDesign name="down" size={12} color="black" />
            </HStack>
      
          </View>
        )
      }
      

    return (
        <BaseContainer>
            <HeaderContainer name="Pagamentos" />
            <Text style={styles.title}>Escolha como quer sacar</Text>
            <RadioOption label="Chave Pix" value="pix" />
            {selectedOption === "pix" && (
                <TextInput style={styles.input} value={pixKey} onChangeText={handleInputChange} placeholder="Digite sua chave Pix" />
            )}
            <RadioOption label="Dados Bancários" value="bank" />
            {selectedOption === "bank" && (

            
            <View>
                <SelectValueInput 
                 descriptioninput="Nome do banco" 
                 placetitle="Selecionar"/>

                <SelectValueInput 
                  descriptioninput="Agencia" 
                  placetitle="Insira o numero da agencia"/>

                <SelectValueInput 
                  descriptioninput="Numero da conta com digito" 
                  placetitle="Insira o numero da conta"/>

                <SelectValueInput 
                  descriptioninput="Tipo da conta" 
                  placetitle="Selecionar"/>

                    
            </View>
            )}
            <Animated.View style={[styles.floatingButtonContainer, { opacity: buttonOpacity }]}> 
                <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton} disabled={!pixKey}>
                    <Text style={{ color: 'white' }}>Continuar</Text>
                </TouchableOpacity>
            </Animated.View>
            
            <StatusBar style="auto" />
        </BaseContainer>
    );
}

const styles = StyleSheet.create({
    radioContainer: {
        borderWidth: 1, borderColor: '#999', paddingTop: 26, paddingBottom: 26, borderRadius: 10,
        alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 20
    },
    radioInnerContainer: {
        marginLeft: 10, justifyContent: "center", alignItems: "center"
    },
    input: {
        borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 10, borderRadius: 5
    },
    confirmButton: {
        width: 358, height: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00A8FF', borderRadius: 40
    },
    floatingButtonContainer: {
        position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center'
    },
    title: {
        fontSize: 15, marginTop: 20, color: '#1F2937'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333'
    }
});