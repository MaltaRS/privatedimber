import { ScrollView, VStack } from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";

const Terms = () => {
    return (
        <BaseContainer>
            <VStack gap="$4">
                <HeaderContainer title="Termos de Uso" />
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

export default Terms;
