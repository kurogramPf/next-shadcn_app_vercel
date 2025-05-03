import { z } from "zod";

export const postPatchSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(128, { message: "記事のタイトルは128文字以内で入力してください。" }),
  // contentはjson形式で保存されるので、json利用したいが、zodはjsonの型が無いのでzodのany()を使用
  content: z.any().optional(),
});

// z.infer<>指定した型を取得できる。z.infer指定が無いとzod分の型も取得してしまう。
export type postPatchSchemaType = z.infer<typeof postPatchSchema>;
