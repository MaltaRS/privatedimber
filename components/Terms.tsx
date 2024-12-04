import { Text } from "@/gluestackComponents";

import { ExternalLink } from "./ExternalLink";

export const Terms = () => {
    return (
        <Text textAlign="center" fontSize="$sm" fontFamily="$arialBody">
            Ao registrar-se, você aceita nossos{" "}
            <ExternalLink href="https://www.google.com">
                Termos de Uso
            </ExternalLink>{" "}
            e{" "}
            <ExternalLink href="https://www.google.com">
                Política de Privacidade
            </ExternalLink>
        </Text>
    );
};
