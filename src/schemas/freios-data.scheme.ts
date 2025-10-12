import { z } from "zod";

export const freiosSchema = z.object({
	id: z.uuid().optional(),
	dianteiros: z.string().optional(),
	traseiros: z.string().optional(),
});

export type FreiosType = z.infer<typeof freiosSchema>;