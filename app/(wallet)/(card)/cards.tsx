import { Fragment } from "react";

import { useRouter } from "expo-router";

import { ScrollView, VStack, HStack } from "@/gluestackComponents";

import {
    getPaymentMethods,
    PaymentMethod,
} from "@/connection/wallet/WalletConnection";

import { useQuery } from "@tanstack/react-query";

import { SkeletonBox } from "@/components/utils/SkeletonBox";
import { BaseContainer } from "@/components/BaseContainer";
import HeaderContainer from "@/components/HeaderContainer";
import { Card } from "@/components/wallet/Card";

export default function MyCartsScreen() {
    const router = useRouter();

    const { data: paymentMethodsData, isLoading } = useQuery({
        queryKey: ["paymentMethods"],
        queryFn: getPaymentMethods,
    });

    return (
        <BaseContainer>
            <VStack gap="$4">
                <HeaderContainer title="Meus Cartões" />

                <ScrollView showsVerticalScrollIndicator={false}>
                    {isLoading ? (
                        <VStack space="md">
                            {[1, 2, 3].map((index) => (
                                <Fragment key={index}>
                                    <HStack
                                        borderWidth={1}
                                        borderColor="#999"
                                        padding={15}
                                        borderRadius={10}
                                        alignItems="center"
                                        width="100%"
                                        height={85}
                                        justifyContent="space-between"
                                        marginTop={20}
                                        backgroundColor="#fff"
                                    >
                                        <HStack alignItems="center" gap="$4">
                                            <SkeletonBox
                                                width={34}
                                                height={34}
                                                borderRadius="$full"
                                            />
                                            <VStack gap="$2">
                                                <SkeletonBox
                                                    width={120}
                                                    height={20}
                                                />
                                                <SkeletonBox
                                                    width={180}
                                                    height={16}
                                                />
                                            </VStack>
                                        </HStack>
                                        <SkeletonBox width={24} height={24} />
                                    </HStack>
                                </Fragment>
                            ))}
                        </VStack>
                    ) : (
                        <Fragment>
                            {paymentMethodsData?.paymentMethods.map(
                                (paymentMethod: PaymentMethod) => (
                                    <Card
                                        key={paymentMethod.id}
                                        name={paymentMethod.nickname}
                                        description={`${paymentMethod.cardBrand} ${paymentMethod.type === "CREDIT_CARD" ? "crédito" : "débito"} ••••${paymentMethod.last4}`}
                                        cardBrand={paymentMethod.cardBrand.toLowerCase()}
                                        isDefault={paymentMethod.isDefault}
                                        id={paymentMethod.id}
                                    />
                                ),
                            )}

                            <Card
                                newCard
                                onPress={() =>
                                    router.push("/(wallet)/(card)/newcard")
                                }
                            />
                        </Fragment>
                    )}
                </ScrollView>
            </VStack>
        </BaseContainer>
    );
}
