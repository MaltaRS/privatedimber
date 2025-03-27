import { Fragment } from "react";

import { TouchableOpacity } from "react-native";

import {
    HStack,
    VStack,
    Text,
    Box,
    Menu,
    Pressable,
} from "@/gluestackComponents";

import Feather from "@expo/vector-icons/Feather";

import { Trash2, Check } from "lucide-react-native";

import { Colors } from "@/constants/Colors";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removePaymentMethod } from "@/connection/wallet/WalletConnection";

import { toast } from "burnt";

import AddCard from "@/assets/icons/appIcons/newCard.svg";
import Mastercard from "@/assets/icons/cardBrands/mastercard.svg";
import Visa from "@/assets/icons/cardBrands/visa.svg";

type CardProps = {
    name?: string;
    description?: string;
    cardBrand?: string;
    newCard?: boolean;
    onPress?: () => void;
    isDefault?: boolean;
    id?: number;
    isSelected?: boolean;
    showMenu?: boolean;
};

export const Card = ({
    name,
    description,
    cardBrand,
    newCard,
    onPress,
    isDefault,
    id,
    isSelected,
    showMenu = true,
}: CardProps) => {
    const queryClient = useQueryClient();

    const { mutate: removeCard } = useMutation({
        mutationFn: removePaymentMethod,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
            toast({
                title: "Cartão removido com sucesso",
                haptic: "success",
                duration: 3000,
                preset: "done",
                from: "top",
            });
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: "Erro ao remover cartão",
                haptic: "error",
                duration: 3000,
                preset: "error",
                from: "top",
            });
        },
    });

    const handleRemoveCard = () => {
        if (id) {
            removeCard({ paymentMethodId: id });
        }
    };

    const Logos = {
        mastercard: <Mastercard width={34} height={34} />,
        visa: <Visa width={34} height={34} />,
    };

    const Container = newCard ? TouchableOpacity : Pressable;

    return (
        <Container onPress={onPress}>
            <HStack
                borderWidth={1}
                borderColor={isSelected ? "$primaryDefault" : "$gray300"}
                padding={15}
                borderRadius={10}
                alignItems="center"
                width="100%"
                height={85}
                justifyContent="space-between"
                marginTop={20}
                backgroundColor="$white"
                flexDirection="row"
            >
                <HStack justifyContent="center" alignItems="center" gap="$4">
                    <Box px="$1" justifyContent="center" alignItems="center">
                        {newCard ? (
                            <AddCard
                                width={24}
                                height={24}
                                style={{
                                    marginLeft: 6,
                                    marginRight: 6,
                                }}
                            />
                        ) : (
                            cardBrand && Logos[cardBrand as keyof typeof Logos]
                        )}
                    </Box>

                    <VStack>
                        {newCard ? (
                            <Text fontSize={18} color="$gray800">
                                Adicionar novo cartão
                            </Text>
                        ) : (
                            <Fragment>
                                <HStack alignItems="center" gap="$2">
                                    <Text bold fontSize={20}>
                                        {name}
                                    </Text>
                                    {isDefault && !isSelected && (
                                        <Text fontSize={14} color="$green500">
                                            Padrão
                                        </Text>
                                    )}
                                </HStack>

                                <Text fontSize={16} color="$gray600">
                                    {description}
                                </Text>
                            </Fragment>
                        )}
                    </VStack>
                </HStack>

                {!newCard &&
                    (isSelected ? (
                        <Check size={24} color={Colors.primaryDefault} />
                    ) : showMenu ? (
                        <Menu
                            placement="bottom right"
                            bgColor="$white"
                            rounded={12}
                            py="$0"
                            trigger={({ ...triggerProps }) => {
                                return (
                                    <Pressable {...triggerProps}>
                                        <Box
                                            p="$2"
                                            bgColor="$white"
                                            rounded="$full"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Feather
                                                name="more-vertical"
                                                size={24}
                                                color="black"
                                            />
                                        </Box>
                                    </Pressable>
                                );
                            }}
                        >
                            <Menu.Item
                                onPress={handleRemoveCard}
                                justifyContent="flex-start"
                                alignItems="center"
                                py="$3"
                                textValue="Remover Cartão"
                            >
                                <Box rounded="$full" bgColor="$gray200" p="$3">
                                    <Trash2 size={20} color={Colors.gray700} />
                                </Box>
                                <Text
                                    ml="$3"
                                    color="$gray700"
                                    fontWeight="$medium"
                                >
                                    Remover Cartão
                                </Text>
                            </Menu.Item>
                        </Menu>
                    ) : null)}
            </HStack>
        </Container>
    );
};
