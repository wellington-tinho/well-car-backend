import { ZodOptional, z } from "zod";

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
 *   z.string().optional() → z.string().nullable()
 */
export const makeResponseSchema = <T extends z.ZodRawShape>(
	schema: z.ZodObject<T>,
) =>
	z.object(
		Object.fromEntries(
			Object.entries(schema.shape).map(([key, field]) => [
				key,
				field instanceof ZodOptional
					? (field.unwrap() as z.ZodTypeAny).nullable()
					: field,
			]),
		) as z.ZodRawShape,
	);
