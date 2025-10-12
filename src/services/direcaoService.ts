import prisma from "../lib/prisma.ts";
import { type DirecaoType, direcaoSchema } from "../schemas/direcao-data.scheme.ts";

export const direcaoService = {
	async createDirecao(data: DirecaoType) {
		const parsedData = direcaoSchema.parse(data);
		return prisma.direcao.create({ data: parsedData });
	},

	async getAllDirecoes() {
		return prisma.direcao.findMany({
			include: { carros: true },
		});
	},

	async getDirecaoById(id: string) {
		return prisma.direcao.findUnique({
			where: { id },
			include: { carros: true },
		});
	},

	async updateDirecao(id: string, data: DirecaoType) {
		const parsedData = direcaoSchema.partial().parse(data);
		return prisma.direcao.update({
			where: { id },
			data: parsedData,
		});
	},

	async deleteDirecao(id: string) {
		return prisma.direcao.delete({
			where: { id },
		});
	},
};