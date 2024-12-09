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

const Camera = () => {
    const router = useRouter();

    const [facing, setFacing] = useState<CameraType>("back");
    const [permission, requestPermission] = useCameraPermissions();

    const [isRecording, setIsRecording] = useState(false);
    const cameraRef = useRef<CameraView>(null);

    const handleRecord = async () => {
        if (cameraRef.current) {
            if (isRecording) {
                cameraRef.current.stopRecording();
                setIsRecording(false);
                console.log("Gravação finalizada");
            } else {
                console.log("Iniciando gravação...");

                const video = await cameraRef.current.recordAsync({
                    maxDuration: 120,
                    maxFileSize: 100 * 1024 * 1024,
                });
                console.log(video);

                if (video?.uri) {
                    console.log("Gravação iniciada:", video.uri);
                    setIsRecording(true);
                } else {
                    console.log("Erro ao iniciar a gravação");
                }
            }
        }
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
                        top="$8"
                        left="$2"
                        rounded="$full"
                        w="$12"
                        h="$12"
                        p="$3"
                        bg="$gray400"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <ArrowLeft color="#fff" size={24} />
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            setFacing(facing === "back" ? "front" : "back")
                        }
                        position="absolute"
                        top="$8"
                        right="$1"
                        rounded="$full"
                        w="$12"
                        h="$12"
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
                        rounded="$full"
                        w="$16"
                        h="$16"
                        bg={isRecording ? "$red500" : "$gray400"}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text color="#fff" fontWeight="bold">
                            {isRecording ? "Parar" : "Gravar"}
                        </Text>
                    </Pressable>
                </VStack>
            </CameraView>
        </VStack>
    );
};

export default Camera;
