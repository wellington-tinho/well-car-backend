import z from "zod";
import {
	type DesempenhoType,
	desempenhoSchema,
} from "../schemas/desempenho-data.scheme.ts";
import { desempenhoService } from "../services/desempenhoService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function desempenhoRoutes(app: FastifyTypedInstance) {
	app.post(
		"/desempenhos",
		{
			schema: {
				tags: ["desempenhos"],
				body: desempenhoSchema.omit({ id: true }),
				response: {
					201: z.object({ success: z.boolean(), data: desempenhoSchema }),
					500: z.object({
						success: z.boolean(),
						error: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			try {
				const data = request.body as DesempenhoType;
				const result = await desempenhoService.createDesempenho(data);
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do DesempenhoType não aceita null
				return reply.status(201).send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/desempenhos",
		{
			schema: {
				tags: ["desempenhos"],
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(desempenhoSchema),
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
				const result = await desempenhoService.getAllDesempenhos();
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do DesempenhoType não aceita null
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/desempenhos/:id",
		{
			schema: {
				tags: ["desempenhos"],
				params: z.object({ id: z.uuid() }),
				response: {
					200: z.object({ success: z.boolean(), data: desempenhoSchema }),
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
				const result = await desempenhoService.getDesempenhoById(id);
				if (!result)
					return reply
						.status(404)
						.send({ success: false, error: "Desempenho não encontrado" });
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do DesempenhoType não aceita null
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.put(
		"/desempenhos/:id",
		{
			schema: {
				tags: ["desempenhos"],
				params: z.object({ id: z.uuid() }),
				body: desempenhoSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({ success: z.boolean(), data: desempenhoSchema }),
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
				const data = request.body as Partial<DesempenhoType>;
				const result = await desempenhoService.updateDesempenho(id, data);
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do DesempenhoType não aceita null
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.delete(
		"/desempenhos/:id",
		{
			schema: {
				tags: ["desempenhos"],
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
				await desempenhoService.deleteDesempenho(id);
				return reply.send({
					success: true,
					message: "Desempenho deletado com sucesso",
				});
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);
}
