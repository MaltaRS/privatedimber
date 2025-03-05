import { ScrollView } from "react-native";
import {
    VStack,
} from "@/gluestackComponents";

import { StatusBar } from "expo-status-bar";
import HeaderContainer from "../components/HeaderContainer";
import { ConfigCardSwitch } from "@/components/tabs/config/configCardSwitch";
import { BaseContainer } from "@/components/BaseContainer";
import TitleContainer from "@/components/TitleContainer";

const Permissions = () => {
    return (
            <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title="Permissões" />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 46 }}
                >
                    <VStack p="$1">
                        {/* Seção de Direito de Resposta */}
                        <TitleContainer name="Direito de resposta" />
                        <ConfigCardSwitch 
                            items={[
                                { title: "Conceder resposta" }
                            ]}
                        />

                        {/* Seção de Anexos */}
                        <TitleContainer name="Anexos" />
                        <ConfigCardSwitch 
                            items={[
                                { title: "Permitir arquivo" },
                                { title: "Permitir foto" },
                                { title: "Permitir vídeo" }
                            ]}
                        />
                    </VStack>
                </ScrollView>
            </VStack>

            <StatusBar style="auto" />
        </BaseContainer>
    );
};

export default Permissions;
