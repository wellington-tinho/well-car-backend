import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos de RankingSystem
export const rankingSystemSchema = z.object({
	id: z.uuid().optional(),
	nome: z.string().min(1, "Nome é obrigatório"),
	descricao: z.string().optional(),
});

// 2. Schema de Resposta para a API (com campos nulos)
export const rankingSystemResponseSchema =
	makeResponseSchema(rankingSystemSchema);

// 3. Tipos inferidos
export type RankingSystemType = z.infer<typeof rankingSystemSchema>;
export type RankingSystemResponseType = z.infer<
	typeof rankingSystemResponseSchema
>;
