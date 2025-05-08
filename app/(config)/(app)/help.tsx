import { VStack } from "@/gluestackComponents";
import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";
import { useTranslation } from "react-i18next";

export default function HelpScreen() {
    const { t } = useTranslation();

    return (
        <BaseContainer>
            <HeaderContainer title={t("help.title")} />
            <VStack
                bgColor="#fff"
                pl="$4"
                borderRadius="$xl"
                elevation={2}
                marginTop={30}
            ></VStack>
        </BaseContainer>
    );
}
