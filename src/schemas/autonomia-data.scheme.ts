import { z } from "zod";

export const autonomiaSchema = z.object({
	id: z.uuid().optional(),
	urbana: z.string().optional(),
	rodoviaria: z.string().optional(),
});

export type AutonomiaType = z.infer<typeof autonomiaSchema>;