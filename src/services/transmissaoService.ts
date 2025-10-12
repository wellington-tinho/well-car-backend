import prisma from "../lib/prisma.ts";
import { type TransmissaoType, transmissaoSchema } from "../schemas/transmissao-data.scheme.ts";

export const transmissaoService = {
	// CREATE
	async createTransmissao(data: TransmissaoType) {
		const parsedData = transmissaoSchema.parse(data);
		return prisma.transmissao.create({ data: parsedData });
	},

	// READ (todos)
	async getAllTransmissoes() {
		return prisma.transmissao.findMany({
			include: {
				carros: true,
			},
		});
	},

	// READ (por ID)
	async getTransmissaoById(id: string) {
		return prisma.transmissao.findUnique({
			where: { id },
			include: {
				carros: true,
			},
		});
	},

	// UPDATE
	async updateTransmissao(id: string, data: TransmissaoType) {
		const parsedData = transmissaoSchema.partial().parse(data);
		return prisma.transmissao.update({
			where: { id },
			data: parsedData,
		});
	},

	// DELETE
	async deleteTransmissao(id: string) {
		return prisma.transmissao.delete({
			where: { id },
		});
	},
};