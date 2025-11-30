import { z } from "zod";

export const createBookSchema = z.object({
  name: z.string().nonempty({ message: "书名不能为空" }),
  author: z.string().nonempty({ message: "作者不能为空" }),
  description: z.string().nonempty({ message: "描述不能为空" }),
  cover: z.string().nonempty({ message: "封面不能为空" }),
});

export type CreateBookSchemaType = z.infer<typeof createBookSchema>;
