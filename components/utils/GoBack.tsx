import { Pressable } from "@/gluestackComponents";

import { MoveLeft, X } from "lucide-react-native";

import { Colors } from "@/constants/Colors";

type GoBackProps = {
    onPress: () => void;
    transparent?: boolean;
    style?: any;
    iconSize?: number;
    icon?: "arrow" | "close";
};

export const GoBack = ({
    onPress,
    transparent = false,
    style,
    iconSize = 24,
    icon = "arrow",
}: GoBackProps) => {
    const Icon = icon === "arrow" ? MoveLeft : X;

    return (
        <Pressable
            p="$2"
            zIndex={1000}
            alignItems="center"
            justifyContent="center"
            rounded="$full"
            onPress={onPress}
            {...(transparent
                ? {
                      bgColor: "transparent",
                  }
                : {
                      bgColor: "$gray100",
                  })}
            {...style}
        >
            <Icon size={iconSize} color={Colors.gray700} />
        </Pressable>
    );
};
