import prisma from "../lib/prisma.ts";
import { type PneusType, pneusSchema } from "../schemas/pneus-data.scheme.ts";

export const pneusService = {
	async createPneus(data: PneusType) {
		const parsedData = pneusSchema.parse(data);
		return prisma.pneus.create({ data: parsedData });
	},

	async getAllPneus() {
		return prisma.pneus.findMany({
			include: { carros: true },
		});
	},

	async getPneusById(id: string) {
		return prisma.pneus.findUnique({
			where: { id },
			include: { carros: true },
		});
	},

	async updatePneus(id: string, data: PneusType) {
		const parsedData = pneusSchema.partial().parse(data);
		return prisma.pneus.update({
			where: { id },
			data: parsedData,
		});
	},

	async deletePneus(id: string) {
		return prisma.pneus.delete({
			where: { id },
		});
	},
};