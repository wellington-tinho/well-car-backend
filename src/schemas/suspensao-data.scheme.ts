import { z } from "zod";

export const suspensaoSchema = z.object({
	id: z.uuid().optional(),
	dianteira: z.string().optional(),
	traseira: z.string().optional(),
	elementoElasticod: z.string().optional(),
	elementoElasticot: z.string().optional(),
});

export type SuspensaoType = z.infer<typeof suspensaoSchema>;