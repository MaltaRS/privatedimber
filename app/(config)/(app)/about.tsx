import { ScrollView, VStack } from "@/gluestackComponents";
import HeaderContainer from "@/components/HeaderContainer";
import { ConfigCard } from "@/components/tabs/config/configCard";
import { BaseContainer } from "@/components/BaseContainer";
import { useTranslation } from "react-i18next";

const Configsecurity = () => {
    const { t } = useTranslation();

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title={t("about.title")} />
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
                                    title: t("about.terms"),
                                    href: "/(config)/(app)/terms",
                                },
                                {
                                    title: t("about.privacy"),
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
