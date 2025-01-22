import {View, TouchableOpacity} from 'react-native'

import { 
    Text,
    VStack,
    HStack,
    Input,
    InputSlot,
    InputIcon,
    InputField,
 } from "@/gluestackComponents";

 import {
    Search,
} from "lucide-react-native";

import { BaseContainer } from "@/components/BaseContainer";
import { MainTitle } from "@/components/MainTitle";

 import MaterialIcons from '@expo/vector-icons/MaterialIcons';
 import FontAwesome from '@expo/vector-icons/FontAwesome';

 
export default function ExtractsPay() { 
    
     const MiniButtonsWallet = (title) => {
        return(
         <TouchableOpacity
            style={{
               marginTop: 20,
               borderRadius: 300, backgroundColor: '#fff', width: 150, height: 36, alignItems: 'center', justifyContent: 'center'}} >
            <HStack alignItems="center"  >
                <FontAwesome name={title.icon} size={15} color="black" />
                <Text size="0"  >{title.name}</Text>
            </HStack>    

         </TouchableOpacity>

        );
    }

    const ContainerCategoryPay = () => {
        return(
         <HStack>
            <MiniButtonsWallet
              name="Periodo"
              icon="bank" />

            <MiniButtonsWallet
              name="Pagamento"
              icon="bank" />

            <MiniButtonsWallet
              name="Estorno"
              icon="bank" />
            
         </HStack>
        );
    }
  

   
    const ItemListPayWallet = (title) => {
        return(
          <View>
                <HStack 
                  style={{
                    alignItems: 'center', width: '100%', justifyContent: 'space-between', marginTop: 20 
                  }}  >
                    
                    <HStack 
                      alignItems="center"
                      justifyContent="space-between" >
                        <MaterialIcons name="attach-money" size={24} color="black" />
                        <VStack style={{marginLeft: 12}}  >
                            <Text bold size="15" >{title.name}</Text>
                            <Text size="14" color="#999" >{title.description}</Text>
                        </VStack>
                    </HStack>

                    <Text 
                       bold size="15" >
                      -R$1.500,00
                    </Text>

                </HStack>
        
               <View style={{ marginTop: 15, width: '100%', height: 2, backgroundColor: '#f1f1f1', borderRadius: 10}} />

          </View>
        )
      }
      

    return(
        <BaseContainer >
          <MainTitle title="Extratos" />

            <Input
                mt="$2"
                variant="rounded"
                bgColor="#E5E7EB"
                size="xl"
                borderWidth={0}
            >
                <InputSlot bgColor="#E5E7EB" pl="$5" pt="$1">
                    <InputIcon>
                        <Search size={20} color="#6B7280" />
                    </InputIcon>
                </InputSlot>
                <InputField
                    pl="$3"
                    bgColor="#E5E7EB"
                    placeholder="Pesquisar"
                    placeholderTextColor="#6B7280"
                    size="lg"
                />
            </Input>

            <ContainerCategoryPay />

        


         
            <ItemListPayWallet
              name="Pagamento de mensagem" 
              description="Envio para Camila Farani" 
            />

            <ItemListPayWallet
              name="Pagamento de mensagem" 
              description="Envio para Camila Farani" 
            />

            <ItemListPayWallet
              name="Pagamento de mensagem" 
              description="Envio para Camila Farani" 
            />

            <ItemListPayWallet
              name="Pagamento de mensagem" 
              description="Envio para Camila Farani" 
            />

            <ItemListPayWallet
              name="Pagamento de mensagem" 
              description="Envio para Camila Farani" 
            />

        </BaseContainer>

    );
}


    