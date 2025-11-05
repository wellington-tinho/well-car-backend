import z from "zod";
import {
	type FreiosType,
	freiosResponseSchema,
	freiosSchema,
} from "../schemas/freios-data.scheme.ts";
import { freiosService } from "../services/freiosService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function freiosRoutes(app: FastifyTypedInstance) {
	// CREATE - Criar um novo sistema de freios
	app.post(
		"/freios",
		{
			schema: {
				tags: ["freios"],
				description: "Criar um novo sistema de freios",
				body: freiosSchema.omit({ id: true }),
				response: {
					201: z.object({
						success: z.boolean(),
						data: freiosResponseSchema,
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
				const freiosData = request.body as FreiosType;
				const newFreios = await freiosService.createFreios(freiosData);

				return reply.status(201).send({
					success: true,
					data: newFreios,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar todos os sistemas de freios
	app.get(
		"/freios",
		{
			schema: {
				tags: ["freios"],
				description: "Buscar todos os sistemas de freios",
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(freiosResponseSchema),
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
				const freios = await freiosService.getAllFreios();

				return reply.send({
					success: true,
					data: freios,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar sistema de freios por ID
	app.get(
		"/freios/:id",
		{
			schema: {
				tags: ["freios"],
				description: "Buscar sistema de freios por ID",
				params: z.object({
					id: z.uuid(),
				}),
				response: {
					200: z.object({
						success: z.boolean(),
						data: freiosResponseSchema,
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
				const freios = await freiosService.getFreiosById(id);

				if (!freios) {
					return reply.status(404).send({
						success: false,
						error: "Sistema de freios não encontrado",
					});
				}

				return reply.send({
					success: true,
					data: freios,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// UPDATE - Atualizar sistema de freios
	app.put(
		"/freios/:id",
		{
			schema: {
				tags: ["freios"],
				description: "Atualizar sistema de freios",
				params: z.object({
					id: z.uuid(),
				}),
				body: freiosSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({
						success: z.boolean(),
						data: freiosResponseSchema,
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
				const freiosData = request.body as Partial<FreiosType>;

				const updatedFreios = await freiosService.updateFreios(id, freiosData);

				return reply.send({
					success: true,
					data: updatedFreios,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// DELETE - Deletar sistema de freios
	app.delete(
		"/freios/:id",
		{
			schema: {
				tags: ["freios"],
				description: "Deletar sistema de freios",
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

				await freiosService.deleteFreios(id);

				return reply.send({
					success: true,
					message: "Sistema de freios deletado com sucesso",
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
