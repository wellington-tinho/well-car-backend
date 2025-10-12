import z, { ZodError } from "zod";
import {
	type CarType,
	carSchema,
	carSchemaUpdate,
} from "../schemas/car-data.scheme.ts";
import { carService } from "../services/carService.ts";
import type { FastifyTypedInstance } from "../types.ts";

export default async function carRoutes(app: FastifyTypedInstance) {
	// CREATE - Criar um novo carro
	app.post(
		"/cars",
		{
			schema: {
				tags: ["cars"],
				description: "Criar um novo carro",
				body: carSchema.omit({ id: true, createdAt: true, updatedAt: true }),
				response: {
					201: z.object({
						success: z.boolean(),
						data: carSchema,
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
				const carData = request.body as CarType;
				const newCar = await carService.createCar(carData);

				return reply.status(201).send({
					success: true,
					// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do CarType não aceita null
					data: newCar,
				});
			} catch (error) {
				if (error instanceof ZodError) {
					return reply.status(400).send({
						success: false,
						error: error.message,
					});
				}

				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar todos os carros
	app.get(
		"/cars",
		{
			schema: {
				tags: ["cars"],
				description: "Buscar todos os carros",
				response: {
					200: z.object({
						success: z.boolean(),
						data: z.array(carSchema),
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
				const cars = await carService.getAllCars();

				return reply.send({
					success: true,
					// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do CarType não aceita null
					data: cars,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// READ - Buscar carro por ID
	app.get(
		"/cars/:id",
		{
			schema: {
				tags: ["cars"],
				description: "Buscar carro por ID",
				params: z.object({
					id: z.uuid(),
				}),
				response: {
					200: z.object({
						success: z.boolean(),
						data: carSchema,
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
				const car = await carService.getCarById(id);

				if (!car) {
					return reply.status(404).send({
						success: false,
						error: "Carro não encontrado",
					});
				}

				return reply.send({
					success: true,
					// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do CarType não aceita null
					data: car,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// UPDATE - Atualizar carro
	app.put(
		"/cars/:id",
		{
			schema: {
				tags: ["cars"],
				description: "Atualizar carro",
				params: z.object({
					id: z.uuid(),
				}),
				body: carSchemaUpdate,
				response: {
					200: z.object({
						success: z.boolean(),
						data: carSchema,
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

				// 🔹 Valida o corpo da requisição antes de continuar
				const parsedBody = carSchemaUpdate.parse({
					...request.body,
					id,
				});

				const updatedCar = await carService.updateCar(id, parsedBody);

				return reply.send({
					success: true,
					// @ts-expect-error:  Prisma pode retornar null em campos opcionais, mas o type do CarType não aceita null
					data: updatedCar,
				});
			} catch (error) {
				return reply.status(500).send({
					success: false,
					error: (error as Error).message,
				});
			}
		},
	);

	// DELETE - Deletar carro
	app.delete(
		"/cars/:id",
		{
			schema: {
				tags: ["cars"],
				description: "Deletar carro",
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

				await carService.deleteCar(id);

				return reply.send({
					success: true,
					message: "Carro deletado com sucesso",
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
