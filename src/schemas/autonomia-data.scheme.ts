import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos de Autonomia
export const autonomiaSchema = z.object({
	id: z.uuid().optional(),
	urbana: z.string().optional(),
	rodoviaria: z.string().optional(),
});

// 2. Schema de Resposta para a API (com campos nulos)
export const autonomiaResponseSchema = makeResponseSchema(autonomiaSchema);

// 3. Tipos inferidos
export type AutonomiaType = z.infer<typeof autonomiaSchema>;
export type AutonomiaResponseType = z.infer<typeof autonomiaResponseSchema>;
