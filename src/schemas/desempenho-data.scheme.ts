import { z } from "zod";

export const desempenhoSchema = z.object({
	id: z.uuid().optional(),
	velocidadeMaxima: z.string().optional(),
	aceleracao0100: z.string().optional(),
});

export type DesempenhoType = z.infer<typeof desempenhoSchema>;