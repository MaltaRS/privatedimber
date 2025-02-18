import {
    HStack,
    Text,
    Pressable,
    ScrollView,
    Box,
} from "@/gluestackComponents";

export type Category = {
    name: string;
    filterName: string;
};

type CategoryTabsProps = {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (filterName: string) => void;
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
                    {categories.map((category, i) => {
                        const isSelectedCategory =
                            category.filterName === selectedCategory;

                        return (
                            <Pressable
                                key={i}
                                bgColor={
                                    isSelectedCategory
                                        ? type === "darkBlue"
                                            ? "$primaryDefault"
                                            : "#00A8FF25"
                                        : "$gray200"
                                }
                                rounded="$full"
                                px="$5"
                                py="$2"
                                onPress={() =>
                                    onSelectCategory(category.filterName)
                                }
                            >
                                <Text
                                    color={
                                        isSelectedCategory
                                            ? type === "darkBlue"
                                                ? "$white"
                                                : "$primaryDefault"
                                            : "$black"
                                    }
                                    size="sm"
                                >
                                    {category.name}
                                </Text>
                            </Pressable>
                        );
                    })}
                </HStack>
            </ScrollView>
        </Box>
    );
};
