import { useState, useEffect } from "react";
import {
    Divider,
    HStack,
    Pressable,
    Text,
    VStack,
    Switch,
} from "@/gluestackComponents";

type ConfigCardItem = {
    title: string;
    icon?: React.ReactNode;
    value?: boolean;
    onToggle?: (value: boolean) => void;
};

type ConfigCardProps = {
    items: ConfigCardItem[];
};

export const ConfigCardSwitch = ({ items }: ConfigCardProps) => {
    const [switchStates, setSwitchStates] = useState<{
        [key: string]: boolean;
    }>({});

    useEffect(() => {
        const initialStates = items.reduce((acc, item) => {
            return { ...acc, [item.title]: item.value ?? false };
        }, {});
        setSwitchStates(initialStates);
    }, [items]);

    const toggleSwitch = (title: string) => {
        setSwitchStates((prev) => {
            const newValue = !prev[title];
            const newState = { ...prev, [title]: newValue };

            const item = items.find((i) => i.title === title);
            if (item?.onToggle) {
                item.onToggle(newValue);
            }

            return newState;
        });
    };

    return (
        <VStack bgColor="#fff" pl="$4" borderRadius="$xl" elevation={2}>
            {items.map((item, index) => (
                <Pressable key={item.title}>
                    <HStack
                        pr="$4"
                        py="$4"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Text
                            fontSize={20}
                            fontFamily="$novaBody"
                            color="$gray800"
                            lineHeight={24}
                        >
                            {item.title}
                        </Text>
                        <Switch
                            value={switchStates[item.title] ?? false}
                            onValueChange={() => toggleSwitch(item.title)}
                            trackColor={{ false: "#ccc", true: "#00A8FF" }}
                            thumbColor={
                                switchStates[item.title] ? "#fff" : "#f4f4f4"
                            }
                        />
                    </HStack>
                    {index < items.length - 1 && <Divider bgColor="$gray200" />}
                </Pressable>
            ))}
        </VStack>
    );
};
