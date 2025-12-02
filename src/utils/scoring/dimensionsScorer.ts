import { parseNumber, scaleTo100 } from "../numbers.ts";
import { REFERENCE_VALUES } from "../rankingProfiles.ts";

export function scoreDimensions(
	dimensoes:
		| {
				comprimento?: string | null;
				largura?: string | null;
				distanciaEntreEixos?: string | null;
		  }
		| null
		| undefined,
): number {
	if (!dimensoes) return 50;

	const width = parseNumber(dimensoes.largura);
	const wheelbase = parseNumber(dimensoes.distanciaEntreEixos);

	// Metric: Wheelbase (60%) + Width (40%)
	const metric = (wheelbase ?? 0) * 0.6 + (width ?? 0) * 0.4;

	return scaleTo100(
		metric,
		REFERENCE_VALUES.dimensionsMetric.min,
		REFERENCE_VALUES.dimensionsMetric.max,
	);
}

export function scoreBoot(
	dimensoes: { portaMalas?: string | null } | null | undefined,
): number {
	if (!dimensoes) return 50;
	const boot = parseNumber(dimensoes.portaMalas);
	if (!boot) return 50;
	return scaleTo100(
		boot,
		REFERENCE_VALUES.bootLitros.min,
		REFERENCE_VALUES.bootLitros.max,
	);
}
