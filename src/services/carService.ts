import prisma from "../lib/prisma.ts";
import {
	type CarType,
	type CarTypeUpdate,
	carSchema,
	carSchemaUpdate,
} from "../schemas/car-data.scheme.ts";
import { computeCarRanking } from "../utils/ranking.ts";

export const carService = {
	// CREATE
	async createCar(data: CarType) {
		console.log(data);
		const parsedData = carSchema.parse(data);

		console.log(parsedData);
		const car = await prisma.carro.create({ data: parsedData });

		// Gera o ranking para o carro recém-criado
		await this.generateRankingForCar(car.id);

		return car;
	},

	// Método auxiliar para gerar/atualizar ranking (pode ser usado para backfill)
	async generateRankingForCar(carId: string) {
		try {
			const car = await prisma.carro.findUnique({
				where: { id: carId },
				include: {
					consumo: true,
					motor: true,
					desempenho: true,
					dimensoes: true,
					autonomia: true,
				},
			});

			if (!car) return;

			// 1. Calcular Rankings
			const rankings = await computeCarRanking(car);

			// 2. Salvar cada perfil
			for (const result of rankings) {
				// Buscar ou criar o RankingSystem
				let rankingSystem = await prisma.rankingSystem.findFirst({
					where: { nome: result.profileName },
				});

				if (!rankingSystem) {
					rankingSystem = await prisma.rankingSystem.create({
						data: {
							nome: result.profileName,
							descricao: `Ranking automático perfil ${result.profileName}`,
						},
					});
				}

				// Criar ou Atualizar CarRanking
				const existingRanking = await prisma.carRanking.findUnique({
					where: {
						carId_rankingSystemId: {
							carId: car.id,
							rankingSystemId: rankingSystem.id,
						},
					},
				});

				if (existingRanking) {
					await prisma.carRanking.update({
						where: { id: existingRanking.id },
						data: {
							ratingSystem: result.score, // Salvando score 0-100 para precisão, ou poderia ser result.rating (0-10)
							comentario: JSON.stringify(result.breakdown), // Opcional: salvar breakdown no comentário para debug
						},
					});
				} else {
					await prisma.carRanking.create({
						data: {
							carId: car.id,
							rankingSystemId: rankingSystem.id,
							ratingSystem: result.score,
							comentario: JSON.stringify(result.breakdown),
						},
					});
				}
			}
		} catch (error) {
			console.error(`Erro ao gerar ranking para o carro ${carId}:`, error);
		}
	},

	// READ (todos)
	async getAllCars() {
		return prisma.carro.findMany({
			// include: {
			// 	motor: true,
			// 	transmissao: true,
			// },
		});
	},

	// READ (por ID)
	async getCarById(id: string) {
		return prisma.carro.findUnique({
			where: { id },
			include: {
				motor: true,
				transmissao: true,
			},
		});
	},

	// UPDATE
	async updateCar(id: string, data: CarTypeUpdate) {
		const parsedData = carSchemaUpdate.partial().parse(data);
		return prisma.carro.update({
			where: { id },
			data: parsedData,
		});
	},

	// DELETE
	async deleteCar(id: string) {
		return prisma.carro.delete({
			where: { id },
		});
	},
};
