import z from "zod";
import { type MotorType, motorSchema } from "../schemas/motor-data.scheme.ts";
import { motorService } from "../services/motorService.ts";

import type { FastifyTypedInstance } from "../types.ts";

export default async function motorRoutes(app: FastifyTypedInstance) {
	// CREATE - Criar um novo motor
	app.post(
		"/motores",
		{
			schema: {
				tags: ["motores"],
				description: "Criar um novo motor",
				body: motorSchema.omit({ id: true }),
				response: {
					201: z.object({
						success: z.boolean(),
						data: motorSchema,
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
				const motorData = request.body as MotorType;
				const newMotor = await motorService.createMotor(motorData);

				return reply.status(201).send({
					success: true,
					// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do MotorType não aceita null
					data: newMotor,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar todos os motores
	app.get(
		"/motores",
		{
			schema: {
				tags: ["motores"],
				description: "Buscar todos os motores",
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(motorSchema),
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
				const motores = await motorService.getAllMotores();

				return reply.send({
					success: true,
					// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do MotorType não aceita null
					data: motores,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar motor por ID
	app.get(
		"/motores/:id",
		{
			schema: {
				tags: ["motores"],
				description: "Buscar motor por ID",
				params: z.object({
					id: z.uuid(),
				}),
				response: {
					200: z.object({
						success: z.boolean(),
						data: motorSchema,
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
				const motor = await motorService.getMotorById(id);

				if (!motor) {
					return reply.status(404).send({
						success: false,
						error: "Motor não encontrado",
					});
				}

				return reply.send({
					success: true,
					// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do MotorType não aceita null
					data: motor,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// UPDATE - Atualizar motor
	app.put(
		"/motores/:id",
		{
			schema: {
				tags: ["motores"],
				description: "Atualizar motor",
				params: z.object({
					id: z.uuid(),
				}),
				body: motorSchema.omit({ id: true }).partial(),
				response: {
					200: z.object({
						success: z.boolean(),
						data: motorSchema,
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
				const motorData = request.body as Partial<MotorType>;

				const updatedMotor = await motorService.updateMotor(id, motorData);

				return reply.send({
					success: true,
					// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do MotorType não aceita null
					data: updatedMotor,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// DELETE - Deletar motor
	app.delete(
		"/motores/:id",
		{
			schema: {
				tags: ["motores"],
				description: "Deletar motor",
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

				await motorService.deleteMotor(id);

				return reply.send({
					success: true,
					message: "Motor deletado com sucesso",
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
