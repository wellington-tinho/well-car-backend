import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos de Desempenho
export const desempenhoSchema = z.object({
	id: z.uuid().optional(),
	velocidadeMaxima: z.string().optional(),
	aceleracao0100: z.string().optional(),
});

// 2. Schema de Resposta para a API (com campos nulos)
export const desempenhoResponseSchema = makeResponseSchema(desempenhoSchema);

// 3. Tipos inferidos
export type DesempenhoType = z.infer<typeof desempenhoSchema>;
export type DesempenhoResponseType = z.infer<typeof desempenhoResponseSchema>;
