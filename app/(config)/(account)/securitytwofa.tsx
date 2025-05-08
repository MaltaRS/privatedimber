import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";
import { useTranslation } from "react-i18next";

export default function ConfigSecurity2fa() {
    const { t } = useTranslation();

    return (
        <BaseContainer backgroundColor="$gray50">
            <HeaderContainer title={t("security2fa.activate2fa")} />
        </BaseContainer>
    );
}
