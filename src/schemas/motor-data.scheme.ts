import { z } from "zod";
import { makeResponseSchema } from "./common.ts";

// 1. Schema Base para os campos do Motor
// Este schema usa .optional(), que é a forma correta para o Zod/Prisma na entrada de dados (create/update),
// pois a ausência de um campo é tratada como `undefined`.
export const motorSchema = z.object({
	id: z.uuid().optional(),
	instalacao: z.string().optional(),
	aspiracao: z.string().optional(),
	disposicao: z.string().optional(),
	alimentacao: z.string().optional(),
	cilindros: z.string().optional(),
	comandoValvulas: z.string().optional(),
	tuchos: z.string().optional(),
	variacaoComando: z.string().optional(),
	valvulasPorCilindro: z.string().optional(),
	diametroCilindros: z.string().optional(),
	cursoPistoes: z.string().optional(),
	cilindrada: z.string().optional(),
	potenciaMaxima: z.string().optional(),
	codigoMotor: z.string().optional(),
	torqueMaximo: z.string().optional(),
	pesoPotencia: z.string().optional(),
	torqueEspecifico: z.string().optional(),
	pesoTorque: z.string().optional(),
	potenciaEspecifica: z.string().optional(),
	rotacaoMaxima: z.string().optional(),
});

// 2. Schema de Resposta para a API
// Este schema é gerado a partir do `motorSchema` e transforma todos os campos
// para aceitarem `null` na saída. Isso representa corretamente os dados vindos do Prisma.
export const motorResponseSchema = makeResponseSchema(motorSchema);

// 3. Tipos inferidos a partir dos schemas
export type MotorType = z.infer<typeof motorSchema>;
export type MotorResponseType = z.infer<typeof motorResponseSchema>;
