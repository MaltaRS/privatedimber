import { 
    Text,
 } from "@/gluestackComponents";

export default function TitleContainer(title) {

  return (
      <Text  mt="24" mb="16" fontSize={19} fontFamily="$medium"  color="#15161E" lineHeight={24}>{title.name}</Text>
      
 
  );
}