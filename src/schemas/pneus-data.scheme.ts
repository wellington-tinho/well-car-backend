import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos de Pneus
export const pneusSchema = z.object({
	id: z.uuid().optional(),
	dianteiros: z.string().optional(),
	traseiros: z.string().optional(),
	alturaFlancoD: z.string().optional(),
	estepe: z.string().optional(),
	tipo: z.string().optional(),
});

// 2. Schema de Resposta para a API (com campos nulos)
export const pneusResponseSchema = makeResponseSchema(pneusSchema);

// 3. Tipos inferidos
export type PneusType = z.infer<typeof pneusSchema>;
export type PneusResponseType = z.infer<typeof pneusResponseSchema>;
