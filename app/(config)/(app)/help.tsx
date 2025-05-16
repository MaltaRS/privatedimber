import { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {
  VStack,
  Input,
  InputSlot,
  InputField,
  InputIcon,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
  Divider,
  Text,
  HStack,
  Pressable,
} from "@/gluestackComponents";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react-native";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";

const helpData = [
  {
    id: "1",
    click: 124,
    title: "help.changePassword",
    body: "help.changePasswordDesc",
    category: "help.account",
    image: "https://s.yimg.com/ny/api/res/1.2/5.rygDVHQQmSSWx1jOHa3Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTYyNjtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2023-05/144e52f0-ef21-11ed-afa7-a50c1d2b8867",
  },
  {
      id: "19",
      click: 18,
      title: "como jogar bola",
      body: "joga descalço",
      category: "bola",
      image: "https://s.yimg.com/ny/api/res/1.2/5.rygDVHQQmSSWx1jOHa3Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTYyNjtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2023-05/144e52f0-ef21-11ed-afa7-a50c1d2b8867",
    },
  {
    id: "2",
    click: 120,
    title: "help.deleteAccount",
    body: "help.deleteAccountDesc",
    category: "help.account",
    image: "https://via.placeholder.com/600x200.png?text=Excluir+Conta",
  },
  {
    id: "3",
    click: 11,
    title: "help.useOffline",
    body: "help.useOfflineDesc",
    category: "help.function",
    image: "https://via.placeholder.com/600x200.png?text=Offline",
  },
  {
    id: "4",
    click: 10,
    title: "help.sendPaidMessage",
    body: "help.sendPaidMessageDesc",
    category: "help.messages",
    image: "https://via.placeholder.com/600x200.png?text=Mensagens+Pagas",
  },
  {
    id: "5",
    click: 144,
    title: "help.changeLanguage",
    body: "help.changeLanguageDesc",
    category: "help.setup",
    image: "https://via.placeholder.com/600x200.png?text=Idioma",
  },
];

export default function HelpScreen() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(helpData);

  const [clickCounts, setClickCounts] = useState<{ [key: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    helpData.forEach((item) => {
      initial[item.id] = item.click;
    });
    return initial;
  });

  const rawCategories = Array.from(new Set(helpData.map((item) => item.category)));

  const categories = [
    { label: t("help.all"), value: "All" },
    ...rawCategories.map((cat) => ({
      label: t(cat),
      value: cat,
    })),
  ];

  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = helpData.filter((item) => {
      const matchesSearch = t(item.title).toLowerCase().includes(lowerSearch);
      const matchesCategory = category === "All" || item.category === category;
      return matchesSearch && matchesCategory;
    });

    const sorted = filtered.sort((a, b) => {
      const clicksA = clickCounts[a.id] ?? a.click ?? 0;
      const clicksB = clickCounts[b.id] ?? b.click ?? 0;
      return clicksB - clicksA;
    });

    setFilteredItems(sorted);
  }, [search, category, t, clickCounts]);

  const handleAccordionClick = (id: string) => {
    setClickCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    console.log(`ID ${id} clicado ${clickCounts[id] ? clickCounts[id] + 1 : 1} vezes`);
  };

  return (
    <BaseContainer>
      <HeaderContainer title={t("help.title")} />

      <VStack pt="$4" gap="$4">
        <Input
          w="$full"
          variant="rounded"
          bgColor="$gray100"
          size="xl"
          borderWidth={0}
          alignItems="center"
        >
          <InputSlot pl="$5" pt="$1">
            <InputIcon>
              <Search size={20} color="#6B7280" />
            </InputIcon>
          </InputSlot>

          <InputField
            pl="$3"
            bgColor="$gray100"
            placeholder={t("help.search")}
            placeholderTextColor="#6B7280"
            size="lg"
            value={search}
            onChangeText={setSearch}
          />

          {search.trim() !== "" && (
            <InputSlot pr="$3" pt="$1" onPress={() => setSearch("")}>
              <InputIcon>
                <X size={20} color="#62656b" />
              </InputIcon>
            </InputSlot>
          )}
        </Input>

        <HStack flexWrap="wrap" gap="$2">
          {categories.map((item) => (
            <Pressable
              key={item.value}
              onPress={() => setCategory(item.value)}
              bg={category === item.value ? "#00A8FF" : "#E5E7EB"}
              px="$3"
              py="$1"
              borderRadius="$full"
            >
              <Text color={category === item.value ? "#fff" : "#111"}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </HStack>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Accordion type="single" isCollapsible className="w-full">
            {filteredItems.map((item, index) => {
              const isLast = index === filteredItems.length - 1;
              return (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  style={{ backgroundColor: "#fff" }}
                >
                  <AccordionHeader>
                    <AccordionTrigger onPress={() => handleAccordionClick(item.id)}>
                      {({ isExpanded }) => (
                        <HStack justifyContent="space-between" alignItems="center" width="100%">
                          <AccordionTitleText fontSize={16} fontFamily="$heading">
                            {t(item.title)}
                          </AccordionTitleText>
                          {isExpanded ? (
                            <ChevronUp size={18} color="#6B7280" />
                          ) : (
                            <ChevronDown size={18} color="#6B7280" />
                          )}
                        </HStack>
                      )}
                    </AccordionTrigger>
                  </AccordionHeader>

                  <AccordionContent>
                    <VStack space="md" mt="$2">
                      <AccordionContentText fontSize={15} color="$gray800">
                        {t(item.body)}
                      </AccordionContentText>

                      {item.image && (
                        <Image
                          source={{ uri: item.image }}
                          alt="Imagem ilustrativa"
                          style={{
                            width: "100%",
                            height: 200,
                            borderRadius: 8,
                            marginTop: 8,
                          }}
                          resizeMode="cover"
                        />
                      )}
                    </VStack>
                  </AccordionContent>

                  {!isLast && <Divider bgColor="$gray200" />}
                </AccordionItem>
              );
            })}
          </Accordion>
        </ScrollView>
      </VStack>
    </BaseContainer>
  );
}
