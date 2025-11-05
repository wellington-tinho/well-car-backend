import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos de Freios
export const freiosSchema = z.object({
	id: z.uuid().optional(),
	dianteiros: z.string().optional(),
	traseiros: z.string().optional(),
});

// 2. Schema de Resposta para a API (com campos nulos)
export const freiosResponseSchema = makeResponseSchema(freiosSchema);

// 3. Tipos inferidos
export type FreiosType = z.infer<typeof freiosSchema>;
export type FreiosResponseType = z.infer<typeof freiosResponseSchema>;
