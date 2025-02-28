import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { 
    Text,
    Heading,
    VStack,
    HStack,
    Avatar,
    AvatarImage,
    AvatarFallbackText,
} from "@/gluestackComponents";

import { useRouter } from "expo-router";
import { useAuth } from "@/Context/AuthProvider";

import { BaseContainer } from '@/components/BaseContainer';
import HeaderContainer from '../components/HeaderContainer';
import { ConfigCard } from "@/components/tabs/config/configCard";


export default function EditProfileScreen() {
    const { user } = useAuth();
    const router = useRouter();

    const handleSave = () => {
        // Aqui você pode adicionar lógica para salvar os dados antes de voltar
        console.log("Perfil salvo!");
        router.push("/myprofile");
    };

    const TitleContainer = ({ name }) => (
        <Heading style={{ marginTop: 13, marginBottom: 13 }} fontSize={17}>
            {name}
        </Heading>
    );

    const ContainerInput = ({ name, place }) => (
        <View> 
            <HStack style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                <VStack style={{ width: '100%' }}>
                    <Text size="17">{name}</Text>
                    <TextInput style={styles.input} placeholder={place} />
                </VStack>
            </HStack>
        </View>
    );

    const HeaderLogoProfile = () => (
        <VStack style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar width={56} height={56}>
                <AvatarFallbackText>{user?.name}</AvatarFallbackText>
                <AvatarImage source={{ uri: user?.icon }} alt={user?.name} />
            </Avatar>
        </VStack>
    );

    const AboutProfile = () => (
        <View>
            <TitleContainer name="Sobre" />
            <VStack style={{ marginTop: 0, borderWidth: 1, borderColor: '#f2f2f2', padding: 2, borderRadius: 6 }}>
                <Text size="15" style={{ marginTop: 10, color: '#999' }}>
                    O meu grande objetivo de vida é ajudar você e sua empresa a expandir sua capacidade e visão empreendedora
                </Text>
                <View style={{ marginTop: 25, width: '100%', height: 3, backgroundColor: '#f2f2f2', borderRadius: 10 }} />
            </VStack>
        </View>
    );

    return (
        <ScrollView style={{ flex: 1 }}>
            <BaseContainer backgroundColor="#fff" gap="$2">

          
                <HStack p="$2">
                    <HeaderContainer title="Editar perfil" namebuttontab="Salvar"/>
                    <TouchableOpacity 
                        onPress={handleSave}
                    >
                   
                    </TouchableOpacity>
                </HStack>

                <HeaderLogoProfile />

                <ContainerInput name="Nome" place={user?.name} />
                <ContainerInput name="Bio" place="O meu grande objetivo de vida é ajudar você e sua empresa a expandir sua capacidade e visão empreendedora" />
                <ContainerInput name="Usuário" place="@CamilaFarani" />

                <AboutProfile />

                <VStack>
                    <TitleContainer name="Informações profissionais" />
                    <ConfigCard
                        items={[
                            { title: "Categorias", href: "/editcategorysmyprofile" },
                            { title: "Interesses", href: "/editmyinterestsprofile" },
                            { title: "Social", href: "/editsocialinfosmyprofile" },
                            { title: "Verificar Conta", href: "/verifyaccount" },
                        ]}
                    />
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
        marginTop: 4,
    },
});
