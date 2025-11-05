import z from "zod";
import {
	type AerodinamicaType,
	aerodinamicaResponseSchema,
	aerodinamicaSchema,
} from "../schemas/aerodinamica-data.scheme.ts";
import { aerodinamicaService } from "../services/aerodinamicaService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function aerodinamicaRoutes(app: FastifyTypedInstance) {
	app.post(
		"/aerodinamicas",
		{
			schema: {
				tags: ["aerodinamicas"],
				body: aerodinamicaSchema.omit({ id: true }),
				response: {
					201: z.object({
						success: z.boolean(),
						data: aerodinamicaResponseSchema,
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
				const data = request.body as AerodinamicaType;
				const parsed = aerodinamicaResponseSchema.parse(data);

				return reply.status(201).send({ success: true, data: parsed });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/aerodinamicas",
		{
			schema: {
				tags: ["aerodinamicas"],
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(aerodinamicaResponseSchema),
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
				const result = await aerodinamicaService.getAllAerodinamicas();
				const parsed = z.array(aerodinamicaResponseSchema).parse(result);
				return reply.send({ success: true, data: parsed });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.get(
		"/aerodinamicas/:id",
		{
			schema: {
				tags: ["aerodinamicas"],
				params: z.object({ id: z.uuid() }),
				response: {
					200: z.object({
						success: z.boolean(),
						data: aerodinamicaResponseSchema,
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
				const result = await aerodinamicaService.getAerodinamicaById(id);
				if (!result)
					return reply
						.status(404)
						.send({ success: false, error: "Aerodinâmica não encontrada" });
				return reply.send({ success: true, data: result });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.put(
		"/aerodinamicas/:id",
		{
			schema: {
				tags: ["aerodinamicas"],
				params: z.object({ id: z.uuid() }),
				body: aerodinamicaSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({
						success: z.boolean(),
						data: aerodinamicaResponseSchema,
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
				const data = request.body as Partial<AerodinamicaType>;
				const result = await aerodinamicaService.updateAerodinamica(id, data);
				const parsed = aerodinamicaResponseSchema.parse(result);
				return reply.send({ success: true, data: parsed });
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);

	app.delete(
		"/aerodinamicas/:id",
		{
			schema: {
				tags: ["aerodinamicas"],
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
				await aerodinamicaService.deleteAerodinamica(id);
				return reply.send({
					success: true,
					message: "Aerodinâmica deletada com sucesso",
				});
			} catch (error) {
				return reply
					.status(500)
					.send({ success: false, error: (error as Error).message });
			}
		},
	);
}
