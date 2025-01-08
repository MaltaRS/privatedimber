import { HStack, Pressable, Text } from "@/gluestackComponents";

import { DocumentProps } from "./SendMessageForm";
import { X } from "lucide-react-native";

type DocumentPreviewFormProps = {
    document: DocumentProps;
    setPreviewDocuments: React.Dispatch<React.SetStateAction<DocumentProps[]>>;
    index: number;
};

export const DocumentPreviewForm = ({
    document,
    setPreviewDocuments,
    index,
}: DocumentPreviewFormProps) => {
    return (
        <HStack
            key={document.name}
            gap="$2"
            px="$2"
            py="$3"
            bgColor="$gray200"
            rounded="$lg"
            borderWidth={1}
            borderColor="$gray400"
            alignItems="center"
            justifyContent="space-between"
        >
            <HStack alignItems="center" gap="$2">
                <Text
                    color="$primaryDefault"
                    fontFamily="$heading"
                    fontWeight="$bold"
                    size="md"
                >
                    {document.name.length > 15
                        ? `${document.name.substring(0, 15)}[...]${document.name.substring(document.name.lastIndexOf("."))} `
                        : `${document.name} `}
                    <Text
                        color="$gray500"
                        fontFamily="$novaBody"
                        fontWeight="$bold"
                        size="md"
                    >
                        ({(document.size / 1024).toFixed(2)} KB)
                    </Text>
                </Text>
            </HStack>
            <Pressable
                onPress={() =>
                    setPreviewDocuments((prev) =>
                        prev.filter((_, i) => i !== index),
                    )
                }
            >
                <X size={20} color="#374151" />
            </Pressable>
        </HStack>
    );
};
