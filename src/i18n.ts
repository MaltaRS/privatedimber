import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ptPT from "./locales/pt-PT.json";
import ptBR from "./locales/pt-BR.json";
import es from "./locales/es.json";
import it from "./locales/it.json";
import fr from "./locales/fr.json";

i18n
.use(initReactI18next)
.init({
compatibilityJSON: "v3",
resources: {
en: { translation: en },
ptPT: { translation: ptPT },
ptBR: { translation: ptBR },
es: { translation: es },
it: { translation: it },
fr: { translation: fr },
},
fallbackLng: "en", // idioma padrão
interpolation: {
escapeValue: false, // react já faz isso
},
});

export default i18n;
