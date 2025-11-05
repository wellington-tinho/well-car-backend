import z from "zod";
import {
	type RankingSystemType,
	rankingSystemResponseSchema,
	rankingSystemSchema,
} from "../schemas/ranking-system-data.scheme.ts";
import { rankingSystemService } from "../services/rankingSystemService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function rankingSystemRoutes(app: FastifyTypedInstance) {
	app.post(
		"/ranking-systems",
		{
			schema: {
				tags: ["ranking-systems"],
				body: rankingSystemSchema.omit({ id: true }),
				response: {
					201: z.object({
						success: z.boolean(),
						data: rankingSystemResponseSchema,
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
				const data = request.body as RankingSystemType;
				const result = await rankingSystemService.createRankingSystem(data);
				return reply.status(201).send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/ranking-systems",
		{
			schema: {
				tags: ["ranking-systems"],
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(rankingSystemResponseSchema),
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
				const result = await rankingSystemService.getAllRankingSystems();
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/ranking-systems/:id",
		{
			schema: {
				tags: ["ranking-systems"],
				params: z.object({ id: z.uuid() }),
				response: {
					200: z.object({
						success: z.boolean(),
						data: rankingSystemResponseSchema.nullable(),
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
				const result = await rankingSystemService.getRankingSystemById(id);
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.put(
		"/ranking-systems/:id",
		{
			schema: {
				tags: ["ranking-systems"],
				params: z.object({ id: z.uuid() }),
				body: rankingSystemSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({
						success: z.boolean(),
						data: rankingSystemResponseSchema,
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
				const data = request.body as Partial<RankingSystemType>;
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do RankingSystemType não aceita null
				const result = await rankingSystemService.updateRankingSystem(id, data);
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.delete(
		"/ranking-systems/:id",
		{
			schema: {
				tags: ["ranking-systems"],
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
				await rankingSystemService.deleteRankingSystem(id);
				return reply.send({
					success: true,
					message: "Sistema de ranking deletado com sucesso",
				});
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);
}
