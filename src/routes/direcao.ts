import z from "zod";
import {
	type DirecaoType,
	direcaoResponseSchema,
	direcaoSchema,
} from "../schemas/direcao-data.scheme.ts";
import { direcaoService } from "../services/direcaoService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function direcaoRoutes(app: FastifyTypedInstance) {
	// CREATE - Criar uma nova direção
	app.post(
		"/direcoes",
		{
			schema: {
				tags: ["direcoes"],
				description: "Criar uma nova direção",
				body: direcaoSchema.omit({ id: true }),
				response: {
					201: z.object({
						success: z.boolean(),
						data: direcaoResponseSchema,
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
				const direcaoData = request.body as DirecaoType;
				const newDirecao = await direcaoService.createDirecao(direcaoData);

				return reply.status(201).send({
					success: true,
					data: newDirecao,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar todas as direções
	app.get(
		"/direcoes",
		{
			schema: {
				tags: ["direcoes"],
				description: "Buscar todas as direções",
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(direcaoResponseSchema),
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
				const direcoes = await direcaoService.getAllDirecoes();

				return reply.send({
					success: true,
					data: direcoes,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar direção por ID
	app.get(
		"/direcoes/:id",
		{
			schema: {
				tags: ["direcoes"],
				description: "Buscar direção por ID",
				params: z.object({
					id: z.uuid(),
				}),
				response: {
					200: z.object({
						success: z.boolean(),
						data: direcaoResponseSchema,
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
				const direcao = await direcaoService.getDirecaoById(id);

				if (!direcao) {
					return reply.status(404).send({
						success: false,
						error: "Direção não encontrada",
					});
				}

				return reply.send({
					success: true,
					data: direcao,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// UPDATE - Atualizar direção
	app.put(
		"/direcoes/:id",
		{
			schema: {
				tags: ["direcoes"],
				description: "Atualizar direção",
				params: z.object({
					id: z.uuid(),
				}),
				body: direcaoSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({
						success: z.boolean(),
						data: direcaoResponseSchema,
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
				const direcaoData = request.body as Partial<DirecaoType>;

				const updatedDirecao = await direcaoService.updateDirecao(
					id,
					direcaoData,
				);

				return reply.send({
					success: true,
					data: updatedDirecao,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// DELETE - Deletar direção
	app.delete(
		"/direcoes/:id",
		{
			schema: {
				tags: ["direcoes"],
				description: "Deletar direção",
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

				await direcaoService.deleteDirecao(id);

				return reply.send({
					success: true,
					message: "Direção deletada com sucesso",
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
