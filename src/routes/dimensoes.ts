import z from "zod";
import {
	type DimensoesType,
	dimensoesResponseSchema,
	dimensoesSchema,
} from "../schemas/dimensoes-data.scheme.ts";
import { dimensoesService } from "../services/dimensoesService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function dimensoesRoutes(app: FastifyTypedInstance) {
	app.post(
		"/dimensoes",
		{
			schema: {
				tags: ["dimensoes"],
				description: "Criar dimensões",
				body: dimensoesSchema.omit({ id: true }),
				response: {
					201: z.object({
						success: z.boolean(),
						data: dimensoesResponseSchema,
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
				const data = request.body as DimensoesType;
				const result = await dimensoesService.createDimensoes(data);
				return reply.status(201).send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/dimensoes",
		{
			schema: {
				tags: ["dimensoes"],
				description: "Buscar todas as dimensões",
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(dimensoesResponseSchema),
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
				const result = await dimensoesService.getAllDimensoes();
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/dimensoes/:id",
		{
			schema: {
				tags: ["dimensoes"],
				response: {
					200: z.object({
						success: z.boolean(),
						data: dimensoesResponseSchema,
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
				const result = await dimensoesService.getDimensoesById(id);
				if (!result)
					return reply
						.status(404)
						.send({ success: false, error: "Dimensões não encontradas" });
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.put(
		"/dimensoes/:id",
		{
			schema: {
				tags: ["dimensoes"],
				params: z.object({ id: z.uuid() }),
				body: dimensoesSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({
						success: z.boolean(),
						data: dimensoesResponseSchema,
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
				const data = request.body as Partial<DimensoesType>;
				const result = await dimensoesService.updateDimensoes(id, data);
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.delete(
		"/dimensoes/:id",
		{
			schema: {
				tags: ["dimensoes"],
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
				await dimensoesService.deleteDimensoes(id);
				return reply.send({
					success: true,
					message: "Dimensões deletadas com sucesso",
				});
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);
}
