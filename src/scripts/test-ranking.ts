import { type CarForRanking, computeCarRanking } from "../utils/ranking.ts";

const mockCar: CarForRanking = {
	id: "1",
	slug: "teste-carro",
	nome: "Teste Carro",
	preco: 80000, // Cheap-ish
	notaLeitor: 8.5,
	consumo: {
		urbano: "12,5",
		rodoviario: "15,0",
	},
	motor: {
		potenciaMaxima: "120 cv",
		torqueMaximo: "18 kgfm",
	},
	desempenho: {
		velocidadeMaxima: "190 km/h",
		aceleracao0100: "10,5 s",
	},
	dimensoes: {
		comprimento: "4000",
		largura: "1750",
		distanciaEntreEixos: "2550",
		portaMalas: "300",
		tanqueCombustivel: "50",
	},
	autonomia: {
		urbana: "600",
		rodoviaria: "750",
	},
	seguranca: "Airbag duplo, ABS, Controle de estabilidade",
	conforto: "Ar condicionado, Direção elétrica, Vidros elétricos",
	infotenimento: "Rádio, Bluetooth, USB",
	revisoes: "R$ 3.000,00",
	ipva: 2000,
	seguro: 2500,
};

const mockLuxuryCar: CarForRanking = {
	...mockCar,
	id: "2",
	nome: "Luxo Carro",
	preco: 300000,
	motor: { potenciaMaxima: "300 cv", torqueMaximo: "40 kgfm" },
	conforto: "Ar digital, Couro, Teto solar, Massageador, Aquecimento",
	infotenimento:
		"Multimídia 10pol, GPS, Apple CarPlay, Android Auto, Som Premium",
	seguranca: "6 Airbags, ABS, EBD, ACC, Lane Assist, Blind Spot, Camera 360",
	dimensoes: { ...mockCar.dimensoes!, portaMalas: "500" },
};

console.log("--- Testing Standard Car ---");
const results1 = computeCarRanking(mockCar);
results1.forEach((r) => {
	console.log(`Profile: ${r.profileName} (${r.profileId})`);
	console.log(`  Score: ${r.score.toFixed(2)}`);
	console.log(`  Rating: ${r.rating}`);
	// console.log(`  Breakdown:`, r.breakdown);
});

console.log("\n--- Testing Luxury Car ---");
const results2 = computeCarRanking(mockLuxuryCar);
results2.forEach((r) => {
	console.log(`Profile: ${r.profileName} (${r.profileId})`);
	console.log(`  Score: ${r.score.toFixed(2)}`);
	console.log(`  Rating: ${r.rating}`);
});
