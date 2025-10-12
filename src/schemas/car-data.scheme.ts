import { z } from "zod";

export const carSchema = z.object({
	id: z.uuid().optional(),
	slug: z.string().min(1, "Slug é obrigatório"),
	nome: z.string().min(1, "Nome é obrigatório"),
	ano: z.number().int().min(1886).optional(), // primeiro carro moderno
	preco: z.number().optional(),
	combustivel: z.string().optional(),
	ipva: z.number().optional(),
	seguro: z.number().optional(),
	revisoes: z.string().optional(),
	procedencia: z.string().optional(),
	garantia: z.string().optional(),
	configuracao: z.string().optional(),
	porte: z.string().optional(),
	lugares: z.number().optional(),
	portas: z.number().optional(),
	geracao: z.string().optional(),
	plataforma: z.string().optional(),
	notaLeitor: z.number().optional(),

	// IDs de relacionamento
	motorId: z.uuid().optional(),
	transmissaoId: z.uuid().optional(),
	suspensaoId: z.uuid().optional(),
	freiosId: z.uuid().optional(),
	direcaoId: z.uuid().optional(),
	pneusId: z.uuid().optional(),
	dimensoesId: z.uuid().optional(),
	aerodinamicaId: z.uuid().optional(),
	desempenhoId: z.uuid().optional(),
	consumoId: z.uuid().optional(),
	autonomiaId: z.uuid().optional(),

	// Texto livre
	seguranca: z.string().optional(),
	conforto: z.string().optional(),
	infotenimento: z.string().optional(),

	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type CarType = z.infer<typeof carSchema>;

// Schema para atualização (todos opcionais, exceto id obrigatório)
export const carSchemaUpdate = carSchema
	.partial()
	.extend({
		id: z.uuid(), // força id a ser obrigatório
	})
	.omit({ createdAt: true, updatedAt: true });

export type CarTypeUpdate = z.infer<typeof carSchemaUpdate>;
