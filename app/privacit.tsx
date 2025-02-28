import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useRouter } from "expo-router";

import { StatusBar } from 'expo-status-bar';
import HeaderContainer from '../components/HeaderContainer'

import { 
    Text,
    VStack,
    HStack,
    Switch
 } from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import Row from '../components/Row'

import AntDesign from '@expo/vector-icons/AntDesign';

export default function PrivacyScreen() {
    const router = useRouter();
    const [showOnline, setShowOnline] = useState(true);
    const [lastSeen, setLastSeen] = useState(true);
    const [showStats, setShowStats] = useState(true);
    const [vacationMode, setVacationMode] = useState(false);

    return (
        <BaseContainer backgroundColor="#fff"  >
            <HeaderContainer title="Privacidade" />

            <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={2} marginTop={30} >
                <TouchableOpacity onPress={() => router.push("/listblockusers")} >
                    <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 30, marginBottom: 20, paddingRight: 10}}  >
                        <Text fontSize={17} >Bloqueados</Text>
                        <AntDesign name="right" size={18} color="black" />
                    </HStack>
                </TouchableOpacity>

                <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 23, paddingRight: 5}}  >
                    <Text style={{fontSize: 17}} >Mostrar online</Text>
                    <Switch
                        value={showOnline}
                        onValueChange={(value) => setShowOnline(value)}
                        trackColor={{ false: "#ccc", true: "#00A8FF" }}
                        thumbColor={showOnline ? "#fff" : "#00A8FF"}
                    />
                </HStack>
                <Row />

                <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 23, paddingRight: 5}}  >
                    <Text style={{fontSize: 17}}>Mostrar última visualização</Text>
                    <Switch
                        value={lastSeen}
                        onValueChange={(value) => setLastSeen(value)}
                        trackColor={{ false: "#ccc", true: "#00A8FF" }}
                        thumbColor={lastSeen ? "#fff" : "#00A8FF"}
                    />
                </HStack>
                <Row />

                <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 23, paddingRight: 5}}  >
                    <Text style={{fontSize: 17}}>Exibir estatísticas</Text>
                    <Switch
                        value={showStats}
                        onValueChange={(value) => setShowStats(value)}
                        trackColor={{ false: "#ccc", true: "#00A8FF" }}
                        thumbColor={showStats ? "#fff" : "#f4f4f4"}
                    />
                </HStack>
                <Row />

                <HStack space="md" style={{width: '100%', justifyContent: 'space-between', marginTop: 23, paddingRight: 5, marginBottom: 7}}  >
                    <Text style={{fontSize: 17}}>Modo férias</Text>
                    <Switch
                        value={vacationMode}
                        onValueChange={(value) => setVacationMode(value)}
                        trackColor={{ false: "#ccc", true: "#00A8FF" }}
                        thumbColor={vacationMode ? "#fff" : "#f4f4f4"}
                    />
                </HStack>
                <Row />
            </VStack>
            <StatusBar style="auto" />
        </BaseContainer>
    );
}