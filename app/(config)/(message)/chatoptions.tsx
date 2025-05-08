import { VStack } from "@/gluestackComponents";
import HeaderContainer from "@/components/HeaderContainer";
import { ConfigCardNoIcon } from "@/components/tabs/config/configCardNoIcon";
import { BaseContainer } from "@/components/BaseContainer";
import { useTranslation } from "react-i18next";

const ChatOptions = () => {
    const { t } = useTranslation();

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack gap="$4">
                <HeaderContainer title={t("chatOptions.title")} />
                <VStack>
                    <ConfigCardNoIcon
                        items={[
                            { title: t("chatOptions.export") },
                            { title: t("chatOptions.archiveAll") },
                            {
                                title: t("chatOptions.deleteAll"),
                                color: "$negative",
                            },
                        ]}
                    />
                </VStack>
            </VStack>
        </BaseContainer>
    );
};

export default ChatOptions;
