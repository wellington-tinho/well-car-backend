import { z } from "zod";

export const direcaoSchema = z.object({
	id: z.uuid().optional(),
	assistencia: z.string().optional(),
	diametroMinimoGiro: z.string().optional(),
});

export type DirecaoType = z.infer<typeof direcaoSchema>;