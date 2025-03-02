import { Divider, HStack, Pressable, Text, VStack } from "@/gluestackComponents";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";


type ConfigCardItem = React.ComponentProps<typeof Text> & {
    title: string;
    icon?: React.ReactNode;
    href?: string;
    action?: () => void;
};

type ConfigCardProps = {
    items: ConfigCardItem[];
};

export const ConfigCardNoIcon = ({ items }: ConfigCardProps) => {
    const router = useRouter();

    return (
        <VStack bgColor="#fff" pl="$4" borderRadius="$xl"  
         elevation={2}
      >
            {items.map((item, index) => (
                <Pressable
                    key={item.title}
                    onPress={() => {
                        if (item.href) {
                            router.push(item.href);
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
                            size="xl"
                            fontFamily="$novaBody"
                            color="$gray800"
                            lineHeight={24}
                            {...item}
                        >
                            {item.title}
                        </Text>
           
                    </HStack>
                    {index < items.length - 1 && <Divider bgColor="$gray200" />}
                </Pressable>
            ))}
        </VStack>
    );
};