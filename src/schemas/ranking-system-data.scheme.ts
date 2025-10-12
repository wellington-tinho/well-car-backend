import { z } from "zod";

export const rankingSystemSchema = z.object({
	id: z.uuid().optional(),
	nome: z.string().min(1, "Nome é obrigatório"),
	descricao: z.string().optional(),
});

export type RankingSystemType = z.infer<typeof rankingSystemSchema>;