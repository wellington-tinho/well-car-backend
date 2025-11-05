import z from "zod";

import {
	type PneusType,
	pneusResponseSchema,
	pneusSchema,
} from "../schemas/pneus-data.scheme.ts";
import { pneusService } from "../services/pneusService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function pneusRoutes(app: FastifyTypedInstance) {
	// CREATE - Criar um novo conjunto de pneus
	app.post(
		"/pneus",
		{
			schema: {
				tags: ["pneus"],
				description: "Criar um novo conjunto de pneus",
				body: pneusSchema.omit({ id: true }),
				response: {
					201: z.object({
						success: z.boolean(),
						data: pneusResponseSchema,
					}),
					400: z.object({
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
				const pneusData = request.body as PneusType;
				const newPneus = await pneusService.createPneus(pneusData);
				console.log(newPneus);

				return reply.status(201).send({
					success: true,
					data: newPneus,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar todos os conjuntos de pneus
	app.get(
		"/pneus",
		{
			schema: {
				tags: ["pneus"],
				description: "Buscar todos os conjuntos de pneus",
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(pneusResponseSchema),
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
				const pneus = await pneusService.getAllPneus();

				return reply.send({
					success: true,
					data: pneus,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar conjunto de pneus por ID
	app.get(
		"/pneus/:id",
		{
			schema: {
				tags: ["pneus"],
				description: "Buscar conjunto de pneus por ID",
				params: z.object({
					id: z.uuid(),
				}),
				response: {
					200: z.object({
						success: z.boolean(),
						data: pneusResponseSchema,
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
				const pneus = await pneusService.getPneusById(id);

				if (!pneus) {
					return reply.status(404).send({
						success: false,
						error: "Conjunto de pneus não encontrado",
					});
				}

				return reply.send({
					success: true,
					data: pneus,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// UPDATE - Atualizar conjunto de pneus
	app.put(
		"/pneus/:id",
		{
			schema: {
				tags: ["pneus"],
				description: "Atualizar conjunto de pneus",
				params: z.object({
					id: z.uuid(),
				}),
				body: pneusSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({
						success: z.boolean(),
						data: pneusResponseSchema,
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
				const pneusData = request.body as Partial<PneusType>;

				const updatedPneus = await pneusService.updatePneus(id, pneusData);

				return reply.send({
					success: true,
					data: updatedPneus,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// DELETE - Deletar conjunto de pneus
	app.delete(
		"/pneus/:id",
		{
			schema: {
				tags: ["pneus"],
				description: "Deletar conjunto de pneus",
				params: z.object({
					id: z.uuid(),
				}),
				response: {
					200: z.object({
						success: z.boolean(),
						message: z.string(),
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

				await pneusService.deletePneus(id);

				return reply.send({
					success: true,
					message: "Conjunto de pneus deletado com sucesso",
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);
}
