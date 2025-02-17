import { useRef, useState } from "react";
import { StyleSheet } from "react-native";

import { HStack, Pressable, Text } from "@/gluestackComponents";

import { VideoProps } from "./SendMessageForm";

import { ResizeMode, Video } from "expo-av";
import { X } from "lucide-react-native";

type VideoPreviewFormProps = {
    video: VideoProps;
    setPreviewVideos: React.Dispatch<React.SetStateAction<VideoProps[]>>;
    index: number;
};

export const VideoPreviewForm = ({
    video,
    setPreviewVideos,
    index,
}: VideoPreviewFormProps) => {
    const videoRef = useRef(null);

    const [status, setStatus] = useState({});

    return (
        <HStack
            key={video.name}
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
                <Video
                    ref={videoRef}
                    style={styles.video}
                    source={{
                        uri: video.uri,
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
                <Text
                    color="$primaryDefault"
                    fontFamily="$heading"
                    fontWeight="$bold"
                    size="md"
                >
                    {video.name.length > 15
                        ? `${video.name.substring(0, 15)}[...]${video.name.substring(video.name.lastIndexOf("."))} `
                        : `${video.name} `}
                </Text>
                <Text
                    color="$gray500"
                    fontFamily="$novaBody"
                    fontWeight="$bold"
                    size="md"
                >
                    ({(video.size / 1024).toFixed(2)} KB)
                </Text>
            </HStack>
            <Pressable
                onPress={() =>
                    setPreviewVideos((prev) =>
                        prev.filter((_, i) => i !== index),
                    )
                }
            >
                <X size={20} color="#374151" />
            </Pressable>
        </HStack>
    );
};

const styles = StyleSheet.create({
    video: {
        width: 50,
        height: 50,
    },
});
