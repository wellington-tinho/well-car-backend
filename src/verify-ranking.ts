import prisma from "./lib/prisma.ts";
import { carService } from "./services/carService.ts";
import { carRankingService } from "./services/carRankingService.ts";

async function run() {
	try {
		console.log("--- Atualizando Rankings para todos os carros existentes ---");
		const allCars = await prisma.carro.findMany();
		console.log(`Encontrados ${allCars.length} carros.`);
		console.log(`test ${allCars[0].nome}`);
		for (const car of allCars) {
			// console.log(`Gerando ranking para: ${car.nome} (${car.id})`);
			await carService.generateRankingForCar(car.id);
		}
		console.log("--- Atualização concluída ---");

		console.log("--- Verificando Top 10 Rankings ---");
		const rankings = await carRankingService.getAllCarRankings();
		
		console.log(`Rankings retornados: ${rankings.length}`);
		
		// Verificar ordem
		let lastScore = Number.POSITIVE_INFINITY;
		let isOrdered = true;
		for (const r of rankings) {
			if ((r.ratingSystem || 0) > lastScore) {
				isOrdered = false;
				console.error(`ERRO: Ordem incorreta. ${r.ratingSystem} > ${lastScore}`);
			}
			lastScore = r.ratingSystem || 0;
			console.log(`[${r.ratingSystem?.toFixed(2)}] ${r.car.nome}`);
		}

		if (isOrdered) {
			console.log("SUCESSO: Rankings ordenados corretamente.");
		}
	} catch (e) {
		console.error(e);
	}
}

run();
