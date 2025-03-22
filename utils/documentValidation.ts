export const validateDocument = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length <= 11) {
        if (cleanValue.length !== 11) return false;

        if (/^(\d)\1+$/.test(cleanValue)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleanValue.charAt(i)) * (10 - i);
        }
        let digit = 11 - (sum % 11);
        if (digit > 9) digit = 0;
        if (digit !== parseInt(cleanValue.charAt(9))) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cleanValue.charAt(i)) * (11 - i);
        }
        digit = 11 - (sum % 11);
        if (digit > 9) digit = 0;
        if (digit !== parseInt(cleanValue.charAt(10))) return false;

        return true;
    } else {
        if (cleanValue.length !== 14) return false;

        if (/^(\d)\1+$/.test(cleanValue)) return false;

        let sum = 0;
        let weight = 5;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(cleanValue.charAt(i)) * weight;
            weight = weight === 2 ? 9 : weight - 1;
        }
        let digit = 11 - (sum % 11);
        if (digit > 9) digit = 0;
        if (digit !== parseInt(cleanValue.charAt(12))) return false;

        sum = 0;
        weight = 6;
        for (let i = 0; i < 13; i++) {
            sum += parseInt(cleanValue.charAt(i)) * weight;
            weight = weight === 2 ? 9 : weight - 1;
        }
        digit = 11 - (sum % 11);
        if (digit > 9) digit = 0;
        if (digit !== parseInt(cleanValue.charAt(13))) return false;

        return true;
    }
};

export const getDocumentMask = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length <= 11) {
        return [
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
        ];
    } else {
        return [
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            "/",
            "0",
            "0",
            "0",
            "1",
            "-",
            /\d/,
            /\d/,
        ];
    }
};

export const getDocumentPlaceholder = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length <= 11) {
        return "000.000.000-00";
    } else {
        return "00.000.000/0001-00";
    }
};
