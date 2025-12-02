const fs = require('fs');
const path = require('path');

// File paths
const seedPath = path.join(__dirname, 'data-seed.json');
const sourcePath = path.join(__dirname, 'carro.json');

// Read files
let seedData = [];
try {
  if (fs.existsSync(seedPath)) {
    seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    if (!Array.isArray(seedData)) {
      // If it's a single object, convert to array (handling legacy format if any)
      seedData = [seedData];
    }
  }
} catch (err) {
  console.error("Error reading seed file:", err);
  seedData = [];
}

const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

// Helper to find value in source data
const allItems = [];
if (sourceData.result && sourceData.result[0] && sourceData.result[0].Especificacao && sourceData.result[0].Especificacao.Categorias) {
  sourceData.result[0].Especificacao.Categorias.forEach(cat => {
    if (cat.Itens) {
      cat.Itens.forEach(item => {
        allItems.push(item);
      });
    }
  });
}

const findValue = (name) => {
  const item = allItems.find(i => i.Nome.toLowerCase() === name.toLowerCase());
  return item ? item.Valor : null;
};

const getProp = (path) => {
  let current = sourceData.result[0];
  const parts = path.split('.');
  for (const part of parts) {
    if (current && current[part] !== undefined) {
      current = current[part];
    } else {
      return null;
    }
  }
  return current;
};

// Mapping logic
const mapData = () => {
  const result = {};

  // Direct mappings or logic
  result.slug = sourceData.result[0].Versao.slug;

  // Construct Name
  const marca = sourceData.result[0].Marca.nome;
  const modelo = sourceData.result[0].Modelo.nome;
  const versao = findValue('Versão');
  const motor = findValue('Cilindrada (litros)');
  const motorName = findValue('Nomenclatura do motor (comercial)');
  const cambio = findValue('Transmissão');
  const combustivelComercial = findValue('Combustível (comercial)') || 'FLEX';
  result.nome = `${marca} ${modelo} ${motor} ${motorName} ${combustivelComercial} ${versao} ${cambio}`.toUpperCase();

  result.ano = sourceData.result[0].AnoModelo;
  result.preco = sourceData.result[0].Precos.PrecoSugerido || sourceData.result[0].DadosPreco.ValorMedio || null;
  result.combustivel = getProp('Especificacao.Propriedades.TipoCombustivel1');
  result.ipva = null;
  result.seguro = null;
  result.revisoes = null;
  result.procedencia = findValue('Procedência') || "Brasil";
  result.garantia = findValue('Garantia');
  result.configuracao = getProp('Especificacao.Propriedades.DescricaoCarroceria');

  result.porte = findValue('Porte') || findValue('Tipo de carroceria - Categoria de carroceria');
  result.lugares = getProp('Especificacao.Propriedades.NumeroOcupantes');
  result.portas = getProp('Especificacao.Propriedades.NumeroPortas');
  result.geracao = findValue('Geração');
  result.plataforma = findValue('Plataforma');
  result.notaLeitor = sourceData.result[0].OpiniaoDono.media;

  const getFeatures = (catNamePartial) => {
    const cat = sourceData.result[0].Especificacao.Categorias.find(c => c.Nome.includes(catNamePartial));
    if (cat && cat.Itens) {
      return cat.Itens
        .filter(i => i.Valor === 'Sim' || i.Valor === 'Sist. um toque' || i.Valor === 'Sist. um toque para motorista' || (i.Valor !== 'Não' && i.Valor !== null && i.Valor !== ''))
        .map(i => i.Nome)
        .join(', ');
    }
    return "";
  };

  result.seguranca = getFeatures('Segurança');
  result.conforto = getFeatures('Conforto');
  result.infotenimento = getFeatures('Tecnologia');

  // Helpers for motor calculations
  const parseValue = (str) => {
    if (!str) return 0;
    return parseFloat(str.replace(',', '.').split('/')[0]);
  };

  const potenciaStr = findValue('Potência (cv/rpm)');
  const torqueStr = findValue('Torque (kgfm/rpm)');
  const cilindradaStr = findValue('Cilindrada (litros)');
  const pesoStr = findValue('Peso líquido em ordem de marcha (kg)');

  const potencia = parseValue(potenciaStr);
  const torque = parseValue(torqueStr);
  const cilindrada = parseValue(cilindradaStr);
  const peso = parseValue(pesoStr);

  const formatNum = (num) => num ? num.toFixed(1).replace('.', ',') : null;

  // Nested objects
  result.motor = { create: {} };
  result.motor.create.instalacao = findValue('Instalação') || findValue('Disposição dos cilindros');
  result.motor.create.aspiracao = findValue('Aspiração') || findValue('Alimentação');
  result.motor.create.disposicao = findValue('Disposição dos cilindros');
  result.motor.create.alimentacao = findValue('Alimentação');
  result.motor.create.cilindros = findValue('Número de cilindros');
  result.motor.create.comandoValvulas = findValue('Comando de Válvulas');
  result.motor.create.tuchos = findValue('Tuchos');
  result.motor.create.variacaoComando = findValue('Comando de válvulas variável');
  result.motor.create.valvulasPorCilindro = findValue('Número de válvulas por cilindro');
  result.motor.create.diametroCilindros = findValue('Diâmetro dos cilindros');
  result.motor.create.razaoCompressao = findValue('Taxa de compressão');
  result.motor.create.cursoPistoes = findValue('Curso dos pistões');
  result.motor.create.cilindrada = findValue('Cilindrada cm³');
  result.motor.create.potenciaMaxima = potenciaStr;
  result.motor.create.codigoMotor = findValue('Nomenclatura do motor (comercial)');
  result.motor.create.torqueMaximo = torqueStr;
  result.motor.create.pesoPotencia = (peso && potencia) ? formatNum(peso / potencia) : null;
  result.motor.create.torqueEspecifico = (torque && cilindrada) ? formatNum(torque / cilindrada) : null;
  result.motor.create.pesoTorque = (peso && torque) ? formatNum(peso / torque) : null;
  result.motor.create.potenciaEspecifica = (potencia && cilindrada) ? formatNum(potencia / cilindrada) : null;
  result.motor.create.rotacaoMaxima = potenciaStr ? potenciaStr.split('/')[1] : null;

  result.transmissao = { create: {} };
  result.transmissao.create.tracao = findValue('Tração');
  result.transmissao.create.cambio = findValue('Transmissão');
  result.transmissao.create.codigoCambio = findValue('Código do câmbio');
  result.transmissao.create.acoplamento = findValue('Acoplamento');

  result.suspensao = { create: {} };
  result.suspensao.create.dianteira = findValue('Suspensão - Dianteira');
  result.suspensao.create.traseira = findValue('Suspensão - Traseira');
  result.suspensao.create.elementoElasticod = findValue('Suspensão - Molas dianteiras');
  result.suspensao.create.elementoElasticot = findValue('Suspensão - Molas traseiras');

  result.freios = { create: {} };
  result.freios.create.dianteiros = findValue('Freios dianteiros');
  result.freios.create.traseiros = findValue('Freios traseiros');

  result.direcao = { create: {} };
  result.direcao.create.assistencia = findValue('Direção - Assistência');
  result.direcao.create.diametroMinimoGiro = findValue('Diâmetro de giro');

  result.pneus = { create: {} };
  result.pneus.create.dianteiros = findValue('Dianteira - Pneus (largura/perfil/aro)');
  result.pneus.create.traseiros = findValue('Traseira - Pneus (largura/perfil)');
  result.pneus.create.alturaFlancoD = findValue('Altura do flanco');
  result.pneus.create.estepe = findValue('Estepe');
  result.pneus.create.tipo = findValue('Tipo de roda - Tipo de roda');

  result.dimensoes = { create: {} };
  result.dimensoes.create.comprimento = findValue('Comprimento (mm)');
  result.dimensoes.create.largura = findValue('Largura (mm)');
  result.dimensoes.create.distanciaEntreEixos = findValue('Distância entre-eixos (mm)') || findValue('Entre-eixos (mm)');
  result.dimensoes.create.altura = findValue('Altura (mm)');
  result.dimensoes.create.bitolaDianteira = findValue('Bitola dianteira');
  result.dimensoes.create.bitolaTraseira = findValue('Bitola traseira');
  result.dimensoes.create.portaMalas = findValue('Capacidade do porta-malas (litros)');
  result.dimensoes.create.tanqueCombustivel = findValue('Capacidade tanque de combustível (litros)');
  result.dimensoes.create.peso = findValue('Peso líquido em ordem de marcha (kg)');
  result.dimensoes.create.cargaUtil = findValue('Carga útil') || findValue('Carga útil (kg)');
  result.dimensoes.create.vaoLivreSolo = findValue('Vão livre do solo') || findValue('Altura em relação ao solo (mm)');

  result.aerodinamica = { create: {} };
  result.aerodinamica.create.areaFrontal = findValue('Área frontal (A)');
  result.aerodinamica.create.coeficienteArrasto = findValue('Coeficiente de arrasto (Cx)');
  result.aerodinamica.create.areaFrontalCorrigida = findValue('Área frontal corrigida');

  result.desempenho = { create: {} };
  result.desempenho.create.velocidadeMaxima = findValue('Velocidade máxima (km/hora)');
  result.desempenho.create.aceleracao0100 = findValue('Aceleração 0-100 km/h (segundos)');

  result.autonomia = { create: {} };
  result.autonomia.create.urbana = findValue('Consumo cidade (km/litro) - Combustível 1');
  result.autonomia.create.rodoviaria = findValue('Consumo estrada (km/litro) - Combustível 1');

  return result;
};

const newEntry = mapData();

// Check if slug already exists and update or append
const existingIndex = seedData.findIndex(item => item.slug === newEntry.slug);
if (existingIndex !== -1) {
  console.log(`Updating existing entry for slug: ${newEntry.slug}`);
  seedData[existingIndex] = newEntry;
} else {
  console.log(`Appending new entry for slug: ${newEntry.slug}`);
  seedData.push(newEntry);
}

fs.writeFileSync(seedPath, JSON.stringify(seedData, null, 2));
console.log('Data appended/updated in:', seedPath);

// Comparison (Optional: compare new entry against first item of seed as schema)
if (seedData.length > 0) {
  const compareKeys = (obj1, obj2, path = '') => {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();

    // Check for missing keys
    keys1.forEach(k => {
      if (!keys2.includes(k)) {
        console.log(`Missing key in output: ${path}${k}`);
      }
    });

    // Check for extra keys
    keys2.forEach(k => {
      if (!keys1.includes(k)) {
        console.log(`Extra key in output: ${path}${k}`);
      }
    });

    // Recurse
    keys1.forEach(k => {
      if (keys2.includes(k) && typeof obj1[k] === 'object' && obj1[k] !== null && typeof obj2[k] === 'object' && obj2[k] !== null) {
        compareKeys(obj1[k], obj2[k], `${path}${k}.`);
      }
    });
  };

  console.log('\nComparing keys with first item of seed data...');
  // Compare against the first item, or the one we just updated if it was the first
  compareKeys(seedData[0], newEntry);
  console.log('Comparison complete.');
}
