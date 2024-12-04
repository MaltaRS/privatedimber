import { format, formatDistanceToNow, isToday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const getRelativeTime = (date: string) => {
    try {
        return formatDistanceToNow(parseISO(date), {
            addSuffix: true,
            locale: ptBR,
        });
    } catch (error) {
        console.error("Erro ao formatar a data:", error);
        return "Data inválida";
    }
};

export const getFormattedDate = (date: string) => {
    try {
        return format(parseISO(date), "dd/MM/yyyy", {
            locale: ptBR,
        });
    } catch (error) {
        console.error("Erro ao formatar a data:", error);
        return "Data inválida";
    }
};

export const formatMessageTime = (dateString: string) => {
    try {
        const date = parseISO(dateString);

        if (isToday(date)) {
            return format(date, "HH:mm", { locale: ptBR });
        }

        return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } catch (error) {
        console.error("Erro ao formatar data:", error);
        return "Data inválida";
    }
};
