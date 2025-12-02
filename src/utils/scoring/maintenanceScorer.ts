import { invertScaleTo100, parseNumber, scaleTo100 } from "../numbers.ts";
import { REFERENCE_VALUES } from "../rankingProfiles.ts";

export function scoreMaintenance(
	ipva: number | null | undefined,
	seguro: number | null | undefined,
	revisoes: string | null | undefined,
): number {
	let totalCost = 0;
	let count = 0;

	if (ipva != null) {
		totalCost += ipva;
		count++;
	}
	if (seguro != null) {
		totalCost += seguro;
		count++;
	}

	// Parse revisoes if possible (e.g. "R$ 3.000,00")
	if (revisoes) {
		const m = revisoes.match(/(\d{1,3}(\.?\d{3})*)/); // simple match for 3.000
		if (m) {
			const val = parseInt(m[0].replace(/\./g, ""), 10);
			if (!isNaN(val)) {
				totalCost += val;
				count++;
			}
		}
	}

	if (count === 0) return 50;
	const avgCost = totalCost / count;

	// Lower cost is better
	return invertScaleTo100(
		avgCost,
		REFERENCE_VALUES.segurosIPVA.min,
		REFERENCE_VALUES.segurosIPVA.max,
	);
}


