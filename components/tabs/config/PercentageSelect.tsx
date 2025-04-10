import { useState } from "react";
import {
    View,
    TouchableOpacity,
    Modal,
    FlatList,
    Pressable,
} from "react-native";
import { Text, Heading, VStack, HStack, Box } from "@/gluestackComponents";
import AntDesign from "@expo/vector-icons/AntDesign";

type PercentageSelectProps = {
    title: string;
    description: string;
    placeholder: string;
    value: string;
    onChangeText: (value: string) => void;
};

export const PercentageSelect = ({
    title,
    description,
    placeholder,
    value,
    onChangeText,
}: PercentageSelectProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const percentageOptions = Array.from({ length: 21 }, (_, i) => i * 5);

    const handleSelect = (percentage: number) => {
        onChangeText(percentage.toString());
        setModalVisible(false);
    };

    return (
        <View>
            <VStack mt="$2">
                <Heading>{title}</Heading>
                <Text fontSize={15} color="#374151">
                    {description}
                </Text>
            </VStack>

            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "#999",
                    paddingVertical: 10,
                    borderRadius: 10,
                    marginTop: 10,
                    height: 58,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                }}
            >
                <Text fontSize={19} color={value ? "#000" : "#999"}>
                    {value ? `${value}%` : placeholder}
                </Text>
                <AntDesign name="down" size={17} color="black" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                    onPress={() => setModalVisible(false)}
                >
                    <Pressable
                        style={{
                            backgroundColor: "white",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: 20,
                            maxHeight: "70%",
                        }}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <HStack justifyContent="space-between" mb={15}>
                            <Text fontSize={18} fontWeight="bold">
                                Selecione a porcentagem
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                            >
                                <AntDesign
                                    name="close"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </HStack>

                        <FlatList
                            data={percentageOptions}
                            keyExtractor={(item) => item.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleSelect(item)}
                                    style={{
                                        paddingVertical: 15,
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#eee",
                                    }}
                                >
                                    <Text
                                        fontSize={16}
                                        color={
                                            value === item.toString()
                                                ? "#007AFF"
                                                : "#000"
                                        }
                                        fontWeight={
                                            value === item.toString()
                                                ? "bold"
                                                : "normal"
                                        }
                                    >
                                        {item}%
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};
