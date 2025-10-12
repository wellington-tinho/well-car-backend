-- CreateTable
CREATE TABLE "Carro" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ano" INTEGER,
    "preco" DOUBLE PRECISION,
    "combustivel" TEXT,
    "ipva" DOUBLE PRECISION,
    "seguro" DOUBLE PRECISION,
    "revisoes" TEXT,
    "procedencia" TEXT,
    "garantia" TEXT,
    "configuracao" TEXT,
    "porte" TEXT,
    "lugares" INTEGER,
    "portas" INTEGER,
    "geracao" TEXT,
    "plataforma" TEXT,
    "notaLeitor" DOUBLE PRECISION,
    "motorId" TEXT,
    "transmissaoId" TEXT,
    "suspensaoId" TEXT,
    "freiosId" TEXT,
    "direcaoId" TEXT,
    "pneusId" TEXT,
    "dimensoesId" TEXT,
    "aerodinamicaId" TEXT,
    "desempenhoId" TEXT,
    "consumoId" TEXT,
    "autonomiaId" TEXT,
    "seguranca" TEXT,
    "conforto" TEXT,
    "infotenimento" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motor" (
    "id" TEXT NOT NULL,
    "instalacao" TEXT,
    "aspiracao" TEXT,
    "disposicao" TEXT,
    "alimentacao" TEXT,
    "cilindros" TEXT,
    "comandoValvulas" TEXT,
    "tuchos" TEXT,
    "variacaoComando" TEXT,
    "valvulasPorCilindro" TEXT,
    "diametroCilindros" TEXT,
    "razaoCompressao" TEXT,
    "cursoPistoes" TEXT,
    "cilindrada" TEXT,
    "potenciaMaxima" TEXT,
    "codigoMotor" TEXT,
    "torqueMaximo" TEXT,
    "pesoPotencia" TEXT,
    "torqueEspecifico" TEXT,
    "pesoTorque" TEXT,
    "potenciaEspecifica" TEXT,
    "rotacaoMaxima" TEXT,

    CONSTRAINT "Motor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transmissao" (
    "id" TEXT NOT NULL,
    "tracao" TEXT,
    "cambio" TEXT,
    "codigoCambio" TEXT,
    "acoplamento" TEXT,

    CONSTRAINT "Transmissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suspensao" (
    "id" TEXT NOT NULL,
    "dianteira" TEXT,
    "traseira" TEXT,
    "elementoElasticod" TEXT,
    "elementoElasticot" TEXT,

    CONSTRAINT "Suspensao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Freios" (
    "id" TEXT NOT NULL,
    "dianteiros" TEXT,
    "traseiros" TEXT,

    CONSTRAINT "Freios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Direcao" (
    "id" TEXT NOT NULL,
    "assistencia" TEXT,
    "diametroMinimoGiro" TEXT,

    CONSTRAINT "Direcao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pneus" (
    "id" TEXT NOT NULL,
    "dianteiros" TEXT,
    "traseiros" TEXT,
    "alturaFlancoD" TEXT,
    "alturaFlancoT" TEXT,

    CONSTRAINT "Pneus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dimensoes" (
    "id" TEXT NOT NULL,
    "comprimento" TEXT,
    "largura" TEXT,
    "distanciaEntreEixos" TEXT,
    "altura" TEXT,
    "bitolaDianteira" TEXT,
    "bitolaTraseira" TEXT,
    "portaMalas" TEXT,
    "tanqueCombustivel" TEXT,
    "peso" TEXT,
    "cargaUtil" TEXT,
    "vaoLivreSolo" TEXT,

    CONSTRAINT "Dimensoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aerodinamica" (
    "id" TEXT NOT NULL,
    "areaFrontal" TEXT,
    "coeficienteArrasto" TEXT,
    "areaFrontalCorrigida" TEXT,

    CONSTRAINT "Aerodinamica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desempenho" (
    "id" TEXT NOT NULL,
    "velocidadeMaxima" TEXT,
    "aceleracao0100" TEXT,

    CONSTRAINT "Desempenho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consumo" (
    "id" TEXT NOT NULL,
    "urbano" TEXT,
    "rodoviario" TEXT,

    CONSTRAINT "Consumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autonomia" (
    "id" TEXT NOT NULL,
    "urbana" TEXT,
    "rodoviaria" TEXT,

    CONSTRAINT "Autonomia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankingSystem" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "RankingSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarRanking" (
    "id" TEXT NOT NULL,
    "ratingSystem" DOUBLE PRECISION,
    "comentario" TEXT,
    "carId" TEXT NOT NULL,
    "rankingSystemId" TEXT NOT NULL,

    CONSTRAINT "CarRanking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Carro_slug_key" ON "Carro"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CarRanking_carId_rankingSystemId_key" ON "CarRanking"("carId", "rankingSystemId");

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_motorId_fkey" FOREIGN KEY ("motorId") REFERENCES "Motor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_transmissaoId_fkey" FOREIGN KEY ("transmissaoId") REFERENCES "Transmissao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_suspensaoId_fkey" FOREIGN KEY ("suspensaoId") REFERENCES "Suspensao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_freiosId_fkey" FOREIGN KEY ("freiosId") REFERENCES "Freios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_direcaoId_fkey" FOREIGN KEY ("direcaoId") REFERENCES "Direcao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_pneusId_fkey" FOREIGN KEY ("pneusId") REFERENCES "Pneus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_dimensoesId_fkey" FOREIGN KEY ("dimensoesId") REFERENCES "Dimensoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_aerodinamicaId_fkey" FOREIGN KEY ("aerodinamicaId") REFERENCES "Aerodinamica"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_desempenhoId_fkey" FOREIGN KEY ("desempenhoId") REFERENCES "Desempenho"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_consumoId_fkey" FOREIGN KEY ("consumoId") REFERENCES "Consumo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carro" ADD CONSTRAINT "Carro_autonomiaId_fkey" FOREIGN KEY ("autonomiaId") REFERENCES "Autonomia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarRanking" ADD CONSTRAINT "CarRanking_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Carro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarRanking" ADD CONSTRAINT "CarRanking_rankingSystemId_fkey" FOREIGN KEY ("rankingSystemId") REFERENCES "RankingSystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
