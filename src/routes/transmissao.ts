import z from "zod";
import {
	type TransmissaoType,
	transmissaoSchema,
} from "../schemas/transmissao-data.scheme.ts";
import { transmissaoService } from "../services/transmissaoService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function transmissaoRoutes(app: FastifyTypedInstance) {
	// CREATE - Criar uma nova transmissão
	app.post(
		"/transmissoes",
		{
			schema: {
				tags: ["transmissoes"],
				description: "Criar uma nova transmissão",
				body: transmissaoSchema.omit({ id: true }),
				response: {
					201: z.object({
						success: z.boolean(),
						data: transmissaoSchema,
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
				const transmissaoData = request.body as TransmissaoType;
				const newTransmissao =
					await transmissaoService.createTransmissao(transmissaoData);

				return reply.status(201).send({
					success: true,
					data: newTransmissao,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar todas as transmissões
	app.get(
		"/transmissoes",
		{
			schema: {
				tags: ["transmissoes"],
				description: "Buscar todas as transmissões",
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(transmissaoSchema),
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
				const transmissoes = await transmissaoService.getAllTransmissoes();

				return reply.send({
					success: true,
					data: transmissoes,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar transmissão por ID
	app.get(
		"/transmissoes/:id",
		{
			schema: {
				tags: ["transmissoes"],
				description: "Buscar transmissão por ID",
				params: z.object({
					id: z.uuid(),
				}),
				response: {
					200: z.object({
						success: z.boolean(),
						data: transmissaoSchema,
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
				const transmissao = await transmissaoService.getTransmissaoById(id);

				if (!transmissao) {
					return reply.status(404).send({
						success: false,
						error: "Transmissão não encontrada",
					});
				}

				return reply.send({
					success: true,
					data: transmissao,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// UPDATE - Atualizar transmissão
	app.put(
		"/transmissoes/:id",
		{
			schema: {
				tags: ["transmissoes"],
				description: "Atualizar transmissão",
				params: z.object({
					id: z.uuid(),
				}),
				body: transmissaoSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({
						success: z.boolean(),
						data: transmissaoSchema,
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
				const transmissaoData = request.body as Partial<TransmissaoType>;

				const updatedTransmissao = await transmissaoService.updateTransmissao(
					id,
					transmissaoData,
				);

				return reply.send({
					success: true,
					data: updatedTransmissao,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// DELETE - Deletar transmissão
	app.delete(
		"/transmissoes/:id",
		{
			schema: {
				tags: ["transmissoes"],
				description: "Deletar transmissão",
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

				await transmissaoService.deleteTransmissao(id);

				return reply.send({
					success: true,
					message: "Transmissão deletada com sucesso",
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
