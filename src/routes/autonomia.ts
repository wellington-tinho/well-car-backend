import z from "zod";
import {
	type AutonomiaType,
	autonomiaSchema,
} from "../schemas/autonomia-data.scheme.ts";
import { autonomiaService } from "../services/autonomiaService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function autonomiaRoutes(app: FastifyTypedInstance) {
	app.post(
		"/autonomias",
		{
			schema: {
				tags: ["autonomias"],
				body: autonomiaSchema.omit({ id: true }),
				response: {
					201: z.object({ success: z.boolean(), data: autonomiaSchema }),
					500: z.object({
						success: z.boolean(),
						error: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			try {
				const data = request.body as AutonomiaType;
				const result = await autonomiaService.createAutonomia(data);
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do AutonomiaType não aceita null
				return reply.status(201).send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/autonomias",
		{
			schema: {
				tags: ["autonomias"],
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(autonomiaSchema),
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
				const result = await autonomiaService.getAllAutonomias();
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do AutonomiaType não aceita null
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/autonomias/:id",
		{
			schema: {
				tags: ["autonomias"],
				params: z.object({ id: z.uuid() }),
				response: {
					200: z.object({ success: z.boolean(), data: autonomiaSchema }),
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
				const result = await autonomiaService.getAutonomiaById(id);
				if (!result)
					return reply
						.status(404)
						.send({ success: false, error: "Autonomia não encontrada" });
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do AutonomiaType não aceita null
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.put(
		"/autonomias/:id",
		{
			schema: {
				tags: ["autonomias"],
				params: z.object({ id: z.uuid() }),
				body: autonomiaSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({ success: z.boolean(), data: autonomiaSchema }),
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
				const data = request.body as Partial<AutonomiaType>;
				const result = await autonomiaService.updateAutonomia(id, data);
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do AutonomiaType não aceita null
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.delete(
		"/autonomias/:id",
		{
			schema: {
				tags: ["autonomias"],
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
				await autonomiaService.deleteAutonomia(id);
				return reply.send({
					success: true,
					message: "Autonomia deletada com sucesso",
				});
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);
}
