import { HStack, Image, Pressable, Text } from "@/gluestackComponents";

import { ImageProps } from "./SendMessageForm";
import { X } from "phosphor-react-native";

type ImagePreviewFormProps = {
    image: ImageProps;
    setPreviewImages: React.Dispatch<React.SetStateAction<ImageProps[]>>;
    index: number;
};

export const ImagePreviewForm = ({
    image,
    setPreviewImages,
    index,
}: ImagePreviewFormProps) => {
    return (
        <HStack
            key={image.name}
            gap="$2"
            p="$2"
            bgColor="$gray200"
            rounded="$lg"
            borderWidth={1}
            borderColor="$gray400"
            alignItems="center"
            justifyContent="space-between"
        >
            <HStack alignItems="center" gap="$2">
                <Image
                    source={{ uri: image.uri }}
                    width={50}
                    height={50}
                    rounded={10}
                    alt={image.name}
                />
                <Text
                    color="$primaryDefault"
                    fontFamily="$heading"
                    fontWeight="$bold"
                    size="md"
                >
                    {image.name.length > 12
                        ? `${image.name.substring(0, 12)}[...]${image.name.substring(image.name.lastIndexOf("."))} `
                        : `${image.name} `}
                    <Text
                        color="$gray500"
                        fontFamily="$novaBody"
                        fontWeight="$bold"
                        size="md"
                    >
                        ({(image.size / 1024).toFixed(2)} KB)
                    </Text>
                </Text>
            </HStack>
            <Pressable
                onPress={() =>
                    setPreviewImages((prev) =>
                        prev.filter((_, i) => i !== index),
                    )
                }
            >
                <X size={20} color="#374151" />
            </Pressable>
        </HStack>
    );
};
