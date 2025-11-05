import { sql } from "../../infra/client.ts";
import type { FastifyTypedInstance } from "../types.ts";
import aerodinamicaRoutes from "./aerodinamica.ts";
import autonomiaRoutes from "./autonomia.ts";
import carRoutes from "./car.ts";
import carRankingRoutes from "./carRanking.ts";
import consumoRoutes from "./consumo.ts";
import desempenhoRoutes from "./desempenho.ts";
import dimensoesRoutes from "./dimensoes.ts";
import direcaoRoutes from "./direcao.ts";
import freiosRoutes from "./freios.ts";
import healthRoutes from "./health.ts";
import motorRoutes from "./motor.ts";
import pneusRoutes from "./pneus.ts";
import rankingSystemRoutes from "./rankingSystem.ts";
import suspensaoRoutes from "./suspensao.ts";
import transmissaoRoutes from "./transmissao.ts";

export async function routes(app: FastifyTypedInstance) {
	// Health check routes
	await healthRoutes(app);

	// Main entity routes
	await carRoutes(app);
	await motorRoutes(app);
	await transmissaoRoutes(app);
	await suspensaoRoutes(app);
	await freiosRoutes(app);
	await direcaoRoutes(app);
	await pneusRoutes(app);
	await dimensoesRoutes(app);
	await aerodinamicaRoutes(app);
	await desempenhoRoutes(app);
	await consumoRoutes(app);
	await autonomiaRoutes(app);

	// Ranking system routes
	await rankingSystemRoutes(app);
	await carRankingRoutes(app);
}
