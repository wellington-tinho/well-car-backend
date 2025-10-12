import { z } from "zod";

export const pneusSchema = z.object({
	id: z.uuid().optional(),
	dianteiros: z.string().optional(),
	traseiros: z.string().optional(),
	alturaFlancoD: z.string().optional(),
	estepe: z.string().optional(),
});

export type PneusType = z.infer<typeof pneusSchema>;