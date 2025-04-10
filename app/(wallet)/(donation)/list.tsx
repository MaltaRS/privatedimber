import { useState } from "react";

import { View, TouchableOpacity, ScrollView } from "react-native";

import { useRouter } from "expo-router";

import {
    Text,
    VStack,
    HStack,
    Image,
    InputSlot,
    Input,
    InputField,
    InputIcon,
    Divider,
} from "@/gluestackComponents";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Search, SlidersHorizontal, X } from "lucide-react-native";
import { CategoryTabs } from "@/components/tabs/explore/CategoryTabs";

export default function ListInstituition() {
    const router = useRouter();

    const [search, setSearch] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("Geral");

    const categories = [
        { name: "Geral", filterName: "Geral" },
        { name: "Esporte", filterName: "Esporte" },
        { name: "Educação", filterName: "Educação" },
        { name: "Saúde", filterName: "Saúde" },
        { name: "Cultura", filterName: "Cultura" },
    ];

    const logoInstituto =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5z03a91O5qAqycFrTXVjaBcpy1rOjeBERaw&s";

    const ItemListProfile = () => {
        return (
            <View>
                <HStack width="100%" alignItems="center" gap="$2">
                    <Image
                        source={{ uri: logoInstituto }}
                        alt="image"
                        style={{ height: 80, width: 80, borderRadius: 8 }}
                    />

                    <TouchableOpacity
                        onPress={() =>
                            router.push("/(wallet)/(donation)/profile")
                        }
                        style={{ flex: 1 }}
                    >
                        <VStack
                            gap="$1"
                            flex={1}
                            justifyContent="center"
                            height={80}
                        >
                            <HStack alignItems="center">
                                <Text bold fontSize={19}>
                                    Instituto Neymar
                                </Text>
                                {true && (
                                    <MaterialIcons
                                        style={{
                                            paddingLeft: 6,
                                            marginTop: 2,
                                        }}
                                        name="verified"
                                        size={16}
                                        color="#00A8FF"
                                    />
                                )}
                            </HStack>
                            <Text fontSize={15} color="$gray900">
                                Esporte, Criancas - Santos - SP
                            </Text>
                            <Divider mt="$2" bgColor="$gray300" />
                        </VStack>
                    </TouchableOpacity>
                </HStack>
            </View>
        );
    };

    return (
        <BaseContainer>
            <HeaderContainer title="Doação" />

            <VStack space="md" width="100%" pt="$4">
                <Input
                    w="$full"
                    variant="rounded"
                    bgColor="$gray100"
                    size="xl"
                    borderWidth={0}
                    alignItems="center"
                >
                    <InputSlot bgColor="$gray100" pl="$5" pt="$1">
                        <InputIcon>
                            <Search size={20} color="#6B7280" />
                        </InputIcon>
                    </InputSlot>
                    <InputField
                        pl="$3"
                        bgColor="$gray100"
                        placeholder="Pesquisar"
                        placeholderTextColor="#6B7280"
                        size="lg"
                        value={search}
                        onChangeText={setSearch}
                    />
                    <InputSlot
                        bgColor="$gray100"
                        pr="$3"
                        pt="$1"
                        onPress={() => {
                            // setFilterOpen(true);
                        }}
                    >
                        <InputIcon>
                            <SlidersHorizontal size={20} color="#62656b" />
                        </InputIcon>
                    </InputSlot>
                    {search.trim() !== "" && (
                        <InputSlot
                            bgColor="#E5E7EB"
                            pr="$3"
                            pt="$1"
                            onPress={() => {
                                setSearch("");
                            }}
                        >
                            <InputIcon>
                                <X size={20} color="#62656b" />
                            </InputIcon>
                        </InputSlot>
                    )}
                </Input>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <HStack space="sm">
                        <CategoryTabs
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={(category) =>
                                setSelectedCategory(category)
                            }
                            type="lightBlue"
                        />
                    </HStack>
                </ScrollView>

                <VStack space="md" mt="$2">
                    <ItemListProfile />
                    <ItemListProfile />
                    <ItemListProfile />
                    <ItemListProfile />
                    <ItemListProfile />
                    <ItemListProfile />
                </VStack>
            </VStack>
        </BaseContainer>
    );
}
