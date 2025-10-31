import { z } from "zod";

export const pneusSchema = z.object({
	id: z.uuid().optional(),
	dianteiros: z.string().optional(),
	traseiros: z.string().optional(),
	alturaFlancoD: z.string().optional(),
	estepe: z.string().optional(),
});

export const pneusSchemaWithNull = z.object({
	id: z.uuid().optional().nullable(),
	dianteiros: z.string().optional().nullable(),
	traseiros: z.string().optional().nullable(),
	alturaFlancoD: z.string().optional().nullable(),
	estepe: z.string().optional().nullable(),
});

export type PneusType = z.infer<typeof pneusSchema>;
// export type PneusType = z.infer<typeof pneusSchemawithNull>;
