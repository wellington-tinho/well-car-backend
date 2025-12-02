import { scaleTo100 } from "../numbers.ts";

export function scoreComfort(conforto: string | null | undefined): number {
	if (!conforto) return 0;
	const items = conforto.split(",").filter((s) => s.trim().length > 0);
	// Assume 30 items is max
	return scaleTo100(items.length, 0, 30);
}

export function scoreInfotainment(
	infotenimento: string | null | undefined,
): number {
	if (!infotenimento) return 0;
	const items = infotenimento.split(",").filter((s) => s.trim().length > 0);
	// Assume 20 items is max
	return scaleTo100(items.length, 0, 20);
}
