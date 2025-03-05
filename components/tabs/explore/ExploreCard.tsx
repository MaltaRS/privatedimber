import { Colors } from "@/constants/Colors";

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
    Card,
    HStack,
    Text,
    VStack,
    Pressable,
} from "@/gluestackComponents";

import { ArrowUp, Heart } from "lucide-react-native";

export type ExploreCardProps = {
    id: string;
    icon: string;
    name: string;
    tags: string[];
    price: string;
    isChecked: boolean;
    liked: boolean;
    onLike: (id: string) => void;
    onPress: () => void;
};

const CardAvatar = ({
    name,
    imageLink,
    liked,
    onLike,
}: {
    name: string;
    imageLink: string;
    liked: boolean;
    onLike: () => void;
}) => (
  <Avatar 
      w="$full"
      height={180}
      position="relative"
      style={{
          borderTopLeftRadius:16,  // Arredondado apenas no topo esquerdo
          borderTopRightRadius:16, // Arredondado apenas no topo direito
          borderBottomLeftRadius: 0, // Mantém a parte inferior reta
          borderBottomRightRadius: 0, // Mantém a parte inferior reta
      }}
  >
      <AvatarFallbackText fontSize={60}>{name}</AvatarFallbackText>
      <AvatarImage 
                style={{
                     borderTopLeftRadius:16,  // Arredondado apenas no topo esquerdo
                     borderTopRightRadius:16, // Arredondado apenas no topo direito
                     borderBottomLeftRadius: 0, // Mantém a parte inferior reta
                     borderBottomRightRadius: 0, // Mantém a parte inferior reta
                 }}
            source={{
                uri: imageLink,
            }}
            alt={`Foto de perfil de ${name}`}
        />
        <ImageLikeButton liked={liked} onLike={onLike} />
    </Avatar>
);

const CardTags = ({ tags }: { tags: string[] }) => (
    <Text size="sm" flexWrap="wrap" color="$gray800">
        {tags
            .filter((_, i) => i <= 1)
            .map((tag, index) => tag + (index === 1 ? "" : ", "))}
    </Text>
);

const CardPrice = ({ price }: { price: string }) => (
    <HStack gap="$5" mb="$1"  mt="$3" alignItems="center">
        <Text
            size="lg"
            fontFamily="$novaTitle"
            color="#111827"
            lineHeight={24}
        >
            {price}
        </Text>
        <HStack
            p={1}
            px="$1"
            bgColor="$gray100"
            rounded="$md"
            alignItems="center"
            gap="$0"
        >
            <ArrowUp size={17} color={Colors.gray700} />
            <Text  size="sm" color="$gray700" fontFamily="$title"  alignTex="center">
                25%
            </Text>
        </HStack>
    </HStack>
);

const ImageLikeButton = ({
    liked,
    onLike,
}: {
    liked: boolean;
    onLike: () => void;
}) => (
    <Pressable
        rounded="$full"
        bgColor="#F8F8F950"
        py="$2"
        px="$2"
        justifyContent="center"
        alignItems="center"
        onPress={onLike}
        position="absolute"
        bottom={8}
        right={8}
    >
        <Heart
            size={25}
            color={liked ? "#FF6378" : "#fff"}
            fill={liked ? "#FF6378" : "none"}
        />
    </Pressable>
);

export const ExploreCard = ({
    id,
    icon,
    name,
    isChecked,
    tags,
    price,
    liked,
    onLike,
    onPress,
}: ExploreCardProps) => {
    return (
<Pressable onPress={onPress} w="48.5%" pb="14">
    <Card 
        variant="ghost" 
        p="$0" 
        
        style={{
            backgroundColor: "#fff",
            borderRadius: 12, 
            borderWidth: 0.9, 
            borderColor: "#E5E7EB", 
            }}
        
    >
        <VStack alignItems="center">
            <CardAvatar
                name={name}
                imageLink={icon}
                liked={liked}
                onLike={() => onLike(id)}
            />
            <VStack gap="$0" p="$2"  w="$full">
                <HStack alignItems="center" gap="$1" justifyContent="flex-start">
                    <Text size="lg" color="#15161E" fontFamily="$novaTitle" lineHeight={24}> 
                        {name}
                    </Text>
                </HStack>
                <CardTags tags={["Atleta", "Investidor"]} />
                <CardPrice price={price}/>
            </VStack>
        </VStack>
    </Card>
</Pressable>


    );
};
