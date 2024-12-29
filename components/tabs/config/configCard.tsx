import {
    Divider,
    HStack,
    Pressable,
    Text,
    VStack,
} from "@/gluestackComponents";

import { Colors } from "@/constants/Colors";

import { ChevronRight } from "lucide-react-native";

type ConfigCardItem = React.ComponentProps<typeof Text> & {
    title: string;
    icon?: React.ReactNode;
    href?: string;
    action?: () => void;
};

type ConfigCardProps = {
    items: ConfigCardItem[];
};

export const ConfigCard = ({ items }: ConfigCardProps) => {
    return (
        <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={2}>
            {items.map((item, index) => (
                <Pressable
                    key={item.title}
                    {...(item.action && { onPress: item.action })}
                >
                    <HStack
                        pr="$4"
                        py="$5"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Text
                            size="xl"
                            fontFamily="$novaBody"
                            color="$gray800"
                            lineHeight={24}
                            {...item}
                        >
                            {item.title}
                        </Text>
                        {item.icon ? (
                            item.icon
                        ) : (
                            <ChevronRight size={22} color={Colors.gray700} />
                        )}
                    </HStack>
                    {index < items.length - 1 && <Divider bgColor="$gray300" />}
                </Pressable>
            ))}
        </VStack>
    );
};
