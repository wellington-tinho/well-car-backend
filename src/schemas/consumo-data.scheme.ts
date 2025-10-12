import { z } from "zod";

export const consumoSchema = z.object({
	id: z.uuid().optional(),
	urbano: z.string().optional(),
	rodoviario: z.string().optional(),
});

export type ConsumoType = z.infer<typeof consumoSchema>;