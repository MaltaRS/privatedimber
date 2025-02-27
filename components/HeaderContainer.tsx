import { TouchableOpacity } from "react-native";

import { 
    HStack,
    Text,
    VStack,
 } from "@/gluestackComponents";

 import { useRouter } from "expo-router";

import AntDesign from '@expo/vector-icons/AntDesign';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function HeaderContainer(title) {
  const router = useRouter();


  return (
    <VStack style={{width: '100%', marginTop: 20}}  >
        <HStack style={{width: '100%'}} alignItems="center" justifyContent="space-between"  >

          <TouchableOpacity 
            onPress={() => router.back()}
            style={{width: 30, height: 30, borderRadius: 100, backgroundColor: '#f9f9f9'}}  >
                <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>

          <Text color="black" bold fontSize={17}>{title.name}</Text>
          <Text color="#00A8FF" bold fontSize={17}>{title.namebuttontab}</Text>
        </HStack>

    </VStack>

  );
}