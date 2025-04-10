import { VStack } from "@/gluestackComponents";

import HeaderContainer from "@/components/HeaderContainer";

import { BaseContainer } from "@/components/BaseContainer";

export default function HelpScreen() {
    return (
        <BaseContainer>
            <HeaderContainer title="Ajuda" />
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
