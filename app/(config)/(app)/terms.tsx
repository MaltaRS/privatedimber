import { ScrollView, VStack } from "@/gluestackComponents";
import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";
import { useTranslation } from "react-i18next";

const Terms = () => {
    const { t } = useTranslation();

    return (
        <BaseContainer>
            <VStack gap="$4">
                <HeaderContainer title={t("terms.title")} />
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
