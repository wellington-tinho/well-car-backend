import z from "zod";
import {
	type CarRankingType,
	carRankingResponseSchema,
	carRankingSchema,
} from "../schemas/car-ranking-data.scheme.ts";
import { carRankingService } from "../services/carRankingService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function carRankingRoutes(app: FastifyTypedInstance) {
	app.post(
		"/car-rankings",
		{
			schema: {
				tags: ["car-rankings"],
				body: carRankingSchema.omit({ id: true }),
				response: {
					201: z.object({
						success: z.boolean(),
						data: carRankingResponseSchema,
					}),
					500: z.object({
						success: z.boolean(),
						error: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			try {
				const data = request.body as CarRankingType;
				const result = await carRankingService.createCarRanking(data);
				return reply.status(201).send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/car-rankings",
		{
			schema: {
				tags: ["car-rankings"],
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(carRankingResponseSchema.nullable()),
					}),
					500: z.object({
						success: z.boolean(),
						error: z.string(),
					}),
				},
			},
		},
		async (_, reply) => {
			try {
				const result = await carRankingService.getAllCarRankings();
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/car-rankings/:id",
		{
			schema: {
				tags: ["car-rankings"],
				params: z.object({ id: z.uuid() }),
				response: {
					200: z.object({
						success: z.boolean(),
						data: carRankingResponseSchema,
					}),
					404: z.object({
						success: z.boolean(),
						error: z.string(),
					}),
					500: z.object({
						success: z.boolean(),
						error: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			try {
				const { id } = request.params as { id: string };
				const result = await carRankingService.getCarRankingById(id);
				if (!result)
					return reply
						.status(404)
						.send({ success: false, error: "Ranking do carro não encontrado" });
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.put(
		"/car-rankings/:id",
		{
			schema: {
				tags: ["car-rankings"],
				params: z.object({ id: z.uuid() }),
				body: carRankingSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({
						success: z.boolean(),
						data: carRankingResponseSchema,
					}),
					500: z.object({
						success: z.boolean(),
						error: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			try {
				const { id } = request.params as { id: string };
				const data = request.body as CarRankingType;
				const result = await carRankingService.updateCarRanking(id, data);
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.delete(
		"/car-rankings/:id",
		{
			schema: {
				tags: ["car-rankings"],
				params: z.object({ id: z.uuid() }),
				response: {
					200: z.object({ success: z.boolean(), message: z.string() }),
					500: z.object({
						success: z.boolean(),
						error: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			try {
				const { id } = request.params as { id: string };
				await carRankingService.deleteCarRanking(id);
				return reply.send({
					success: true,
					message: "Ranking do carro deletado com sucesso",
				});
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);
}
