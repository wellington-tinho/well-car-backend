import prisma from "../lib/prisma.ts";
import { type DesempenhoType, desempenhoSchema } from "../schemas/desempenho-data.scheme.ts";

export const desempenhoService = {
	async createDesempenho(data: DesempenhoType) {
		const parsedData = desempenhoSchema.parse(data);
		return prisma.desempenho.create({ data: parsedData });
	},

	async getAllDesempenhos() {
		return prisma.desempenho.findMany({
			include: { carros: true },
		});
	},

	async getDesempenhoById(id: string) {
		return prisma.desempenho.findUnique({
			where: { id },
			include: { carros: true },
		});
	},

	async updateDesempenho(id: string, data: DesempenhoType) {
		const parsedData = desempenhoSchema.partial().parse(data);
		return prisma.desempenho.update({
			where: { id },
			data: parsedData,
		});
	},

	async deleteDesempenho(id: string) {
		return prisma.desempenho.delete({
			where: { id },
		});
	},
};