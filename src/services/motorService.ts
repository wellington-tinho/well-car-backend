import prisma from "../lib/prisma.ts";
import { type MotorType, motorSchema } from "../schemas/motor-data.scheme.ts";

export const motorService = {
	// CREATE
	async createMotor(data: MotorType) {
		const parsedData = motorSchema.parse(data);
		return prisma.motor.create({ data: parsedData });
	},

	// READ (todos)
	async getAllMotores() {
		return prisma.motor.findMany();
	},

	// READ (por ID)
	async getMotorById(id: string) {
		return prisma.motor.findUnique({
			where: { id },
		});
	},

	// UPDATE
	async updateMotor(id: string, data: MotorType) {
		const parsedData = motorSchema.partial().parse(data);
		return prisma.motor.update({
			where: { id },
			data: parsedData,
		});
	},

	// DELETE
	async deleteMotor(id: string) {
		return prisma.motor.delete({
			where: { id },
		});
	},
};
