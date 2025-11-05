import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos de Suspensao
export const suspensaoSchema = z.object({
	id: z.uuid().optional(),
	dianteira: z.string().optional(),
	traseira: z.string().optional(),
	elementoElasticod: z.string().optional(),
	elementoElasticot: z.string().optional(),
});

// 2. Schema de Resposta para a API (com campos nulos)
export const suspensaoResponseSchema = makeResponseSchema(suspensaoSchema);

// 3. Tipos inferidos
export type SuspensaoType = z.infer<typeof suspensaoSchema>;
export type SuspensaoResponseType = z.infer<typeof suspensaoResponseSchema>;
