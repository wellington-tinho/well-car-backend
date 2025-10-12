import { sql } from "../../infra/client.ts";
import type { FastifyTypedInstance } from "../types.ts";
import healthRoutes from "./health.ts";
import carRoutes from "./car.ts";
import motorRoutes from "./motor.ts";
import transmissaoRoutes from "./transmissao.ts";
import suspensaoRoutes from "./suspensao.ts";
import freiosRoutes from "./freios.ts";
import direcaoRoutes from "./direcao.ts";
import pneusRoutes from "./pneus.ts";
import dimensoesRoutes from "./dimensoes.ts";
import aerodinamicaRoutes from "./aerodinamica.ts";
import desempenhoRoutes from "./desempenho.ts";
import consumoRoutes from "./consumo.ts";
import autonomiaRoutes from "./autonomia.ts";
import rankingSystemRoutes from "./rankingSystem.ts";
import carRankingRoutes from "./carRanking.ts";

export async function routes(app: FastifyTypedInstance) {
	const result = await sql`
      SELECT 1 + 1 as sum;
  `;
	console.log(result);
	
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
