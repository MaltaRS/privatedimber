import { Text } from "@/gluestackComponents";

export default function TitleContainerProfile(title) {
    return (
        <Text
            fontSize={16}
            fontFamily="$medium"
            color="#15161E"
            lineHeight={20}
        >
            {title.name}
        </Text>
    );
}
