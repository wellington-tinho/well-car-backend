import z from "zod";
import {
	type SuspensaoType,
	suspensaoSchema,
} from "../schemas/suspensao-data.scheme.ts";
import { suspensaoService } from "../services/suspensaoService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function suspensaoRoutes(app: FastifyTypedInstance) {
	// CREATE - Criar uma nova suspensão
	app.post(
		"/suspensoes",
		{
			schema: {
				tags: ["suspensoes"],
				description: "Criar uma nova suspensão",
				body: suspensaoSchema.omit({ id: true }),
				response: {
					201: z.object({
						success: z.boolean(),
						data: suspensaoSchema,
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
				const suspensaoData = request.body as SuspensaoType;
				const newSuspensao =
					await suspensaoService.createSuspensao(suspensaoData);

				return reply.status(201).send({
					success: true,
					data: newSuspensao,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar todas as suspensões
	app.get(
		"/suspensoes",
		{
			schema: {
				tags: ["suspensoes"],
				description: "Buscar todas as suspensões",
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(suspensaoSchema),
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
				const suspensoes = await suspensaoService.getAllSuspensoes();

				return reply.send({
					success: true,
					data: suspensoes,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar suspensão por ID
	app.get(
		"/suspensoes/:id",
		{
			schema: {
				tags: ["suspensoes"],
				description: "Buscar suspensão por ID",
				params: z.object({
					id: z.uuid(),
				}),
				response: {
					200: z.object({
						success: z.boolean(),
						data: suspensaoSchema,
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
				const suspensao = await suspensaoService.getSuspensaoById(id);

				if (!suspensao) {
					return reply.status(404).send({
						success: false,
						error: "Suspensão não encontrada",
					});
				}

				return reply.send({
					success: true,
					data: suspensao,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// UPDATE - Atualizar suspensão
	app.put(
		"/suspensoes/:id",
		{
			schema: {
				tags: ["suspensoes"],
				description: "Atualizar suspensão",
				params: z.object({
					id: z.uuid(),
				}),
				body: suspensaoSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({
						success: z.boolean(),
						data: suspensaoSchema,
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
				const suspensaoData = request.body as Partial<SuspensaoType>;

				const updatedSuspensao = await suspensaoService.updateSuspensao(
					id,
					suspensaoData,
				);

				return reply.send({
					success: true,
					data: updatedSuspensao,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// DELETE - Deletar suspensão
	app.delete(
		"/suspensoes/:id",
		{
			schema: {
				tags: ["suspensoes"],
				description: "Deletar suspensão",
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

				await suspensaoService.deleteSuspensao(id);

				return reply.send({
					success: true,
					message: "Suspensão deletada com sucesso",
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
