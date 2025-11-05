import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos de Consumo
export const consumoSchema = z.object({
	id: z.uuid().optional(),
	urbano: z.string().optional(),
	rodoviario: z.string().optional(),
});

// 2. Schema de Resposta para a API (com campos nulos)
export const consumoResponseSchema = makeResponseSchema(consumoSchema);

// 3. Tipos inferidos
export type ConsumoType = z.infer<typeof consumoSchema>;
export type ConsumoResponseType = z.infer<typeof consumoResponseSchema>;
