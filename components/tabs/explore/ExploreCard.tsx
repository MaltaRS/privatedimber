import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Card,
  HStack,
  Text,
  VStack,
  Pressable,
  Box,
  Image
} from "@/gluestackComponents";

import { Star } from "lucide-react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DimberLogo from "@/assets/icons/dimberLogo.svg";
import DimberLogo2 from "@/assets/icons/icon.png";


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
}: {
  name: string;
  imageLink: string;
}) => (
  <Avatar width={86} height={86} mt="$1" mb="$2" bg="$gray200" position="relative">
    <AvatarFallbackText size="2xl">{name}</AvatarFallbackText>
    <AvatarImage
      width={86} height={86}
      source={imageLink ? { uri: imageLink } : undefined}
      alt={'Foto de perfil de ${name}'}
    />
  </Avatar>
);

const CardTags = ({ tags }: { tags: string[] }) => (
  <Text
    size="xs"
    color="$gray600"
    textAlign="center"
    numberOfLines={1}
    
  >
    {tags.length > 0
      ? tags.slice(0, 2).join(", ")
      : "Sem categorias"}
  </Text>
);

const CardPrice = ({ price }: { price: string }) => (
  <Box
    bg="#00A8FF"
    borderRadius="$lg"
    
    py="$2"
    mt="$2"
    w="$full"
  >
    <HStack alignItems="center" justifyContent="space-between" paddingLeft={10} paddingRight={10} >
      <Image
        source={DimberLogo2}
        style={{ width: 20, height: 20}}
        />   
        <HStack>
          <Text fontSize={12} fontFamily="$heading" color="#FFF" marginRight={5} >
            R$          
         </Text>
          <Text fontSize={12} fontFamily="$heading" color="#FFF">
            {price}
          </Text>
        </HStack> 
    </HStack>
  </Box>
);

const ImageLikeButton = ({
  liked,
  onLike,
}: {
  liked: boolean;
  onLike: () => void;
}) => (
<Pressable
  onPress={onLike}
  position="absolute"
  top={14}
  right={26}
  zIndex={10}
  rounded="$full"
  p="$1.5"
  bgColor="rgba(255, 255, 255, 0.65)" 
  shadow="2"
>

    <Star
      size={15}
      color={liked ? "#FDD015" : "#D1D5DB"}
      fill={liked ? "#FDD015" : "none"}
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
    <Pressable onPress={onPress} w="48.5%" mb="$3">
      <Card
        variant="ghost"
        p="$2"
        bgColor="#FFF"
        borderColor="#E5E7EB"
        borderWidth={1}
        rounded="$lg"
        shadow="4"
        overflow="hidden"
        position="relative"
      >
        <VStack alignItems="center" px="$2">
          <CardAvatar name={name} imageLink={icon} />
          <ImageLikeButton liked={liked} onLike={() => onLike(id)} />
          <VStack alignItems="center" w="$full" px="$2">
            <HStack alignItems="center" justifyContent="center" gap="$1">
              <Text
                size="sm"
                fontFamily="$Inter_600SemiBold"
                color="#000"
                numberOfLines={1}
                maxWidth={140}
              >
                {name}
              </Text>
              {isChecked && (
                <MaterialIcons name="verified" size={16} color="#00A8FF" />
              )}
            </HStack>
            <CardTags tags={tags} />
          </VStack>
        </VStack>

          
           <CardPrice price={price} />
           

      </Card>
    </Pressable>
  );
};