import { RANKING_PROFILES } from "./rankingProfiles.ts";
import {
	scoreAutonomy,
	scoreBoot,
	scoreComfort,
	scoreConsumption,
	scoreDimensions,
	scoreInfotainment,
	scoreMaintenance,
	scorePerformance,
	scorePrice,
	scoreSafety,
} from "./scoring/index.ts";

// Type definition matching Prisma include structure
export type CarForRanking = {
	id: string;
	slug: string;
	nome: string;
	preco?: number | null;
	notaLeitor?: number | null;

	// Relations
	consumo?: { urbano?: string | null; rodoviario?: string | null } | null;
	motor?: {
		potenciaMaxima?: string | null;
		torqueMaximo?: string | null;
	} | null;
	desempenho?: {
		velocidadeMaxima?: string | null;
		aceleracao0100?: string | null;
	} | null;
	dimensoes?: {
		comprimento?: string | null;
		largura?: string | null;
		distanciaEntreEixos?: string | null;
		portaMalas?: string | null;
		tanqueCombustivel?: string | null;
	} | null;
	autonomia?: { urbana?: string | null; rodoviaria?: string | null } | null;

	// CSV strings
	seguranca?: string | null;
	conforto?: string | null;
	infotenimento?: string | null;
	revisoes?: string | null;

	// Costs
	ipva?: number | null;
	seguro?: number | null;
};

export type RankingResult = {
	profileId: string; // e.g. "geral", "familia"
	profileName: string;
	score: number; // 0..100
	rating: number; // 0..10
	breakdown: Record<string, number>;
};

export function computeCarRanking(car: CarForRanking): RankingResult[] {
	// 1. Calculate all base scores once
	const scores = {
		price: scorePrice(car.preco),
		consumption: scoreConsumption(car.consumo),
		performance: scorePerformance(car.desempenho, car.motor),
		safety: scoreSafety(car.seguranca),
		comfort: scoreComfort(car.conforto),
		infotainment: scoreInfotainment(car.infotenimento),
		dimensions: scoreDimensions(car.dimensoes),
		boot: scoreBoot(car.dimensoes),
		maintenance: scoreMaintenance(car.ipva, car.seguro, car.revisoes),
		autonomy: scoreAutonomy(
			car.autonomia,
			car.consumo,
			car.dimensoes?.tanqueCombustivel,
		),
	};

	// 2. Apply weights for each profile
	const results: RankingResult[] = [];

	for (const [profileId, profileDef] of Object.entries(RANKING_PROFILES)) {
		let totalScore = 0;
		let totalWeight = 0;
		const breakdown: Record<string, number> = {};

		for (const [criterion, weight] of Object.entries(profileDef.weights)) {
			const rawScore = scores[criterion as keyof typeof scores] ?? 50;

			// Special case: Urbano prefers smaller dimensions
			let finalScore = rawScore;
			if (profileId === "urbano" && criterion === "dimensions") {
				finalScore = 100 - rawScore;
			}

			breakdown[criterion] = finalScore;
			totalScore += finalScore * weight;
			totalWeight += weight;
		}

		const normalizedScore = totalWeight > 0 ? totalScore / totalWeight : 50;
		const rating = Number((normalizedScore / 10).toFixed(1)); // 0..10 with 1 decimal

		results.push({
			profileId,
			profileName: profileDef.name,
			score: normalizedScore,
			rating,
			breakdown,
		});
	}

	return results;
}
