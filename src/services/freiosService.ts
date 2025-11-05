import prisma from "../lib/prisma.ts";
import {
	type FreiosType,
	freiosSchema,
} from "../schemas/freios-data.scheme.ts";

export const freiosService = {
	async createFreios(data: FreiosType) {
		const parsedData = freiosSchema.parse(data);
		return prisma.freios.create({ data: parsedData });
	},

	async getAllFreios() {
		return prisma.freios.findMany();
	},

	async getFreiosById(id: string) {
		return prisma.freios.findUnique({
			where: { id },
		});
	},

	async updateFreios(id: string, data: FreiosType) {
		const parsedData = freiosSchema.partial().parse(data);
		return prisma.freios.update({
			where: { id },
			data: parsedData,
		});
	},

	async deleteFreios(id: string) {
		return prisma.freios.delete({
			where: { id },
		});
	},
};
