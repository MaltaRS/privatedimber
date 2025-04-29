import {
    format,
    formatDistanceToNow,
    isThisYear,
    isToday,
    isYesterday,
    parseISO,
    differenceInDays,
    differenceInWeeks,
    differenceInMonths,
} from "date-fns";
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

        if (isYesterday(date)) {
            return "Ontem";
        }

        if (isThisYear(date)) {
            return format(date, "dd/MM", { locale: ptBR });
        }

        return format(date, "dd/MM/yyyy", { locale: ptBR });
    } catch (error) {
        console.error("Erro ao formatar data:", error);
        return "Data inválida";
    }
};

export const formatTime = (dateString: string) => {
    try {
        const date = parseISO(dateString);

        return format(date, "HH:mm", { locale: ptBR });
    } catch (error) {
        console.error("Erro ao formatar data:", error);
        return "Data inválida";
    }
};

export const formatSuccessDate = (dateString: string) => {
    try {
        const date = parseISO(dateString);
        return format(date, "dd 'de' MMMM, yyyy 'as' HH:mm", { locale: ptBR });
    } catch (error) {
        console.error("Erro ao formatar a data de sucesso:", error);
        return "Data inválida";
    }
};

export const formatLastAccess = (dateString: string) => {
    try {
        const date = parseISO(dateString);
        const now = new Date();

        if (isToday(date)) {
            return `hoje às ${format(date, "HH:mm", { locale: ptBR })}`;
        }

        if (isYesterday(date)) {
            return `ontem às ${format(date, "HH:mm", { locale: ptBR })}`;
        }

        const days = differenceInDays(now, date);
        const weeks = differenceInWeeks(now, date);
        const months = differenceInMonths(now, date);

        if (days < 7) {
            return `há ${days} ${days === 1 ? "dia" : "dias"}`;
        }

        if (weeks < 4) {
            return `há ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
        }

        if (months < 12) {
            return `há ${months} ${months === 1 ? "mês" : "meses"}`;
        }

        return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch (error) {
        console.error("Erro ao formatar data de último acesso:", error);
        return "Data inválida";
    }
};
