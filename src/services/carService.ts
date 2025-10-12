import prisma from "../lib/prisma.ts";
import {
	type CarType,
	type CarTypeUpdate,
	carSchema,
	carSchemaUpdate,
} from "../schemas/car-data.scheme.ts";

export const carService = {
	// CREATE
	async createCar(data: CarType) {
		console.log(data);
		const parsedData = carSchema.parse(data);

		console.log(parsedData);
		return prisma.carro.create({ data: parsedData });
	},

	// READ (todos)
	async getAllCars() {
		return prisma.carro.findMany({
			include: {
				motor: true,
				transmissao: true,
			},
		});
	},

	// READ (por ID)
	async getCarById(id: string) {
		return prisma.carro.findUnique({
			where: { id },
			include: {
				motor: true,
				transmissao: true,
			},
		});
	},

	// UPDATE
	async updateCar(id: string, data: CarTypeUpdate) {
		const parsedData = carSchemaUpdate.partial().parse(data);
		return prisma.carro.update({
			where: { id },
			data: parsedData,
		});
	},

	// DELETE
	async deleteCar(id: string) {
		return prisma.carro.delete({
			where: { id },
		});
	},
};
