import { z } from "zod";

export const carRankingSchema = z.object({
	id: z.uuid().optional(),
	ratingSystem: z.number().optional(),
	comentario: z.string().optional(),
	carId: z.string().uuid(),
	rankingSystemId: z.string().uuid(),
});

export type CarRankingType = z.infer<typeof carRankingSchema>;