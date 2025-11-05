import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos de CarRanking
export const carRankingSchema = z.object({
	id: z.uuid().optional(),
	ratingSystem: z.number().optional(),
	comentario: z.string().optional(),
	carId: z.string().uuid(),
	rankingSystemId: z.string().uuid(),
});

// 2. Schema de Resposta para a API (com campos nulos)
export const carRankingResponseSchema = makeResponseSchema(carRankingSchema);

// 3. Tipos inferidos
export type CarRankingType = z.infer<typeof carRankingSchema>;
export type CarRankingResponseType = z.infer<typeof carRankingResponseSchema>;
