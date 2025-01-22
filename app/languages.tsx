import { View, ScrollView, } from 'react-native';

import { 
    Text,
    VStack,
    HStack,
    Image,
    Heading
 } from "@/gluestackComponents";


export default function IdiomScreen() {

    const OtherInfoProfile = (notific) => {
        return(
        <View style={{ marginTop: 8, width: '98%', borderRadius: 10}} > 

                <HStack
                    style={{ alignItems: 'center',  justifyContent: 'space-between', marginTop: 20 
                    }}  className="bg-white" >
                        
                      <VStack>
                         <Text size="xl"  >{notific.name}</Text>         
                      </VStack>
                </HStack>
          
          </View>
        );
    }


  return (
      <ScrollView style={{flex: 1, backgroundColor: '#FFF', }} >

      <View>
        <VStack className="ml-4 mr-4"  >
           
            <Heading size="lg" className="mb-1 mt-5" >
              Idioma de Interface
            </Heading>

            <OtherInfoProfile name="Portugues(Brasil)" />
            <OtherInfoProfile name="English" />
            <OtherInfoProfile name="Arabic" />
            <OtherInfoProfile name="Belarusian" />
            <OtherInfoProfile name="Catalan" />
            <OtherInfoProfile name="Coroatian" />
            <OtherInfoProfile name="Czech" />
            <OtherInfoProfile name="Dutch" />
            <OtherInfoProfile name="Finnish" />
            <OtherInfoProfile name="French" />
            <OtherInfoProfile name="German" />

       
        </VStack>
      </View>
    </ScrollView>


  );
}

