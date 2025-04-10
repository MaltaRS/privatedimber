import { ScrollView, VStack } from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";

const Policy = () => {
    return (
        <BaseContainer>
            <VStack gap="$4">
                <HeaderContainer title="Política de Privacidade" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 46,
                    }}
                >
                    <VStack p="$1" pt="$2" gap="$6"></VStack>
                </ScrollView>
            </VStack>
        </BaseContainer>
    );
};

export default Policy;
