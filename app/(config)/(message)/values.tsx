import { useState, useEffect, Fragment } from "react";

import { useRouter } from "expo-router";

import {
    ButtonText,
    Heading,
    ScrollView,
    Text,
    VStack,
} from "@/gluestackComponents";

import { PercentageSelect } from "@/components/tabs/config/PercentageSelect";
import { PriceInput } from "@/components/tabs/config/PriceInput";
import { SkeletonBox } from "@/components/utils/SkeletonBox";
import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";
import { Button } from "@/components/ui/Button";

import { useSettings } from "@/hooks/SettingsHook";

import { toast } from "burnt";

export default function ConfigDefinedValueMsgScreen() {
    const router = useRouter();

    const { settings, updateSettings } = useSettings();
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    const [values, setValues] = useState({
        basePrice: "",
        attachmentPercentage: "",
        videoPercentage: "",
        imagePercentage: "",
    });

    useEffect(() => {
        if (settings?.priceSettings) {
            setValues({
                basePrice: settings.priceSettings.basePrice
                    ? String(settings.priceSettings.basePrice)
                    : "",
                attachmentPercentage: settings.priceSettings
                    .attachmentPercentage
                    ? String(settings.priceSettings.attachmentPercentage)
                    : "",
                videoPercentage: settings.priceSettings.videoPercentage
                    ? String(settings.priceSettings.videoPercentage)
                    : "",
                imagePercentage: settings.priceSettings.imagePercentage
                    ? String(settings.priceSettings.imagePercentage)
                    : "",
            });
            setIsInitialLoading(false);
        }
        if (!settings?.priceSettings) {
            setValues({
                basePrice: "",
                attachmentPercentage: "",
                videoPercentage: "",
                imagePercentage: "",
            });
            setIsInitialLoading(false);
        }
    }, [settings]);

    const handleSave = async () => {
        try {
            const updatePayload = {
                priceSettings: {
                    basePrice: values.basePrice
                        ? Number(values.basePrice) * 100
                        : 10000,
                    attachmentPercentage: values.attachmentPercentage
                        ? Number(values.attachmentPercentage)
                        : 10,
                    videoPercentage: values.videoPercentage
                        ? Number(values.videoPercentage)
                        : 10,
                    imagePercentage: values.imagePercentage
                        ? Number(values.imagePercentage)
                        : 10,
                },
            };

            await updateSettings(updatePayload);
            router.back();
        } catch (error: unknown) {
            console.log(error);
            toast({
                title: "Erro",
                message: "Não foi possível salvar os valores. Tente novamente.",
                haptic: "error",
            });
        }
    };

    const LoadingSkeleton = () => (
        <VStack gap="$4" flex={1} w="100%">
            <SkeletonBox width={350} height={28} />

            <VStack gap="$2" mt="$4" flex={1}>
                <VStack gap="$2">
                    <SkeletonBox width={120} height={24} />
                    <SkeletonBox width={180} height={24} />
                    <VStack
                        bgColor="$white"
                        pl="$4"
                        borderRadius="$xl"
                        elevation={2}
                    >
                        <VStack py="$4" pr="$4" gap="$2">
                            <SkeletonBox
                                width={200}
                                height={48}
                                borderRadius="$lg"
                            />
                        </VStack>
                    </VStack>
                </VStack>

                {[1, 2, 3].map((item) => (
                    <VStack mt="$2" key={item} gap="$2">
                        <SkeletonBox width={180} height={28} />
                        <VStack
                            bgColor="$white"
                            pl="$4"
                            borderRadius="$xl"
                            elevation={2}
                        >
                            <VStack py="$4" gap="$2">
                                <SkeletonBox
                                    width={200}
                                    height={42}
                                    borderRadius="$lg"
                                />
                            </VStack>
                        </VStack>
                    </VStack>
                ))}
            </VStack>
        </VStack>
    );

    return (
        <BaseContainer backgroundColor="$gray50">
            <VStack flex={1}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 20,
                    }}
                >
                    <VStack gap="$4" flex={1} w="100%">
                        <HeaderContainer title="Definir valores" />

                        {isInitialLoading ? (
                            <LoadingSkeleton />
                        ) : (
                            <Fragment>
                                <Text fontSize={17} color="#374151">
                                    Defina o valor que você deseja cobrar por
                                    cada interação.
                                </Text>

                                <VStack>
                                    <VStack mt="$2">
                                        <VStack>
                                            <Heading>Base de preço</Heading>
                                            <Text fontSize={15} color="#374151">
                                                Preço mínimo por mensagem
                                            </Text>
                                        </VStack>
                                        <PriceInput
                                            value={values.basePrice}
                                            onChangeText={(value) =>
                                                setValues((prev) => ({
                                                    ...prev,
                                                    basePrice: value,
                                                }))
                                            }
                                            placeholder="R$ 100,00"
                                        />
                                    </VStack>

                                    <PercentageSelect
                                        title="Anexo"
                                        description="Porcentagem extra a ser cobrada por anexo"
                                        placeholder="10%"
                                        value={values.attachmentPercentage}
                                        onChangeText={(value) =>
                                            setValues((prev) => ({
                                                ...prev,
                                                attachmentPercentage: value,
                                            }))
                                        }
                                    />

                                    <PercentageSelect
                                        title="Video"
                                        description="Porcentagem extra a ser cobrada por video"
                                        placeholder="10%"
                                        value={values.videoPercentage}
                                        onChangeText={(value) =>
                                            setValues((prev) => ({
                                                ...prev,
                                                videoPercentage: value,
                                            }))
                                        }
                                    />

                                    <PercentageSelect
                                        title="Imagem"
                                        description="Porcentagem extra a ser cobrada por imagem"
                                        placeholder="10%"
                                        value={values.imagePercentage}
                                        onChangeText={(value) =>
                                            setValues((prev) => ({
                                                ...prev,
                                                imagePercentage: value,
                                            }))
                                        }
                                    />
                                </VStack>
                            </Fragment>
                        )}
                    </VStack>
                </ScrollView>

                <Button mb="$4" onPress={handleSave}>
                    <ButtonText textAlign="center">Salvar</ButtonText>
                </Button>
            </VStack>
        </BaseContainer>
    );
}
