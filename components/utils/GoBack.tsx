import { Pressable } from "@/gluestackComponents";

import { MoveLeft } from "lucide-react-native";

import { Colors } from "@/constants/Colors";

type GoBackProps = {
    onPress: () => void;
    transparent?: boolean;
    style?: any;
    iconSize?: number;
};

export const GoBack = ({
    onPress,
    transparent = false,
    style,
    iconSize = 24,
}: GoBackProps) => {
    return (
        <Pressable
            p="$2"
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
            <MoveLeft size={iconSize} color={Colors.gray700} />
        </Pressable>
    );
};
