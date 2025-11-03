import { z } from "zod";

/**
 * Schema base representando as dependências do sistema
 */
export const DependenciesSchema = z.object({
	database: z.object({
		version: z.string(),
		max_connections: z.string(),
		connections_used: z.string(),
	}),
});

/**
 * Schema base representando um sucesso na operação
 */
export const SuccessSchema = z.object({
	updated_at: z.string(),
	dependencies: DependenciesSchema,
});

/**
 * Schema base representando um erro na operação
 */
export const ErrorSchema = z.object({
	updated_at: z.string(),
	dependencies: DependenciesSchema,
	error: z.string(),
});

/**
 * Converte um schema base (usado para escrita) em um schema de resposta
 * (usado para leitura), permitindo que todos os campos opcionais aceitem `null`.
 *
 * Isso resolve o problema de compatibilidade entre Prisma (`null`) e Zod (`undefined`).
 *
 * Exemplo:
 *   z.string().optional() → z.string().nullable().optional()
 */
export const makeResponseSchema = <T extends z.ZodRawShape>(
	schema: z.ZodObject<T>,
): z.ZodObject<T> => {
	// força um objeto mutável e tipado corretamente
	const baseShape = schema.shape as unknown as Record<string, z.ZodTypeAny>;
	const newShape: Record<string, z.ZodTypeAny> = {};

	for (const key in baseShape) {
		const field = baseShape[key];

		if (field instanceof z.ZodOptional) {
			// ⚠️ unwrap() retorna um tipo genérico ($ZodType)
			// então precisamos fazer um cast explícito para ZodTypeAny
			const inner = field.unwrap() as z.ZodTypeAny;

			// agora o TS reconhece corretamente os métodos .nullable() e .optional()
			newShape[key] = inner.nullable().optional();
		} else {
			newShape[key] = field;
		}
	}

	return z.object(newShape) as unknown as z.ZodObject<T>;
};
