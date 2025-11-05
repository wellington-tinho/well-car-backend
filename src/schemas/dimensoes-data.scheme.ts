import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos de Dimensoes
export const dimensoesSchema = z.object({
	id: z.uuid().optional(),
	comprimento: z.string().optional(),
	largura: z.string().optional(),
	distanciaEntreEixos: z.string().optional(),
	altura: z.string().optional(),
	bitolaDianteira: z.string().optional(),
	bitolaTraseira: z.string().optional(),
	tanqueCombustivel: z.string().optional(),
	peso: z.string().optional(),
	cargaUtil: z.string().optional(),
	vaoLivreSolo: z.string().optional(),
});

// 2. Schema de Resposta para a API (com campos nulos)
export const dimensoesResponseSchema = makeResponseSchema(dimensoesSchema);

// 3. Tipos inferidos
export type DimensoesType = z.infer<typeof dimensoesSchema>;
export type DimensoesResponseType = z.infer<typeof dimensoesResponseSchema>;
