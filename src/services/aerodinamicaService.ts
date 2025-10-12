import prisma from "../lib/prisma.ts";
import { type AerodinamicaType, aerodinamicaSchema } from "../schemas/aerodinamica-data.scheme.ts";

export const aerodinamicaService = {
	async createAerodinamica(data: AerodinamicaType) {
		const parsedData = aerodinamicaSchema.parse(data);
		return prisma.aerodinamica.create({ data: parsedData });
	},

	async getAllAerodinamicas() {
		return prisma.aerodinamica.findMany({
			include: { carros: true },
		});
	},

	async getAerodinamicaById(id: string) {
		return prisma.aerodinamica.findUnique({
			where: { id },
			include: { carros: true },
		});
	},

	async updateAerodinamica(id: string, data: AerodinamicaType) {
		const parsedData = aerodinamicaSchema.partial().parse(data);
		return prisma.aerodinamica.update({
			where: { id },
			data: parsedData,
		});
	},

	async deleteAerodinamica(id: string) {
		return prisma.aerodinamica.delete({
			where: { id },
		});
	},
};