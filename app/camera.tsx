import { useRef, useState } from "react";

import { useRouter } from "expo-router";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

import {
    Box,
    Button,
    ButtonText,
    Pressable,
    Text,
    VStack,
} from "@/gluestackComponents";

import { CameraRotate } from "phosphor-react-native";

import { ArrowLeft } from "lucide-react-native";
import { Animated } from "react-native";

const Camera = () => {
    const router = useRouter();

    const [facing, setFacing] = useState<CameraType>("back");
    const [permission, requestPermission] = useCameraPermissions();

    const [isRecording, setIsRecording] = useState(false);
    const cameraRef = useRef<CameraView>(null);

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleRecord = async () => {
        if (cameraRef.current) {
            if (isRecording) {
                cameraRef.current.stopRecording();
                setIsRecording(false);
                console.log("Gravação finalizada");
                animateButton(false);
            } else {
                console.log("Iniciando gravação...");

                setIsRecording(true);

                animateButton(true);

                const video = await cameraRef.current.recordAsync({
                    maxDuration: 120,
                    maxFileSize: 100 * 1024 * 1024,
                });

                console.log("Gravação finalizada:", video);

                setIsRecording(false);

                if (video?.uri) {
                    setIsRecording(true);
                    animateButton(false);
                } else {
                    console.log("Erro ao iniciar a gravação");
                }
            }
        }
    };

    const animateButton = (start: boolean) => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: start ? 1.2 : 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    if (!permission) {
        return <Box />;
    }

    if (!permission.granted) {
        return (
            <Box flex={1}>
                <Text textAlign="center" pb="$2">
                    Nós precisamos da sua permissão para acessar a câmera
                </Text>
                <Button onPress={requestPermission}>
                    <ButtonText>Permitir</ButtonText>
                </Button>
            </Box>
        );
    }

    return (
        <VStack flex={1} justifyContent="center">
            <CameraView
                style={{
                    flex: 1,
                }}
                animateShutter={true}
                facing={facing}
                ref={cameraRef}
            >
                <VStack flex={1} position="relative">
                    <Pressable
                        onPress={() => router.back()}
                        position="absolute"
                        top="$10"
                        left="$2"
                        rounded="$full"
                        w="$10"
                        h="$10"
                        bg="$gray400"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <ArrowLeft color="#fff" size={20} />
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            setFacing(facing === "back" ? "front" : "back")
                        }
                        position="absolute"
                        top="$10"
                        right="$1"
                        rounded="$full"
                        w="$10"
                        h="$10"
                        p="$3"
                        bg="$gray400"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <CameraRotate color="#fff" size={24} />
                    </Pressable>
                    <Pressable
                        onPress={handleRecord}
                        position="absolute"
                        left="$1/2"
                        transform={[{ translateX: "-50%" }]}
                        bottom="$8"
                        alignSelf="center"
                    >
                        <Animated.View
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 32,
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                                transform: [{ scale: scaleAnim }],
                            }}
                        >
                            <Box
                                w="$12"
                                h="$12"
                                rounded="$full"
                                bgColor={isRecording ? "#FF0000" : "#B0B0B0"}
                            />
                        </Animated.View>
                    </Pressable>
                </VStack>
            </CameraView>
        </VStack>
    );
};

export default Camera;
