import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from "expo-router";
import { View, TouchableOpacity, ActivityIndicator, Modal, Animated, StyleSheet } from "react-native";

import { Text, Heading, VStack, HStack, Image } from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";

import iconsucesspix from '../assets/images/iconsucesspix.png'

export default function ConfirmSakeScreen() {
    const router = useRouter();
    const [buttonOpacity] = useState(new Animated.Value(0.9));
    const [loading, setLoading] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    
    const handleConfirm = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setModalSuccess(true);
        }, 1700);
    };

    const handleCloseModal = () => {
        setModalSuccess(false);
        router.push("/wallet");
    };

    const ContainerInfoNameComprovant = () => (
        <VStack style={{ padding: 0 }}>
            <VStack space="xs" style={{ marginTop: 30 }}>
                <HStack style={styles.infoRow}><Text size="sm">Valor</Text><Text bold size="2x1">R$ 1.400,00</Text></HStack>
                <HStack style={styles.infoRow}><Text size="sm">Banco</Text><Text bold size="2x1">077 - Inter S.A</Text></HStack>
                <HStack style={styles.infoRow}><Text size="sm">Agência</Text><Text bold size="2x1">0001</Text></HStack>
                <HStack style={styles.infoRow}><Text size="sm">Número da conta</Text><Text bold size="2x1">239810-1</Text></HStack>
                <HStack style={styles.infoRow}><Text size="sm">Nome do beneficiário</Text><Text bold size="2x1">Camila Farani</Text></HStack>
            </VStack>
        </VStack>
    );

    const TitleModalSakeConfirmSucess = (title) => (
        <View>
            <VStack style={{ marginTop: 0 }}>
                <Image source={iconsucesspix} style={{ height: 120, width: 130 }} />
                <VStack space="xs" style={{ marginTop: 20 }}>
                    <Text bold style={{ fontSize: 30 }}>{title.name}</Text>
                    <HStack>
                        <Text marginTop={20} style={{ fontSize: 18 }}>O valor solicitado será processado e transferido para a conta informada dentro do prazo estimado</Text>
                    </HStack>
                </VStack>
                <View style={{ marginTop: 34, width: '100%', height: 2, backgroundColor: '#f2f2f2', borderRadius: 10 }} />
            </VStack>
        </View>
    );
    
    return (
        <BaseContainer>
            <HeaderContainer name="Confirmar o saque" />
            <Text style={{ fontSize: 17 }} marginTop={20}>Revise os detalhes antes de finalizar a solicitação de saque.</Text>
            <Heading style={{ fontSize: 17 }} marginTop={20}>Detalhes da confirmação de saque</Heading>
            <ContainerInfoNameComprovant />
            
            <Animated.View style={[styles.floatingButtonContainer, { opacity: buttonOpacity }]}> 
                <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                    <Text style={{ color: 'white' }}>Continuar</Text>
                </TouchableOpacity>
            </Animated.View>
            
            <Modal transparent={true} visible={loading} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color="#00A8FF" />
                        <Text style={styles.loadingText}>Carregando...</Text>
                    </View>
                </View>
            </Modal>

            <Modal transparent={true} visible={modalSuccess} animationType="fade">
                <View style={styles.fullScreenModal}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>X</Text>
                        </TouchableOpacity>
                        <TitleModalSakeConfirmSucess name="Saque realizado com sucesso!" />
                    </View>
                </View>
            </Modal>
            
            <StatusBar style="auto" />
        </BaseContainer>
    );
}

const styles = StyleSheet.create({
    infoRow: {
        width: '100%', alignItems: 'center', justifyContent: 'space-between', marginTop: 6
    },
    confirmButton: {
        width: 358, height: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00A8FF', borderRadius: 40
    },
    floatingButtonContainer: {
        position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center'
    },
    modalContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    modalContent: {
        backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center'
    },
    modalTitle: {
        fontSize: 18, fontWeight: 'bold', marginBottom: 10
    },
    loadingText: {
        marginTop: 10, fontSize: 16, color: '#333'
    },
    fullScreenModal: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    closeButton: {
        position: 'absolute', top: 10, right: 10, padding: 10
    }
});