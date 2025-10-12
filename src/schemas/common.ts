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
