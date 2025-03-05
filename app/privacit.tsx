import { VStack } from "@/gluestackComponents";
import { StatusBar } from "expo-status-bar";
import HeaderContainer from "../components/HeaderContainer";
import { ConfigCardSwitch } from "@/components/tabs/config/configCardSwitch";
import { ConfigCard } from "@/components/tabs/config/configCard";
import { BaseContainer } from "@/components/BaseContainer";

const PrivacyScreen = () => {
    return (
              <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                {/* Cabeçalho */}
                <HeaderContainer title="Privacidade" />

                <VStack p="$1" gap="$6">

                    <ConfigCard
                        items={[
                            { title: "Bloqueados", href: "/listblockusers" },
                        ]}
                    />


                    <ConfigCardSwitch
                        items={[
                            { title: "Mostrar Online" },
                            { title: "Mostrar última atualização" },
                            { title: "Exibir estatísticas" },
                            { title: "Modo férias" },
                        ]}
                    />
                </VStack>
            </VStack>

            <StatusBar style="auto" />
        </BaseContainer>
    );
};

export default PrivacyScreen;
