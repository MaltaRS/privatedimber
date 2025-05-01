import { Menu, Pressable, Text } from "@/gluestackComponents";

import { Colors } from "@/constants/Colors";

import { MoreVertical } from "lucide-react-native";

import AddCard from "@/assets/icons/appIcons/newCard.svg";
import Report from "@/assets/icons/appIcons/report.svg";

import { Octicons } from "@expo/vector-icons";

import { useBlockedUsers } from "@/hooks/useBlockedUsers";

type ProfileMenuProps = {
    userId: string;
    isBlocked?: boolean;
    onBlock: () => void;
    onPayments: () => void;
    onReport: () => void;
};

export const ProfileMenu = ({
    userId,
    isBlocked: initialIsBlocked,
    onBlock,
    onPayments,
    onReport,
}: ProfileMenuProps) => {
    const { data: blockedUsers = [] } = useBlockedUsers();

    console.log("blockedUsers", blockedUsers);

    const isBlocked =
        blockedUsers.some((user) => user.id === userId) || initialIsBlocked;

    console.log("isBlocked", userId, isBlocked);

    return (
        <Menu
            placement="bottom right"
            bgColor="$white"
            rounded={12}
            py="$0"
            trigger={({ ...triggerProps }) => {
                return (
                    <Pressable
                        borderRadius="$full"
                        alignItems="center"
                        justifyContent="center"
                        p={17}
                        bgColor="$gray100"
                        {...triggerProps}
                    >
                        <MoreVertical size={24} color={Colors.gray700} />
                    </Pressable>
                );
            }}
        >
            <Menu.Item
                onPress={onPayments}
                justifyContent="flex-start"
                alignItems="center"
                py="$3"
                pl="$4"
                textValue="Pagamentos"
            >
                <AddCard width={21} height={21} />
                <Text ml="$3" fontSize={19} color="$black" fontWeight="$medium">
                    Pagamentos
                </Text>
            </Menu.Item>
            <Menu.Item
                onPress={onReport}
                justifyContent="flex-start"
                alignItems="center"
                py="$3"
                pl="$4"
                textValue="Denunciar"
            >
                <Report width={22} height={22} />
                <Text
                    ml="$3"
                    fontSize={19}
                    color="$negative"
                    fontWeight="$medium"
                >
                    Denunciar
                </Text>
            </Menu.Item>
            <Menu.Item
                onPress={onBlock}
                alignItems="center"
                py="$3"
                pl="$4"
                textValue={isBlocked ? "Desbloquear" : "Bloquear"}
            >
                <Octicons
                    name="circle-slash"
                    size={20}
                    color={isBlocked ? "#007BFF" : "#D32F2F"}
                />
                <Text
                    ml="$4"
                    color={isBlocked ? "$blue500" : "$negative"}
                    fontWeight="$medium"
                    fontSize={18}
                >
                    {isBlocked ? "Desbloquear" : "Bloquear"}
                </Text>
            </Menu.Item>
        </Menu>
    );
};
