import { Input as InputThemed } from "@/gluestackComponents";

import { Colors } from "@/constants/Colors";

type InputProps = React.ComponentProps<typeof InputThemed> & {};

export const Input = ({
    children,
    rounded = 8,
    size = "lg",
    borderColor = Colors.gray400,
    ...props
}: InputProps) => {
    return (
        <InputThemed
            rounded={rounded}
            borderColor={borderColor}
            size={size}
            {...props}
        >
            {children}
        </InputThemed>
    );
};
