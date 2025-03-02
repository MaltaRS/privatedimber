
import { 
    Text,
    VStack
 } from "@/gluestackComponents";

 import { StatusBar } from 'expo-status-bar';
 import HeaderContainer from '../components/HeaderContainer'

import { BaseContainer } from "@/components/BaseContainer";

export default function EditMyProfileScreen() {

  return (
      <BaseContainer>
      <VStack gap="$4">
        <HeaderContainer title="Social" />
         </VStack>
      <StatusBar style="auto" />
    </BaseContainer>
  );
}