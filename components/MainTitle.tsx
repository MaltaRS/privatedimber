import { Box, HStack, Text } from "@/gluestackComponents";
import { Bell } from "lucide-react-native";

import { Pressable, Image } from "react-native";
import dimberLogoo from "@/assets/icons/dimberLogo.svg";
import DimberLogo from "@/assets/icons/dimberLogo.svg";



type MainTitleProps = {
    title: string;
    onPress: () => void;
    notificationsCount: number;
    hide?: boolean;
};

export const MainTitle = ({
    title,
    onPress,
    notificationsCount,
    hide = false,
}: MainTitleProps) => {
    return (
        <HStack justifyContent="space-between" alignItems="center" zIndex={3}>
            <HStack alignItems="center" justifyContent="center" >
                
                
                <Text
                    fontSize={28}
                    fontFamily="$heading"
                    fontWeight="$bold"
                    color={!hide ? "#000" : "#00000000"}
                >
                    {title}
                </Text>
                    <DimberLogo width={24} height={24} marginLeft={6} alignItems="center" marginTop={5}/>

            </HStack>
            {!hide && (
                <Pressable onPress={onPress}>
                    <Box position="relative">
                        <Bell size={24} color="black" />
                        {notificationsCount > 0 && (
                            <Box
                                position="absolute"
                                top={-1}
                                right={-2}
                                bgColor="$primaryDefault"
                                borderRadius="$full"
                                h={6}
                                w={6}
                                justifyContent="center"
                                alignItems="center"
                                zIndex={999}
                            />
                        )}
                    </Box>
                </Pressable>
            )}
        </HStack>
    );
};