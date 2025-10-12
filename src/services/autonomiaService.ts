import prisma from "../lib/prisma.ts";
import { type AutonomiaType, autonomiaSchema } from "../schemas/autonomia-data.scheme.ts";

export const autonomiaService = {
	async createAutonomia(data: AutonomiaType) {
		const parsedData = autonomiaSchema.parse(data);
		return prisma.autonomia.create({ data: parsedData });
	},

	async getAllAutonomias() {
		return prisma.autonomia.findMany({
			include: { carros: true },
		});
	},

	async getAutonomiaById(id: string) {
		return prisma.autonomia.findUnique({
			where: { id },
			include: { carros: true },
		});
	},

	async updateAutonomia(id: string, data: AutonomiaType) {
		const parsedData = autonomiaSchema.partial().parse(data);
		return prisma.autonomia.update({
			where: { id },
			data: parsedData,
		});
	},

	async deleteAutonomia(id: string) {
		return prisma.autonomia.delete({
			where: { id },
		});
	},
};