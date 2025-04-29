import { useState } from "react";

import {
    Text,
    VStack,
    HStack,
    Avatar,
    AvatarImage,
    AvatarFallbackText,
    ButtonText,
    ScrollView,
    Pressable,
    View,
} from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";
import { Button } from "@/components/ui/Button";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useRouter } from "expo-router";
import { TabButton } from "@/components/utils/TabButton";

export default function ProfileInstituition() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<"sobre" | "doadores">("sobre");

    const institutionData = {
        id: "1",
        name: "Instituto Neymar Jr.",
        username: "@institutoneymarjr",
        location: "Santos - SP",
        lastSeen: "ontem às 21:30",
        verified: true,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5z03a91O5qAqycFrTXVjaBcpy1rOjeBERaw&s",
        description:
            "Mais influente da América Latina pela Bloomberg | Investidora Shark Tank Brasil | Empreendedora | LinkedIn",
        about: "O Instituto Projeto Neymar Jr. é uma organização sem fins lucrativos localizada em Praia Grande, no estado de São Paulo, Brasil. Fundado em dezembro de 2014 por Neymar Jr. e sua família, o instituto tem como principal objetivo oferecer suporte às comunidades em situação de vulnerabilidade social, promovendo oportunidades de educação, esporte, cultura e saúde para crianças, adolescentes e suas famílias.\n\nCom um espaço amplo e bem equipado, o instituto atende milhares de crianças entre 7 e 17 anos, oferecendo atividades esportivas, aulas educacionais e programas voltados ao desenvolvimento pessoal e social. Além disso, os familiares das crianças também são envolvidos em ações que buscam fortalecer os laços comunitários e proporcionar melhores condições de vida.",
        categories: ["Esporte", "Crianças"],
        stats: {
            followers: "1.2M",
            following: "1.5K",
            donations: "10.5K",
        },
    };

    const HeaderInfoProfile = () => {
        return (
            <VStack alignItems="center" space="md" pt="$4">
                <HStack alignItems="center" space="md">
                    <Avatar size="xl">
                        <AvatarFallbackText>
                            {institutionData.name}
                        </AvatarFallbackText>
                        <AvatarImage
                            source={{ uri: institutionData.avatar }}
                            alt={institutionData.name}
                        />
                    </Avatar>

                    <VStack gap={2}>
                        <HStack alignItems="center" space="xs">
                            <Text
                                fontFamily="$novaTitle"
                                fontSize={22}
                                color="$gray900"
                                lineHeight={24}
                            >
                                {institutionData.name}
                            </Text>
                            {institutionData.verified && (
                                <MaterialIcons
                                    name="verified"
                                    size={20}
                                    color="#00A8FF"
                                />
                            )}
                        </HStack>

                        <Text fontSize={17} color="$black">
                            {institutionData.username}
                        </Text>

                        <Text fontSize={15} color="$gray600" mt="$1">
                            última conexão {institutionData.lastSeen}
                        </Text>
                    </VStack>
                </HStack>
                <VStack alignItems="center" width="100%">
                    <Text
                        fontSize={16.5}
                        color="$black"
                        lineHeight={24}
                        width="100%"
                    >
                        {institutionData.description}
                    </Text>
                </VStack>
            </VStack>
        );
    };

    const AboutSection = () => {
        return (
            <VStack space="md" mt="$4">
                <Text
                    fontSize={21}
                    color="$black"
                    fontFamily="$heading"
                    lineHeight={24}
                >
                    Sobre nós
                </Text>
                <Text fontSize="$md" color="$gray800" lineHeight={24}>
                    {institutionData.about}
                </Text>
            </VStack>
        );
    };

    const DoadoresSection = () => {
        return (
            <VStack space="md" mt="$4">
                <Text fontSize="$md" color="$gray800" textAlign="center">
                    Lista de doadores aparecerá aqui (não definida ainda)
                </Text>
            </VStack>
        );
    };

    return (
        <BaseContainer>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
            >
                <HeaderContainer title="Instituição" showTitle={false} />

                <HeaderInfoProfile />

                <HStack
                    mt="$3"
                    mb="$2"
                    backgroundColor="$gray100"
                    p={4}
                    borderRadius="$full"
                    alignItems="center"
                    justifyContent="center"
                    alignSelf="center"
                    width="$full"
                >
                    <TabButton
                        title="Sobre"
                        isActive={activeTab === "sobre"}
                        onPress={() => setActiveTab("sobre")}
                    />
                    <TabButton
                        title="Doadores"
                        isActive={activeTab === "doadores"}
                        onPress={() => setActiveTab("doadores")}
                    />
                </HStack>

                {activeTab === "sobre" ? <AboutSection /> : <DoadoresSection />}
            </ScrollView>

            <Button
                onPress={() => {
                    router.push("/(wallet)/(donation)/institution");
                }}
                mb="$4"
                mt="$1"
                disabled={false}
            >
                <ButtonText
                    textAlign="center"
                    fontFamily="$heading"
                    size="xl"
                    lineHeight={24}
                >
                    Fazer uma doação
                </ButtonText>
            </Button>
        </BaseContainer>
    );
}
