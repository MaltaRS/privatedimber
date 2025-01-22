import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Image } from 'react-native';

import Feather from '@expo/vector-icons/Feather';
import { BaseContainer } from "@/components/BaseContainer";


import { 
    Text,
    Heading,
    VStack,
    HStack,
 } from "@/gluestackComponents";
import { MainTitle } from '@/components/MainTitle';


export default function SakeScreen() {
  const logoPix2 ='data:image/png;base64,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'
  const logoPix = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9PjsBCgsLDg0OHBAQHDsoIig7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//AABEIAC4ALgMBIgACEQEDEQH/xAAaAAACAgMAAAAAAAAAAAAAAAAAAQUGAgQH/8QALhAAAgEDAwMCBAYDAAAAAAAAAQIDAAQREjFhBSFRQVIGExShIjJicYGSByNC/8QAGAEBAAMBAAAAAAAAAAAAAAAAAAEDBAL/xAAYEQEBAQEBAAAAAAAAAAAAAAAAAQIDIf/aAAwDAQACEQMRAD8A6qAAAApUKcqp3jPuPFBwQQVLBjllG8h9w4oyCAQxYMcKx3kPtPFBIAJJKhThmG8Z8DigCSSSWDFhhmG0g9o5oBwVIYKVGFY7RjweaDkEgqFKjLKNox7hzQMkgBQxYZVTtIPJ5oAYAAClQpyqneM+48U1ZlJKypEWOWL7OfI4pAggEMWDHCsd5D7TxTCsxIWJZSOzB9kPgcUEN8TfEMfw9Yi4kQzS3DfKBX8rdvPAqndM+OLq0ukluZjLGfzFu/b9I9K6Df2Ft1G1ktL23R4yMvGQCI/1LzVS6N/jqOy6oZ7y4S9hDa7eApjWPQv6D9vX7VZm5k9Y+/PrrcuasaXB6lNCLO4lhtvp1uIyirq/GTgnUD2wM/zWi31D9Zit5buaZRNJEGVU1H/Ur6h2xkZI8Y9M1KSWCTXX1GUkVkWNBJHq1FSxwf7Y/ispbQNAUYWwRDgk2+REc9wozse9cNaKt+rXSdQk6deTq6M/y4+oquBN2z8vGNIfnY/ap0RroVXSSbSMDG68HmtZ7SZoTbsLQIo/HD9PlEHkDVjNbEYSCFFMnyRpGkxLgPzj0olngAABSoU5VTvGfLcUEAggqWDHLKN3PkcU2Uq8ikljGuosd3Hg8UKpZ41BKmRdQYboPA4qAskkksGLDDMNnHgc0AkEEEKVGFY7Rjw3NJSGSNwoUSNpCjZD5HNDHSkjEBhG2kqdnPk80DAAAAUqFOVU7ofceKasyklJUjLd2L7OfI4oZdLyISWMa6ix3ceDxWEkixLGzRrIHXUA3/HAoP/Z'
  const logoCard4 = 'data:image/png;base64,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'
  const logoCard3 = 'data:image/png;base64,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'
  const logoCard2 = 'data:image/jpeg;base64,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'
  const logoCard = 'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_pos_92px_2x.png'

    
    const PayListComponent = (title) => {
      return(
      <View >
              <HStack
               style={{
                 borderWidth: 1, borderColor: '#999',  padding: 15, borderRadius: 10,
                 alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 20 
                }}  className="bg-white  mr-4 " >
                  <HStack style={{alignItems: 'center', justifyContent: 'space-between', }} >
                      <Image
                        style={{width: 30, height: 30}}
                        source={{
                          uri: title.logo
                        }}
                      />
                      <VStack space="xs" style={{marginLeft: 12}}  >
                          <Text bold size="xl"  >{title.name}</Text>
                          <Text size="lg" style={{color: '#999'}} >{title.description}</Text>
                      </VStack>
                  </HStack>

                  <Text size="lg" style={{ color: "#00A8FF"}} >max</Text>

              </HStack>
        
        <View style={{ marginTop: 20, width: '100%', height: 2, backgroundColor: '#f1f1f1', borderRadius: 10}} />
  
        </View>
      )
  }

  const ComponentTransf = () => {
    return(
    <View >
            <HStack
             style={{
               padding: 15, borderRadius: 10, backgroundColor: '#f9f9f9',
               alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 20 
              }}  className="bg-white  mr-4 " >
                <HStack style={{alignItems: 'center', justifyContent: 'space-between', }} >
                    
                      <Image
                          style={{width: 30, height: 30, marginRight: 6}}
                          source={{
                            uri: logoPix2
                          }}
                        />
                        <Text bold size="17"  >Transferencia Bancaria via PIX</Text>
                </HStack>

            </HStack>
      
      </View>
    )
}

  



  return (
    <BaseContainer>
      <MainTitle title="Sacar" />

      <VStack className="mt-5 ">
        <HStack style={{width: '100%', alignItems: 'center', justifyContent: 'space-between'}} >
          <Heading size="lg">Quanto voce quer sacar ?</Heading>
        </HStack>
      </VStack>

        <PayListComponent
        name="R$ 1.400,00 " 
        description="Selecione seu valor" 
        nav="profile"
        logo={logoCard3}
        />

      <VStack className="mt-5 ">
        <HStack style={{width: '100%', alignItems: 'center', }} >
          <Text size="15">Saldo Disponivel: </Text>
          <Heading size="15">R$ 1.400,00</Heading>
        </HStack>
      </VStack>
        <VStack></VStack>


      <VStack className="mt-15 ">
          <Heading size="19"  >Método de recebimento</Heading>
      </VStack>
      <ComponentTransf />

     
      <StatusBar style="auto" />
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
