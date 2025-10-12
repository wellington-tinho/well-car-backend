import z from "zod";
import { sql } from "../../infra/client.ts";
import { ErrorSchema, SuccessSchema } from "../schemas/common.ts";
import type { FastifyTypedInstance } from "../types.ts";
export default async function healthRoutes(app: FastifyTypedInstance) {
	app.get(
		"/health",
		{
			schema: {
				tags: ["health"],
				description: "Health check of API and database status",
				response: {
					200: SuccessSchema,
					500: ErrorSchema,
				},
			},
		},
		async (_, reply) => {
			try {
				const version = await sql`SHOW server_version;`;
				const maxConnections = await sql`SHOW max_connections;`;
				const connectionsUsed =
					await sql`SELECT count(*) FROM pg_stat_activity;`;

				console.log(version);
				console.log(maxConnections);
				console.log(connectionsUsed);

				return reply.send({
					updated_at: new Date().toISOString(),
					dependencies: {
						database: {
							version: version[0]["server_version"],
							max_connections: maxConnections[0]["max_connections"],
							connections_used: connectionsUsed[0]["count"],
						},
					},
				});
			} catch (error) {
				reply.status(500).send({
					updated_at: new Date().toISOString(),
					dependencies: {
						database: {
							version: "unknown",
							max_connections: "unknown",
							connections_used: "unknown",
						},
					},
					error: (error as Error).message,
				});
			}
		},
	);

	// versão leve (para monitoramento rápido)
	app.get(
		"/healthz",
		{
			schema: {
				tags: ["health"],
				description: "Quick Health check of API and database status",
				response: {
					200: z.object({
						status: z.string().default("ok"),
					}),
				},
			},
		},
		async () => ({ status: "ok" }),
	);
}
