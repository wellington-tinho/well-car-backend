import prisma from "../lib/prisma.ts";
import { type RankingSystemType, rankingSystemSchema } from "../schemas/ranking-system-data.scheme.ts";

export const rankingSystemService = {
	async createRankingSystem(data: RankingSystemType) {
		const parsedData = rankingSystemSchema.parse(data);
		return prisma.rankingSystem.create({ data: parsedData });
	},

	async getAllRankingSystems() {
		return prisma.rankingSystem.findMany({
			include: { carRankings: true },
		});
	},

	async getRankingSystemById(id: string) {
		return prisma.rankingSystem.findUnique({
			where: { id },
			include: { carRankings: true },
		});
	},

	async updateRankingSystem(id: string, data: RankingSystemType) {
		const parsedData = rankingSystemSchema.partial().parse(data);
		return prisma.rankingSystem.update({
			where: { id },
			data: parsedData,
		});
	},

	async deleteRankingSystem(id: string) {
		return prisma.rankingSystem.delete({
			where: { id },
		});
	},
};