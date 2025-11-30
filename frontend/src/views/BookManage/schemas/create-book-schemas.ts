import { z } from "zod";

export const createBookSchema = z.object({
  name: z.string().nonempty({ message: "书名不能为空" }),
  author: z.string().nonempty({ message: "作者不能为空" }),
  description: z.string().nonempty({ message: "描述不能为空" }),
  cover: z.instanceof(File).refine((file) => file.size < 2 * 1024 * 1024, {
    message: "图片不能大于 2MB",
  }),
});

export type CreateBookSchemaType = z.infer<typeof createBookSchema>;
