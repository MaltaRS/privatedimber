import { ScrollView, VStack } from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";
import { ConfigCard } from "@/components/tabs/config/configCard";
import { BaseContainer } from "@/components/BaseContainer";

const Configsecurity = () => {
    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title="Sobre" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 46,
                    }}
                >
                    <VStack p="$1" pt="$2" gap="$6">
                        <ConfigCard
                            items={[
                                {
                                    title: "Termos de uso",
                                    href: "/(config)/(app)/terms",
                                },
                                {
                                    title: "Poilitica de privacidade",
                                    href: "/(config)/(app)/privacy",
                                },
                            ]}
                        />
                    </VStack>
                </ScrollView>
            </VStack>
        </BaseContainer>
    );
};

export default Configsecurity;
