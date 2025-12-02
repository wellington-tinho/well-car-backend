import { computeCarRanking, CarForRanking } from "./src/utils/ranking.ts";

const mockCar: CarForRanking = {
    id: "test-car",
    slug: "test-car",
    nome: "Test Car",
    preco: 100000,
    consumo: { urbano: "10", rodoviario: "14" },
    motor: { potenciaMaxima: "150", torqueMaximo: "20" },
    desempenho: { velocidadeMaxima: "200", aceleracao0100: "9.0" },
    dimensoes: {
        comprimento: "4000",
        largura: "1800",
        distanciaEntreEixos: "2600",
        portaMalas: "400",
        tanqueCombustivel: "50"
    },
    autonomia: { urbana: "15", rodoviaria: "17" },
    seguranca: "Airbag,ABS",
    conforto: "Ar condicionado",
    infotenimento: "Bluetooth",
    revisoes: "R$ 3.000,00",
    ipva: 2000,
    seguro: 3000
};

const results = computeCarRanking(mockCar);
console.log(JSON.stringify(results, null, 2));
