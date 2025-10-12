import { z } from "zod";

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

export type MotorType = z.infer<typeof motorSchema>;