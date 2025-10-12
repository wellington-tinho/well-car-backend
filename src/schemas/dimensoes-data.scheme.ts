import { z } from "zod";

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

export type DimensoesType = z.infer<typeof dimensoesSchema>;