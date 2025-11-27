import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
  // username: z.string().nonempty({ message: "用户名不能为空" }),
  // password: z.string().min(6, { message: "密码长度不能小于6位" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
