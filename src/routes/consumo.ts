import z from "zod";
import {
	type ConsumoType,
	consumoSchema,
} from "../schemas/consumo-data.scheme.ts";
import { consumoService } from "../services/consumoService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function consumoRoutes(app: FastifyTypedInstance) {
	app.post(
		"/consumos",
		{
			schema: {
				tags: ["consumos"],
				body: consumoSchema.omit({ id: true }),
				response: {
					201: z.object({ success: z.boolean(), data: consumoSchema }),
					500: z.object({
						success: z.boolean(),
						error: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			try {
				const data = request.body as ConsumoType;
				const result = await consumoService.createConsumo(data);
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do ConsumoType não aceita null
				return reply.status(201).send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/consumos",
		{
			schema: {
				tags: ["consumos"],
				response: {
					200: z.object({ success: z.boolean(), data: z.array(consumoSchema) }),
					500: z.object({
						success: z.boolean(),
						error: z.string(),
					}),
				},
			},
		},
		async (_, reply) => {
			try {
				const result = await consumoService.getAllConsumos();
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do ConsumoType não aceita null
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/consumos/:id",
		{
			schema: {
				tags: ["consumos"],
				params: z.object({ id: z.uuid() }),
				response: {
					200: z.object({ success: z.boolean(), data: consumoSchema }),
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
				const result = await consumoService.getConsumoById(id);
				if (!result)
					return reply
						.status(404)
						.send({ success: false, error: "Consumo não encontrado" });
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do ConsumoType não aceita null
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.put(
		"/consumos/:id",
		{
			schema: {
				tags: ["consumos"],
				params: z.object({ id: z.uuid() }),
				body: consumoSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({ success: z.boolean(), data: consumoSchema }),
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
				const data = request.body as Partial<ConsumoType>;
				const result = await consumoService.updateConsumo(id, data);
				// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do ConsumoType não aceita null
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.delete(
		"/consumos/:id",
		{
			schema: {
				tags: ["consumos"],
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
				await consumoService.deleteConsumo(id);
				return reply.send({
					success: true,
					message: "Consumo deletado com sucesso",
				});
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);
}
