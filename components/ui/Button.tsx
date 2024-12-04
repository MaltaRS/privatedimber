import { Colors } from "@/constants/Colors";

import { Button as ThemedButton } from "@/gluestackComponents";

type ButtonProps = React.ComponentProps<typeof ThemedButton> & {};

export const Button = ({
    rounded = "$full",
    size = "xl",
    bgColor = Colors.primaryDefault,
    children,
    ...props
}: ButtonProps) => {
    return (
        <ThemedButton
            size={size}
            rounded={rounded}
            bgColor={bgColor}
            {...props}
        >
            {children}
        </ThemedButton>
    );
};
