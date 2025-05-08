import { VStack } from "@/gluestackComponents";
import HeaderContainer from "@/components/HeaderContainer";
import { ConfigCard } from "@/components/tabs/config/configCard";
import { BaseContainer } from "@/components/BaseContainer";
import { useTranslation } from "react-i18next";

const configSecurity = () => {
    const { t } = useTranslation();

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title={t("security.title")} />
                <VStack p="$1" pt="$2" gap="$6">
                    <ConfigCard
                        items={[
                            { title: t("security.changePassword"), href: "/changePassword" },
                            {
                                title: t("security.activate2fa"),
                                href: "/configSecurity2fa",
                            },
                        ]}
                    />
                </VStack>
            </VStack>
        </BaseContainer>
    );
};

export default configSecurity;
