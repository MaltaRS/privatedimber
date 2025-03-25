import { VStack, Text, Spinner } from "@/gluestackComponents";

interface LoadingStepProps {
    message: string;
}

export function LoadingStep({ message }: LoadingStepProps) {
    return (
        <VStack
            flex={1}
            alignItems="center"
            justifyContent="center"
            bgColor="$white"
            gap="$4"
        >
            <Spinner size="large" />
            <Text fontSize="$lg" color="$gray900" textAlign="center">
                {message}
            </Text>
        </VStack>
    );
}
