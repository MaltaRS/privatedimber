import {
    HStack,
    Text,
    Pressable,
    ScrollView,
    Box,
} from "@/gluestackComponents";

type CategoryTabsProps = {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    type: "darkBlue" | "lightBlue";
};

export const CategoryTabs = ({
    categories,
    selectedCategory,
    onSelectCategory,
    type,
}: CategoryTabsProps) => {
    return (
        <Box mt="$1">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack gap="$4">
                    {categories.map((category, i) => (
                        <Pressable
                            key={i}
                            bgColor={
                                category === selectedCategory
                                    ? type === "darkBlue"
                                        ? "$primaryDefault"
                                        : "#00A8FF25"
                                    : "#F3F4F6"
                            }
                            rounded="$full"
                            px="$5"
                            py="$2"
                            onPress={() => onSelectCategory(category)}
                        >
                            <Text
                                color={
                                    category === selectedCategory
                                        ? type === "darkBlue"
                                            ? "$white"
                                            : "$primaryDefault"
                                        : "$black"
                                }
                                size="sm"
                            >
                                {category}
                            </Text>
                        </Pressable>
                    ))}
                </HStack>
            </ScrollView>
        </Box>
    );
};
