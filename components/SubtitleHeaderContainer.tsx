import { 
    Text,
 } from "@/gluestackComponents";

export default function SubtitleHeaderContainer(title) {

  return (
    <Text 
        style={{fontSize: 15, marginTop: 20, color: '#1F2937'}}  >
        {title.nametitle}
      </Text>
  );
}