import { useRouter } from "expo-router";

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
    const router = useRouter();

    return (
        <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={1}>
            {items.map((item) => (
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
                            fontFamily="$Body"
                            color="$gray800"
                            lineHeight={24}
                            fontSize={20}
                            {...item}
                        >
                            {item.title}
                        </Text>
                        {item.icon ? (
                            item.icon
                        ) : (
                            <ChevronRight size={24} color={Colors.black} />
                        )}
                    </HStack>
                    <Divider bgColor="$gray200" />
                </Pressable>
            ))}
        </VStack>
    );
};
