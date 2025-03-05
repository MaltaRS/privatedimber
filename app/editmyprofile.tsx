import { useState } from 'react';
import { 
    View, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert
} from 'react-native';

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
import HeaderContainer from '@/components/HeaderContainer';
import TitleContainer from "@/components/TitleContainer";
import { ConfigCard } from "@/components/tabs/config/configCard";

export default function EditProfileScreen() {
    const { user } = useAuth();
    const router = useRouter();

    const [name, setName] = useState(user?.name || "");
    const [username, setUsername] = useState("@CamilaFarani");
    const [bio, setBio] = useState("O meu grande objetivo de vida é ajudar você e sua empresa a expandir sua capacidade e visão empreendedora");

    const handleSave = () => {
        if (!name.trim() || !username.trim()) {
            Alert.alert("Erro", "Nome e Usuário não podem estar vazios.");
            return;
        }

        console.log("Perfil salvo!", { name, username, bio });
        Alert.alert("Sucesso", "Seu perfil foi atualizado!");
        router.push("/myprofile");
    };



    const ContainerInput = ({ name, value, onChange }) => (
        <View> 
            <HStack style={styles.inputContainer}>
                <VStack style={{ width: '100%' }}>
                    <Text size="17">{name}</Text>
                    <TextInput 
                        style={styles.input} 
                        value={value} 
                        onChangeText={onChange}
                    />
                </VStack>
            </HStack>
        </View>
    );

    const HeaderLogoProfile = () => (
        <VStack style={styles.avatarContainer}>
            <Avatar width={56} height={56}>
                <AvatarFallbackText>{user?.name}</AvatarFallbackText>
                <AvatarImage source={{ uri: user?.icon }} alt={user?.name} />
            </Avatar>
        </VStack>
    );

    const AboutProfile = () => (
        <View>
            <TitleContainer name="Sobre" />
            <VStack style={styles.aboutContainer}>
                <Text size="15" style={styles.aboutText}>{bio}</Text>
             
            </VStack>
        </View>
    );

    return (
        <ScrollView style={{ flex: 1 }}>
            <BaseContainer>
             <VStack gap="$4">
                <HeaderContainer title="Editar perfil" namebuttontab="Salvar" />

                <HeaderLogoProfile />

                <ContainerInput name="Nome" value={name} onChange={setName} />
                <ContainerInput name="Bio" value={bio} onChange={setBio} />
                <ContainerInput name="Usuário" value={username} onChange={setUsername} />

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
            </VStack>
            </BaseContainer>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        marginTop: 13,
        marginBottom: 13,
        fontSize: 17,
  
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#f2f2f2',
        borderRadius: 7,
        padding: 10,
        marginTop: 4,
    },
    avatarContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    aboutContainer: {
        marginTop: 0,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 6,
    },
    aboutText: {
        marginTop: 10,
        color: '#999',
    },
    divider: {
        marginTop: 25,
        width: '100%',
        height: 3,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
});
