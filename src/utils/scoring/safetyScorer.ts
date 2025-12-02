import { scaleTo100 } from "../numbers.ts";

export function scoreSafety(seguranca: string | null | undefined): number {
	if (!seguranca) return 0;
	const items = seguranca.split(",").filter((s) => s.trim().length > 0);
	// Assume 30 items is "max safety" for normalization
	return scaleTo100(items.length, 0, 30);
}
