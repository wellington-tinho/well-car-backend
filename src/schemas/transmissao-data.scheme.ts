import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos de Transmissao
export const transmissaoSchema = z.object({
	id: z.uuid().optional(),
	tracao: z.string().optional(),
	cambio: z.string().optional(),
	codigoCambio: z.string().optional(),
	acoplamento: z.string().optional(),
});

// 2. Schema de Resposta para a API (com campos nulos)
export const transmissaoResponseSchema = makeResponseSchema(transmissaoSchema);

// 3. Tipos inferidos
export type TransmissaoType = z.infer<typeof transmissaoSchema>;
export type TransmissaoResponseType = z.infer<typeof transmissaoResponseSchema>;
