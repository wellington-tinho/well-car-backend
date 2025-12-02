import type { CarType } from "../../schemas/car-data.scheme.ts";
import { scoreDimensions } from "./scoreDimensions.ts";
import { scorePerformance } from "./scorePerformance.ts";

export function scoreFinal(car: CarType): number {
	const dim = scoreDimensions(car.dimensoes, car.porte);
	const perf = scorePerformance(car.desempenho, car.motor);

	return Number((dim * 0.4 + perf * 0.6).toFixed(2));
}
