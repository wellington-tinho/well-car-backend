import prisma from "../lib/prisma.ts";
import {
	type ConsumoType,
	consumoSchema,
} from "../schemas/consumo-data.scheme.ts";

export const consumoService = {
	async createConsumo(data: ConsumoType) {
		const parsedData = consumoSchema.parse(data);
		return prisma.consumo.create({ data: parsedData });
	},

	async getAllConsumos() {
		return prisma.consumo.findMany();
	},

	async getConsumoById(id: string) {
		return prisma.consumo.findUnique({
			where: { id },
		});
	},

	async updateConsumo(id: string, data: ConsumoType) {
		const parsedData = consumoSchema.partial().parse(data);
		return prisma.consumo.update({
			where: { id },
			data: parsedData,
		});
	},

	async deleteConsumo(id: string) {
		return prisma.consumo.delete({
			where: { id },
		});
	},
};
