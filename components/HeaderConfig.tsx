import { VStack, HStack, View, Heading, Text } from "@/gluestackComponents";

type HeaderConfigProps = {
    title: string;
    description: string;
    icon?: React.ReactNode;
};

const HeaderConfig = ({ title, description, icon }: HeaderConfigProps) => {
    return (
        <View>
            <VStack>
                <HStack alignItems="center" gap="$2">
                    {icon && icon} {/* Renderiza o ícone se existir */}
                    <Heading>{title}</Heading>
                </HStack>
                <Text fontSize="$sm" fontFamily="$arialBody" color="$gray700">
                    {description}
                </Text>
            </VStack>
        </View>
    );
};

export default HeaderConfig;
