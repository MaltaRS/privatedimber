import { VStack } from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";
import { ConfigCardNoIcon } from "@/components/tabs/config/configCardNoIcon";
import { BaseContainer } from "@/components/BaseContainer";

const PrivacyScreen = () => {
    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title="Conversas" />
                <VStack>
                    <ConfigCardNoIcon
                        items={[
                            { title: "Exportar conversas" },
                            { title: "Arquivar todas as conversas" },
                            {
                                title: "Apagar todas as conversas",
                                color: "$negative",
                            },
                        ]}
                    />
                </VStack>
            </VStack>
        </BaseContainer>
    );
};

export default PrivacyScreen;
