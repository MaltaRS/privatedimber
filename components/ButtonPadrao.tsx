import { TouchableOpacity } from "react-native";

import { 
    Text,
    VStack,
 } from "@/gluestackComponents";

import { useRouter } from "expo-router";


export default function ButtonPadrao(title) {

  const router = useRouter();

  return (

    <VStack 
    alignItems="center" 
    justifyContent="center" 
    marginTop={10} 
    style={{ position: 'absolute', bottom: 20,
        left: 0, right: 0, alignItems: 'center' }}>

        <TouchableOpacity 
          onPress={() => router.push(title.nav)}
          style={{
              width: 358,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00A8FF',
              borderRadius: 40,
     
          }} 
        >

          <Text color="white" > {title.name} </Text>

        </TouchableOpacity>
    </VStack>

  );
}
