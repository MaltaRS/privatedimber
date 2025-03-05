import {
    VStack,
} from "@/gluestackComponents";

import { StatusBar } from "expo-status-bar";
import HeaderContainer from "../components/HeaderContainer";
import TitleContainer from "../components/TitleContainer";
import { ConfigCardSwitch } from "@/components/tabs/config/configCardSwitch";
import { BaseContainer } from "@/components/BaseContainer";

const ConfigNotifications = () => {
    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack>
                <HeaderContainer title="Notificações" />

             
                    <VStack p="$1">
                        

                        <TitleContainer name="Notificações de mensagens" />
                        <ConfigCardSwitch 
                            items={[
                                { title: "Mostrar Notificações" }
                            ]}
                        />

                        <TitleContainer name="Notificações de email" />
                        <ConfigCardSwitch 
                            items={[
                                { title: "Solicitação de mensagem" },
                                { title: "Pagamentos" },
                                { title: "Suporte" }
                            ]}
                        />
                    </VStack>
            </VStack>

            <StatusBar style="auto" />
        </BaseContainer>
    );
};

export default ConfigNotifications;
