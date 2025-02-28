import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MoveLeft } from "lucide-react-native";
import { 
    Text,
    VStack,
    HStack,
    Input,
    InputSlot,
    InputIcon,
    Pressable,
    InputField,
    Modal,
    Image
} from "@/gluestackComponents";
import { Search } from "lucide-react-native";
import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from '../components/HeaderContainer';
import { MainTitle } from "@/components/MainTitle";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const iconlistpay = require('../assets/images/iconlistpay.png');

export default function ExtractsPay() {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    const MiniButtonsWallet = ({ name, icon }) => (
        <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.miniButton}>
            <HStack alignItems="center">
                <FontAwesome name={icon} size={15} color="black" />
                <Text size="0" style={styles.miniButtonText}>{name}</Text>
            </HStack>
        </TouchableOpacity>
    );

    const ContainerCategoryPay = () => (
        <HStack>
            <MiniButtonsWallet name="Período" icon="calendar" />
            <MiniButtonsWallet name="Pagamento" icon="credit-card" />
            <MiniButtonsWallet name="Estorno" icon="undo" />
        </HStack>
    );

    const ItemListPayWallet = ({ name, description }) => (
        <View>
            <HStack style={styles.itemContainer}>
                <HStack alignItems="center">
                    <Image source={iconlistpay} style={styles.itemIcon} />
                    <VStack style={styles.itemTextContainer}>
                        <Text bold size="15">{name}</Text>
                        <Text size="14" color="#999">{description}</Text>
                    </VStack>
                </HStack>
                <Text bold size="15">-R$1.500,00</Text>
            </HStack>
            <View style={styles.divider} />
        </View>
    );

    return (
        <BaseContainer>
            <HStack gap="$6" pt="$1" justifyContent="center" alignItems="center" position="relative">
                <Pressable onPress={() => router.back()} position="absolute" left="$0" rounded="$full" bgColor="$gray200" p="$2">
                    <MoveLeft size={24} color="#555" />
                </Pressable>
                <Text fontFamily="$arialHeading" size="lg" color="#000">Extrato</Text>
            </HStack>

            <Input mt="$2" variant="rounded" bgColor="#E5E7EB" size="xl" borderWidth={0}>
                <InputSlot bgColor="#E5E7EB" pl="$5" pt="$1">
                    <InputIcon>
                        <Search size={20} color="#6B7280" />
                    </InputIcon>
                </InputSlot>
                <InputField pl="$3" bgColor="#E5E7EB" placeholder="Pesquisar" placeholderTextColor="#6B7280" size="lg" />
            </Input>

            <ContainerCategoryPay />

            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <Modal.Content style={styles.modalBottom}>
                    <Modal.Header>
                        <Text style={styles.modalTitle}>Filtrar por período</Text>
                    </Modal.Header>
                    <HStack justifyContent='space-between' padding={10}>
                        <Text style={styles.modalBody}>Últimos 15 dias</Text>
                        <Text style={styles.modalBody}>Últimos 30 dias</Text>
                    </HStack>
                    <HStack justifyContent='space-between' padding={10}>
                        <Text style={styles.modalBody}>Últimos 60 dias</Text>
                        <Text style={styles.modalBody}>Últimos 90 dias</Text>
                    </HStack>
                    <Modal.Footer>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.confirmButton}>
                            <Text color="white">Filtrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelButton}>Cancelar</Text>
                        </TouchableOpacity>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <ItemListPayWallet name="Pagamento de mensagem" description="Envio para Camila Farani" />
            <ItemListPayWallet name="Pagamento de mensagem" description="Envio para Camila Farani" />

            <StatusBar style="auto" />
        </BaseContainer>
    );
}

const styles = StyleSheet.create({
    miniButton: {
        marginTop: 20,
        borderRadius: 300,
        backgroundColor: '#fff',
        width: 150,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    miniButtonText: {
        marginLeft: 5
    },
    itemContainer: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 20
    },
    itemIcon: {
        width: 25,
        height: 25
    },
    itemTextContainer: {
        marginLeft: 12
    },
    divider: {
        marginTop: 15,
        width: '100%',
        height: 2,
        backgroundColor: '#f1f1f1',
        borderRadius: 10
    },
    modalBottom: {
        position: "absolute",
        bottom: 0,
        paddingTop: 12,
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalBody: {
        fontSize: 16,
        margin: 2
    },
    confirmButton: {
        width: 358,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00A8FF',
        borderRadius: 40
    },
    cancelButton: {
        color: '#00A8FF',
        marginTop: 10,
        textAlign: 'center'
    }
});
