import prisma from "../lib/prisma.ts";
import { type CarRankingType, carRankingSchema } from "../schemas/car-ranking-data.scheme.ts";

export const carRankingService = {
	async createCarRanking(data: CarRankingType) {
		const parsedData = carRankingSchema.parse(data);
		return prisma.carRanking.create({ data: parsedData });
	},

	async getAllCarRankings() {
		return prisma.carRanking.findMany({
			include: {
				car: true,
				rankingSystem: true,
			},
		});
	},

	async getCarRankingById(id: string) {
		return prisma.carRanking.findUnique({
			where: { id },
			include: {
				car: true,
				rankingSystem: true,
			},
		});
	},

	async updateCarRanking(id: string, data: CarRankingType) {
		const parsedData = carRankingSchema.partial().parse(data);
		return prisma.carRanking.update({
			where: { id },
			data: parsedData,
		});
	},

	async deleteCarRanking(id: string) {
		return prisma.carRanking.delete({
			where: { id },
		});
	},
};