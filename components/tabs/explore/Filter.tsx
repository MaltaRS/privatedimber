import { useState } from "react";

import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetItem,
    VStack,
    ButtonText,
    Text,
    Box,
    Accordion,
    AccordionContent,
    AccordionContentText,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionTitleText,
    AccordionTrigger,
    HStack,
    ScrollView,
    Pressable,
} from "@/gluestackComponents";

import { Button } from "@/components/ui/Button";

import { ChevronDownIcon, ChevronUpIcon, X } from "lucide-react-native";

import { Colors } from "@/constants/Colors";

import Checkbox from "expo-checkbox";

type FilterProps = {
    isOpen: boolean;
    onClose: () => void;
};

type Filter = {
    title: string;
    items: {
        title: string;
        active: boolean;
    }[];
};

export const Filter = ({ isOpen, onClose }: FilterProps) => {
    const [Filters, setFilters] = useState<Filter[]>([
        {
            title: "Popularidade",
            items: [
                {
                    title: "Alta popularidade",
                    active: false,
                },
                {
                    title: "Engajamento alto",
                    active: false,
                },
                {
                    title: "Mais recentes",
                    active: false,
                },
            ],
        },
        {
            title: "Disponibilidade",
            items: [
                {
                    title: "Resposta rápida",
                    active: false,
                },
                {
                    title: "Disponível agora",
                    active: false,
                },
                {
                    title: "Respostas ocasionalmente",
                    active: false,
                },
            ],
        },
        {
            title: "Faixa de preço",
            items: [
                {
                    title: "Até R$ 100",
                    active: false,
                },
                {
                    title: "R$ 100 - R$ 1000",
                    active: false,
                },
                {
                    title: "Acima de R$ 10000",
                    active: false,
                },
            ],
        },
        {
            title: "Ordenar por",
            items: [
                {
                    title: "Relevância",
                    active: false,
                },
                {
                    title: "Preço",
                    active: false,
                },
                {
                    title: "Popularidade",
                    active: false,
                },
                {
                    title: "Mais recentes",
                    active: false,
                },
                {
                    title: "Mais conectados",
                    active: false,
                },
            ],
        },
        {
            title: "Categorias",
            items: [],
        },
    ]);

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
            <ActionsheetBackdrop bgColor="#000" />
            <ActionsheetContent zIndex={999} bgColor="white">
                <ActionsheetItem>
                    <VStack pt="$2" gap="$2" w="$full" position="relative">
                        <Pressable
                            position="absolute"
                            top={1}
                            right={1}
                            rounded="$full"
                            bgColor="$gray100"
                            p="$2"
                            zIndex={999}
                            onPress={onClose}
                        >
                            <X size={24} color={Colors.gray500} />
                        </Pressable>
                        <Text
                            size="2xl"
                            fontFamily="$heading"
                            color="$black"
                            pt="$16"
                            py="$2"
                            lineHeight={20}
                        >
                            Filtros
                        </Text>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Accordion
                                width="$full"
                                size="md"
                                variant="unfilled"
                                type="single"
                                isCollapsible={true}
                            >
                                {Filters.map((filter, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={filter.title}
                                        w="$full"
                                    >
                                        <AccordionHeader>
                                            <AccordionTrigger w="$full">
                                                {({ isExpanded }) => (
                                                    <HStack
                                                        alignItems="center"
                                                        justifyContent="space-between"
                                                        flex={1}
                                                        ml="-$4"
                                                    >
                                                        <AccordionTitleText w="$full">
                                                            {filter.title}
                                                        </AccordionTitleText>
                                                        {isExpanded ? (
                                                            <AccordionIcon
                                                                mr="-$2"
                                                                as={
                                                                    ChevronUpIcon
                                                                }
                                                            />
                                                        ) : (
                                                            <AccordionIcon
                                                                mr="-$2"
                                                                as={
                                                                    ChevronDownIcon
                                                                }
                                                            />
                                                        )}
                                                    </HStack>
                                                )}
                                            </AccordionTrigger>
                                        </AccordionHeader>
                                        <AccordionContent w="$full" gap="$8">
                                            {filter.items.map(
                                                (item, itemIndex) => (
                                                    <HStack
                                                        ml="-$1"
                                                        w="$full"
                                                        key={itemIndex}
                                                        justifyContent="space-between"
                                                    >
                                                        <AccordionContentText
                                                            fontFamily="$novaBody"
                                                            fontSize="$lg"
                                                            lineHeight={20}
                                                        >
                                                            {item.title}
                                                        </AccordionContentText>
                                                        <Checkbox
                                                            value={item.active}
                                                            color={
                                                                item.active
                                                                    ? Colors.primaryDefault
                                                                    : Colors.gray500
                                                            }
                                                            onValueChange={(
                                                                value,
                                                            ) =>
                                                                setFilters(
                                                                    Filters.map(
                                                                        (
                                                                            filter,
                                                                        ) => ({
                                                                            ...filter,
                                                                            items: filter.items.map(
                                                                                (
                                                                                    i,
                                                                                ) => ({
                                                                                    ...i,
                                                                                    active:
                                                                                        i.title ===
                                                                                        item.title
                                                                                            ? !i.active
                                                                                            : i.active,
                                                                                }),
                                                                            ),
                                                                        }),
                                                                    ),
                                                                )
                                                            }
                                                        />
                                                    </HStack>
                                                ),
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </ScrollView>
                        <Button mt="$4">
                            <ButtonText
                                textAlign="center"
                                fontFamily="$heading"
                                size="lg"
                                fontWeight="$bold"
                            >
                                Aplicar filtros
                            </ButtonText>
                        </Button>
                        <Text
                            color="$primaryDefault"
                            size="md"
                            textAlign="center"
                            fontWeight="$bold"
                            mt="$2"
                            onPress={onClose}
                        >
                            Limpar filtros
                        </Text>
                    </VStack>
                </ActionsheetItem>
            </ActionsheetContent>
        </Actionsheet>
    );
};
