import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos de Aerodinâmica
export const aerodinamicaSchema = z.object({
	id: z.uuid().optional(),
	areaFrontal: z.string().optional(),
	coeficienteArrasto: z.string().optional(),
	areaFrontalCorrigida: z.string().optional(),
});

// 2. Schema de Resposta para a API (com campos nulos)
export const aerodinamicaResponseSchema =
	makeResponseSchema(aerodinamicaSchema);

// 3. Tipos inferidos
export type AerodinamicaType = z.infer<typeof aerodinamicaSchema>;
export type AerodinamicaResponseType = z.infer<
	typeof aerodinamicaResponseSchema
>;
