import {View} from 'react-native'


import { 
    Text,
    Heading,
    VStack,
    HStack,
    Avatar,
    AvatarImage,
    AvatarBadge,
    AvatarFallbackText,
    Card,
    Button,
    ButtonText,
    Box,

 } from "@/gluestackComponents";


export default function ProfileInstituition() { 
const logoInstituto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5z03a91O5qAqycFrTXVjaBcpy1rOjeBERaw&s"


    const TitleContainer = (title) => {
      return(
          <Heading
              style={{marginTop: 13, marginBottom: 13}}
              size="17" className="mt-10" >
              {title.name}
          </Heading>
      );
    }
    return(

        <Card className=" flex-1" >

            <View 
               style={{alignItems: 'center', marginTop: 70}} >

                <Avatar className="mt-7 ">
                  <AvatarImage 
                    className="w-[80px] h-[80px] mt-10"
                    source={{uri: logoInstituto}}
                  />
                </Avatar>

                <Heading 
                   size="lg" className="mb-1 mt-10" >
                  Instituto Neymar
                </Heading>
                <Text 
                   className="text-sm font-normal  text-typography-900" >
                  Esportes, Criancas * Santos - SP
                </Text>

                <View style={{ marginTop: 25, width: '100%', height: 3, backgroundColor: '#f2f2f2', borderRadius: 10}}  />

            </View>


         
            <VStack 
              style={{marginTop: 20}}>
                  <TitleContainer 
                    name="Sobre Nós" >
                    Sobre Nós
                  </TitleContainer>
              
                  <Text 
                    size="15" >
                    O Instituto Projeto Neymar Jr. é uma organização sem fins lucrativos fundada em 2014 por Neymar Jr. e sua família. Localizado em Praia Grande, no litoral de São Paulo, o instituto foi criado com o objetivo de oferecer oportunidades para crianças, adolescentes e suas famílias em situação de vulnerabilidade social.
                  </Text>

                  <Text 
                    size="15" style={{marginTop: 10}}>
                    O Instituto Projeto Neymar Jr. é uma organização sem fins lucrativos fundada em 2014 por Neymar Jr. e sua família. Localizado em Praia Grande, no litoral de São Paulo, o instituto foi criado com o objetivo de oferecer oportunidades para crianças, adolescentes e suas famílias em situação de vulnerabilidade social.
                  </Text>
            </VStack>



            
        </Card>

    );
}


    