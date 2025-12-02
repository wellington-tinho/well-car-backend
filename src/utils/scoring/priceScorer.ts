import { invertScaleTo100 } from "../numbers.ts";
import { REFERENCE_VALUES } from "../rankingProfiles.ts";

export function scorePrice(preco: number | null | undefined): number {
	if (preco == null) return 50;
	// Lower price is better
	const linearScore = invertScaleTo100(
		preco,
		REFERENCE_VALUES.price.min,
		REFERENCE_VALUES.price.max,
	);

	// Apply non-linear curve to penalize higher prices more
	// Factor 1.5 makes the curve steeper
	const curveFactor = 1.5;
	return Math.pow(linearScore / 100, curveFactor) * 100;
}
