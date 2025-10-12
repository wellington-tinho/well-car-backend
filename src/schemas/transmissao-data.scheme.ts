import { z } from "zod";

export const transmissaoSchema = z.object({
	id: z.uuid().optional(),
	tracao: z.string().optional(),
	cambio: z.string().optional(),
	codigoCambio: z.string().optional(),
	acoplamento: z.string().optional(),
});

export type TransmissaoType = z.infer<typeof transmissaoSchema>;