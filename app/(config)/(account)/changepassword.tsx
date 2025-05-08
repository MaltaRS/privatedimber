import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";
import { useTranslation } from "react-i18next";

export default function ChangePasswordScreen() {
    const { t } = useTranslation();

    return (
        <BaseContainer>
            <HeaderContainer title={t("changePassword.title")} />
        </BaseContainer>
    );
}
