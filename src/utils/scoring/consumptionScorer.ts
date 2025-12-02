import { parseNumber, scaleTo100 } from "../numbers.ts";
import { REFERENCE_VALUES } from "../rankingProfiles.ts";

export function scoreConsumption(
	consumo:
		| { urbano?: string | null; rodoviario?: string | null }
		| null
		| undefined,
): number {
	if (!consumo) return 50;

	const urbano = parseNumber(consumo.urbano);
	const rodoviario = parseNumber(consumo.rodoviario);

	if (urbano == null && rodoviario == null) return 50;

	// Weighted average: 40% urban, 60% highway if both exist
	// Or just take the one that exists
	let val = 0;
	if (urbano != null && rodoviario != null) {
		val = urbano * 0.4 + rodoviario * 0.6;
	} else {
		val = (urbano ?? rodoviario) || 0;
	}

	// Higher km/l is better
	return scaleTo100(
		val,
		REFERENCE_VALUES.consumptionKmL.min,
		REFERENCE_VALUES.consumptionKmL.max,
	);
}
