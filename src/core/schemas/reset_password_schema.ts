import z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não combinam",
    path: ["confirmPassword"],
  });

export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;
