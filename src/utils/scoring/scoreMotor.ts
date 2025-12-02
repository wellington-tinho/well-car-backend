import { motorService } from "../../services/motorService.ts";
import { parseNumber, scaleTo100 } from "../numbers.ts";
import { REFERENCE_VALUES } from "../rankingProfiles.ts";

export async function scoreMotor(motorId: string | null | undefined): Promise<number> {
	if (!motorId) return 50;

	const motor = await motorService.getMotorById(motorId);
	if (!motor) return 50;

	// Use fields from Prisma model (which might be strings or numbers)
	// motorService returns Prisma model.
	// Assuming fields are strings based on schema.prisma
	const potencia = parseNumber(motor.potenciaMaxima) ?? 0;
	const torque = parseNumber(motor.torqueMaximo) ?? 0;

	const potScore = scaleTo100(potencia, REFERENCE_VALUES.potenciaCv.min, REFERENCE_VALUES.potenciaCv.max);
	const torqScore = scaleTo100(torque, REFERENCE_VALUES.torqueKgfm.min, REFERENCE_VALUES.torqueKgfm.max);

	return potScore * 0.6 + torqScore * 0.4;
}
