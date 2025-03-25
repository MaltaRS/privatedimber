import { z } from "zod";

const bankDataSchema = z.object({
    bankName: z.string().min(1, "Nome do banco é obrigatório"),
    agency: z.string().min(1, "Agência é obrigatória"),
    accountNumber: z.string().min(1, "Número da conta é obrigatório"),
    accountType: z.string().min(1, "Tipo da conta é obrigatório"),
});

export const withdrawalSchema = z
    .object({
        amount: z.string().min(1, "Valor é obrigatório"),
        withdrawalType: z.enum(["pix", "bank"], {
            required_error: "Tipo de saque é obrigatório",
        }),
        pixKey: z.string().optional(),
        bankData: bankDataSchema.optional(),
    })
    .refine(
        (data) => {
            if (data.withdrawalType === "pix") {
                return !!data.pixKey;
            }
            if (data.withdrawalType === "bank") {
                return !!data.bankData;
            }
            return true;
        },
        {
            message: "Dados incompletos para o tipo de saque selecionado",
            path: ["withdrawalType"],
        },
    );

export type WithdrawalFormData = z.infer<typeof withdrawalSchema>;
