import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos de Direcao
export const direcaoSchema = z.object({
	id: z.uuid().optional(),
	assistencia: z.string().optional(),
	diametroMinimoGiro: z.string().optional(),
});

// 2. Schema de Resposta para a API (com campos nulos)
export const direcaoResponseSchema = makeResponseSchema(direcaoSchema);

// 3. Tipos inferidos
export type DirecaoType = z.infer<typeof direcaoSchema>;
export type DirecaoResponseType = z.infer<typeof direcaoResponseSchema>;
