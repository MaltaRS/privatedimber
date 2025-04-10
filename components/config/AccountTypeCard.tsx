import { VStack, HStack, Text, Box, Pressable } from "@/gluestackComponents";
import { SvgProps } from "react-native-svg";

interface AccountTypeCardProps {
    title: string;
    description: string;
    icon: React.FC<SvgProps>;
    isSelected: boolean;
    onSelect: () => void;
}

export const AccountTypeCard = ({
    title,
    description,
    icon: Icon,
    isSelected,
    onSelect,
}: AccountTypeCardProps) => {
    return (
        <Pressable onPress={onSelect}>
            <VStack borderWidth={1} borderRadius="$lg" p="$4">
                <HStack alignItems="center" gap="$4">
                    <Icon width={29} height={29} />
                    <Text fontSize={22} color="$black" fontFamily="novaTitle">
                        {title}
                    </Text>
                </HStack>
                <HStack
                    mt="$3"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Text fontSize={18} color="$gray800" flex={1} mr="$2">
                        {description}
                    </Text>
                    <Box minWidth={30} alignItems="center">
                        <Box
                            width={20}
                            height={20}
                            borderRadius="$full"
                            borderWidth={2}
                            borderColor="$primaryDefault"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {isSelected && (
                                <Box
                                    width={8}
                                    height={8}
                                    bgColor="$primaryDefault"
                                    borderRadius="$full"
                                />
                            )}
                        </Box>
                    </Box>
                </HStack>
            </VStack>
        </Pressable>
    );
};
