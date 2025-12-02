import { autonomiaService } from "../../services/autonomiaService.ts";
import { consumoService } from "../../services/consumoService.ts";
import { dimensoesService } from "../../services/dimensoesService.ts";
import { parseNumber, scaleTo100 } from "../numbers.ts";
import { REFERENCE_VALUES } from "../rankingProfiles.ts";

export async function scoreAutonomyFromIds(
	autonomiaId: string | null | undefined,
	consumoId: string | null | undefined,
	dimensoesId: string | null | undefined,
): Promise<number> {
	// 1. Try explicit autonomy fields
	if (autonomiaId) {
		const autonomia = await autonomiaService.getAutonomiaById(autonomiaId);
		if (autonomia) {
			const urb = parseNumber(autonomia.urbana);
			const rod = parseNumber(autonomia.rodoviaria);

			if (urb || rod) {
				const avg = ((urb ?? 0) + (rod ?? 0)) / ((urb ? 1 : 0) + (rod ? 1 : 0));
				return scaleTo100(
					avg,
					REFERENCE_VALUES.autonomiaKm.min,
					REFERENCE_VALUES.autonomiaKm.max,
				);
			}
		}
	}

	// 2. Estimate from consumption * tank
	if (consumoId && dimensoesId) {
		const [consumo, dimensoes] = await Promise.all([
			consumoService.getConsumoById(consumoId),
			dimensoesService.getDimensoesById(dimensoesId),
		]);

		if (consumo && dimensoes) {
			const tankL = parseNumber(dimensoes.tanqueCombustivel);
			const consRod = parseNumber(consumo.rodoviario);

			if (tankL && consRod) {
				const est = tankL * consRod;
				return scaleTo100(
					est,
					REFERENCE_VALUES.autonomiaKm.min,
					REFERENCE_VALUES.autonomiaKm.max,
				);
			}
		}
	}

	return 50;
}

export function scoreAutonomy(
	autonomia:
		| { urbana?: string | null; rodoviaria?: string | null }
		| null
		| undefined,
	consumo: { rodoviario?: string | null } | null | undefined,
	tanque: string | null | undefined,
): number {
	// 1. Try explicit autonomy fields
	const urb = parseNumber(autonomia?.urbana);
	const rod = parseNumber(autonomia?.rodoviaria);

	if (urb || rod) {
		const avg = ((urb ?? 0) + (rod ?? 0)) / ((urb ? 1 : 0) + (rod ? 1 : 0));
		return scaleTo100(
			avg,
			REFERENCE_VALUES.autonomiaKm.min,
			REFERENCE_VALUES.autonomiaKm.max,
		);
	}

	// 2. Estimate from consumption * tank
	const tankL = parseNumber(tanque);
	const consRod = parseNumber(consumo?.rodoviario);

	if (tankL && consRod) {
		const est = tankL * consRod;
		return scaleTo100(
			est,
			REFERENCE_VALUES.autonomiaKm.min,
			REFERENCE_VALUES.autonomiaKm.max,
		);
	}

	return 50;
}
