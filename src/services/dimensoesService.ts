import prisma from "../lib/prisma.ts";
import {
	type DimensoesType,
	dimensoesSchema,
} from "../schemas/dimensoes-data.scheme.ts";

export const dimensoesService = {
	async createDimensoes(data: DimensoesType) {
		const parsedData = dimensoesSchema.parse(data);
		return prisma.dimensoes.create({ data: parsedData });
	},

	async getAllDimensoes() {
		return prisma.dimensoes.findMany();
	},

	async getDimensoesById(id: string) {
		return prisma.dimensoes.findUnique({
			where: { id },
		});
	},

	async updateDimensoes(id: string, data: DimensoesType) {
		const parsedData = dimensoesSchema.partial().parse(data);
		return prisma.dimensoes.update({
			where: { id },
			data: parsedData,
		});
	},

	async deleteDimensoes(id: string) {
		return prisma.dimensoes.delete({
			where: { id },
		});
	},
};
