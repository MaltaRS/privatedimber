import { VStack } from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";
import { ConfigCard } from "@/components/tabs/config/configCard";
import { BaseContainer } from "@/components/BaseContainer";

const Configsecurity = () => {
    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title="Segurança" />
                <VStack p="$1" pt="$2" gap="$6">
                    <ConfigCard
                        items={[
                            { title: "Alterar senha", href: "/changepassword" },
                            {
                                title: "Ativar segurança 2FA",
                                href: "/configsecurity2fa",
                            },
                        ]}
                    />
                </VStack>
            </VStack>
        </BaseContainer>
    );
};

export default Configsecurity;
