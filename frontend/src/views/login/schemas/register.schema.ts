import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().nonempty({ message: "用户名不能为空" }),
    password: z.string().min(6, { message: "密码长度不能小于6位" }),
    confirmPassword: z.string().min(6, { message: "确认密码长度不能小于6位" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
