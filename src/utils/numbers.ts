export const parseNumber = (v: any): number | null => {
	const n = Number(String(v).replace(",", "."));
	return Number.isNaN(n) ? null : n;
};

export const clamp = (n: number, min: number, max: number) =>
	Math.min(Math.max(n, min), max);

export const scaleTo100 = (value: number, min: number, max: number): number => {
	if (value <= min) return 0;
	if (value >= max) return 100;
	return ((value - min) / (max - min)) * 100;
};

export const invertScaleTo100 = (
	value: number,
	min: number,
	max: number,
): number => 100 - scaleTo100(value, min, max);
