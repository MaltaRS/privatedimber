import {
    Divider,
    HStack,
    Pressable,
    Text,
    VStack,
} from "@/gluestackComponents";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

type ConfigCardItem = React.ComponentProps<typeof Text> & {
    title: string;
    icon?: React.ReactNode;
    href?: string;
    action?: () => void;
    color?: string;
};

type ConfigCardProps = {
    items: ConfigCardItem[];
};

export const ConfigCardNoIcon = ({ items }: ConfigCardProps) => {
    const router = useRouter();

    return (
        <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={2}>
            {items.map((item, index) => (
                <Pressable
                    key={item.title}
                    onPress={() => {
                        if (item.href) {
                            router.push(item.href as any);
                        }
                        if (item.action) {
                            item.action();
                        }
                    }}
                >
                    <HStack
                        pr="$4"
                        py="$5"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Text
                            size="lg"
                            fontFamily="$novaBody"
                            fontWeight="bold"
                            color={item.color ?? "$black"}
                            lineHeight={24}
                            fontSize={20}
                            {...item}
                        >
                            {item.title}
                        </Text>
                    </HStack>
                    {index === items.length - 2 && (
                        <Divider bgColor="$gray200" />
                    )}
                </Pressable>
            ))}
        </VStack>
    );
};
