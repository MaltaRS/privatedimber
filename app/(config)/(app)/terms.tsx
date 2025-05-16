import React, { useRef, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import HeaderContainer from "@/components/HeaderContainer";
import { BaseContainer } from "@/components/BaseContainer";
import { useTranslation } from "react-i18next";

// Cada seção pode conter até 5 parágrafos (contents)
const sections = [
  {
    id: "section1",
    title: "Introdução",
    contents: [
      "Esta é a seção de introdução.",
      "Aqui você encontrará informações iniciais sobre o aplicativo.",
      "Nossa missão é garantir uma experiência intuitiva e agradável.",
      "Explore as funcionalidades e descubra dicas úteis para começar.",
      "Aproveite todos os recursos projetados para facilitar seu dia a dia.",
    ],
  },
  {
    id: "section2",
    title: "Como usar",
    contents: [
      "Esta seção explica como utilizar o aplicativo de forma eficiente.",
      "Aproveite todos os recursos disponíveis para uma melhor experiência.",
      "Acesse o menu principal para navegar entre as funcionalidades.",
      "Toque nos ícones para interagir com cada recurso rapidamente.",
      "Consulte nosso tutorial em vídeo para dicas avançadas.",
    ],
  },
  {
    id: "section3",
    title: "Perguntas Frequentes",
    contents: [
      "Quais são os requisitos de sistema para usar o aplicativo?",
      "Como faço backup dos meus dados?",
      "Posso usar o aplicativo sem conexão com a internet?",
      "Como redefinir minha senha?",
      "Onde encontro tutoriais e guias adicionais?",
    ],
  },
  {
    id: "section4",
    title: "Contato",
    contents: [
      "Se precisar de suporte adicional, entre em contato conosco.",
      "Nossos canais de atendimento estão disponíveis 24/7.",
      "Envie um e-mail para suporte@dimber.com.",
      "Converse com nosso chatbot no site para respostas imediatas.",
      "Ligue para nosso SAC pelo número (11) 1234-5678.",
    ],
  },
  {
    id: "section5",
    title: "Segurança",
    contents: [
      "Detalhes sobre como protegemos seus dados.",
      "Dicas para aumentar sua segurança pessoal.",
      "Práticas recomendadas ao criar senhas.",
      "Informações sobre criptografia de ponta a ponta.",
      "Política de privacidade e conformidade.",
    ],
  },
  {
    id: "section6",
    title: "Privacidade e Dados do Usuárioo",
    contents: [
      "O WhatsApp se importa com a sua privacidade. A Política de Privacidade do WhatsApp descreve nossas práticas relativas a dados, incluindo tipos de informações que coletamos e como as usamos.",
      "Utilizamos informações para fornecer, melhorar, proteger e personalizar nossos serviços, conforme descrito na nossa Política de Privacidade.",
      "As mensagens são criptografadas de ponta a ponta, garantindo que somente remetente e destinatário possam ler o conteúdo.",
      "Podemos compartilhar dados com empresas afiliadas para oferecer integrações e aprimorar a segurança e integridade dos serviços.",
      "Você pode gerenciar preferências de privacidade, revisar, atualizar ou excluir suas informações pessoais nas configurações do aplicativo.",
    ],
  },
  
];

const HelpScreen = () => {
  const { t } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [sectionPositions, setSectionPositions] = useState<{ [key: string]: number }>({});
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleLayout = (event: LayoutChangeEvent, id: string) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions((prev) => ({ ...prev, [id]: y }));
  };

  const handlePress = (id: string) => {
    const position = sectionPositions[id];
    if (position !== undefined) {
      scrollViewRef.current?.scrollTo({ y: position - 10, animated: true });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowBackToTop(offsetY > 200);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <BaseContainer backgroundColor="$gray50">
   <ScrollView
     ref={scrollViewRef}
     onScroll={handleScroll}
     scrollEventThrottle={16}
     showsVerticalScrollIndicator={false}
     showsHorizontalScrollIndicator={false}
   >
        <HeaderContainer screenKey="help_screen" titleKey="header_title" />
        <Text style={styles.header}>{t("Termos de Serviço do Dimber")}</Text>
        <Text style={styles.indice}>{t("Índice")}</Text>

        <View style={styles.menu}>
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              onPress={() => handlePress(section.id)}
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>{t(section.title)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {sections.map((section) => (
          <View
            key={section.id}
            onLayout={(event) => handleLayout(event, section.id)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>{t(section.title)}</Text>
            {section.contents.slice(0, 5).map((paragraph, idx) => (
              <View key={idx} style={styles.bulletContainer}>
                <Text style={styles.bullet}>{"•"}</Text>
                <Text style={styles.sectionContent}>{t(paragraph)}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {showBackToTop && (
        <TouchableOpacity style={styles.backToTop} onPress={scrollToTop}>
          <Text style={styles.backToTopText}>{t("Voltar ao topo")}</Text>
        </TouchableOpacity>
      )}
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  indice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  menu: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 14,
    color: "#007AFF",
    lineHeight: 16,
  },
  section: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 20,
    marginRight: 8,
  },
  sectionContent: {
    flex: 1,
    fontSize: 14,
    lineHeight: 16,
  },
  backToTop: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 4,
  },
  backToTopText: {
    color: '#FFF',
    fontSize: 14,
  
  },
});

export default HelpScreen;