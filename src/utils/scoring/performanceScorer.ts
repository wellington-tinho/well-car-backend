import { invertScaleTo100, parseNumber, scaleTo100 } from "../numbers.ts";
import { REFERENCE_VALUES } from "../rankingProfiles.ts";

export function scorePerformance(
	desempenho:
		| { velocidadeMaxima?: string | null; aceleracao0100?: string | null }
		| null
		| undefined,
	motor:
		| { potenciaMaxima?: string | null; torqueMaximo?: string | null }
		| null
		| undefined,
): number {
	// 1. Speed & Acceleration
	const vm = parseNumber(desempenho?.velocidadeMaxima);
	const acc = parseNumber(desempenho?.aceleracao0100);

	const vmScore = vm
		? scaleTo100(
				vm,
				REFERENCE_VALUES.velocidadeMaxima.min,
				REFERENCE_VALUES.velocidadeMaxima.max,
			)
		: 50;
	const accScore = acc
		? invertScaleTo100(
				acc,
				REFERENCE_VALUES.aceleracao0100.min,
				REFERENCE_VALUES.aceleracao0100.max,
			)
		: 50;

	// 2. Power & Torque (Auxiliary)
	// Extract numbers from strings like "150 cv" or "20 kgfm"
	const power = parsePower(motor?.potenciaMaxima);
	const torque = parseTorque(motor?.torqueMaximo);

	const powerScore = power
		? scaleTo100(
				power,
				REFERENCE_VALUES.potenciaCv.min,
				REFERENCE_VALUES.potenciaCv.max,
			)
		: 50;
	const torqueScore = torque
		? scaleTo100(
				torque,
				REFERENCE_VALUES.torqueKgfm.min,
				REFERENCE_VALUES.torqueKgfm.max,
			)
		: 50;

	// Weighted combination
	// Performance (speed/acc) is main indicator (60%)
	// Engine specs (power/torque) is secondary (40%)
	const realPerf = vmScore * 0.4 + accScore * 0.6; // Acceleration is more felt than max speed
	const engineSpec = powerScore * 0.5 + torqueScore * 0.5;

	return realPerf * 0.6 + engineSpec * 0.4;
}

function parsePower(val: string | null | undefined): number | null {
	if (!val) return null;
	// "150 cv" -> 150
	const m = val.match(/(\d+)/);
	return m ? parseInt(m[1], 10) : null;
}

function parseTorque(val: string | null | undefined): number | null {
	if (!val) return null;
	// "20,5 kgfm" -> 20.5
	const normalized = val.replace(",", ".");
	const m = normalized.match(/(\d+(\.\d+)?)/);
	return m ? parseFloat(m[1]) : null;
}
