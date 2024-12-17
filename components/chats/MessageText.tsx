import { Text } from "@/gluestackComponents";

type MessageTextProps = {
    content: string;
    preview?: boolean;
};

export const MessageText = ({ content, preview = false }: MessageTextProps) => {
    const parseMessageContent = (text: string) => {
        const regex = /\*(.*?)\*/g; // Captura texto entre *
        const parts = [];
        let lastIndex = 0;

        text.replace(regex, (match, group, index) => {
            if (lastIndex !== index) {
                parts.push({
                    text: text.substring(lastIndex, index),
                    bold: false,
                });
            }
            parts.push({ text: group, bold: true });
            lastIndex = index + match.length;
            return match;
        });

        if (lastIndex < text.length) {
            parts.push({ text: text.substring(lastIndex), bold: false });
        }

        return parts;
    };

    let sanitizedContent = !preview
        ? content
        : content.substring(0, 27).replace(/[\r\n]+/g, " ");

    if (preview && content.length > 27) {
        sanitizedContent += "...";
    }

    const parsedContent = parseMessageContent(sanitizedContent);

    return (
        <Text
            size={preview ? "sm" : "md"}
            color={preview ? "$gray800" : "$gray900"}
            fontFamily="$arialBody"
        >
            {parsedContent.map((part, index) => (
                <Text
                    key={index}
                    size={preview ? "sm" : "md"}
                    color={preview ? "$gray800" : "$gray900"}
                    style={{
                        fontWeight: part.bold ? "bold" : "normal",
                    }}
                >
                    {part.text}
                </Text>
            ))}
        </Text>
    );
};
