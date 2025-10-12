import { z } from "zod";

export const aerodinamicaSchema = z.object({
	id: z.uuid().optional(),
	areaFrontal: z.string().optional(),
	coeficienteArrasto: z.string().optional(),
	areaFrontalCorrigida: z.string().optional(),
});

export type AerodinamicaType = z.infer<typeof aerodinamicaSchema>;