import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { 
    Text,
    VStack,
    HStack,
    Input,
    ScrollView,
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
                <Text style={styles.miniButtonText}>{name}</Text>
            </HStack>
        </TouchableOpacity>
    );

    const ContainerCategoryPay = () => (
        <HStack>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
            <HStack space="md">
                <MiniButtonsWallet name="Período" icon="calendar" />
                <MiniButtonsWallet name="Pagamento" icon="credit-card" />
                <MiniButtonsWallet name="Pagamento" icon="credit-card" />
                <MiniButtonsWallet name="Estorno" icon="undo" />
            </HStack>
        </ScrollView>
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
            <HeaderContainer title="Extrato" />
            
            <Input
                mt="$2"
                variant="rounded"
                bgColor="#E5E7EB"
                size="xl"
                borderWidth={0}
            >
                <InputSlot bgColor="$gray100" pl="$5" pt="$1">
                    <InputIcon>
                        <Search size={20} color="#6B7280" />
                    </InputIcon>
                </InputSlot>
                <InputField
                    pl="$3"
                    bgColor="$gray100"
                    placeholder="Pesquisar"
                    placeholderTextColor="#6B7280"
                    size="lg"
                    onChangeText={(text) => console.log("Pesquisar: ", text)} // Substituído `handleSearch`
                />
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
    scrollContainer: {
        marginTop: 20,
        paddingHorizontal: 10
    },
    miniButton: {
        borderRadius: 20,
        borderColor: "#D1D5DB", 
        borderWidth: 1 ,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',

    },
    miniButtonText: {
        marginLeft: 5,
        fontSize: 14
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
