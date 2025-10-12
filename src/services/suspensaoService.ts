import prisma from "../lib/prisma.ts";
import { type SuspensaoType, suspensaoSchema } from "../schemas/suspensao-data.scheme.ts";

export const suspensaoService = {
	async createSuspensao(data: SuspensaoType) {
		const parsedData = suspensaoSchema.parse(data);
		return prisma.suspensao.create({ data: parsedData });
	},

	async getAllSuspensoes() {
		return prisma.suspensao.findMany({
			include: { carros: true },
		});
	},

	async getSuspensaoById(id: string) {
		return prisma.suspensao.findUnique({
			where: { id },
			include: { carros: true },
		});
	},

	async updateSuspensao(id: string, data: SuspensaoType) {
		const parsedData = suspensaoSchema.partial().parse(data);
		return prisma.suspensao.update({
			where: { id },
			data: parsedData,
		});
	},

	async deleteSuspensao(id: string) {
		return prisma.suspensao.delete({
			where: { id },
		});
	},
};