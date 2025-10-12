import z from "zod";
import db from "../../infra/database.ts";
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
				const version = await db.query("SHOW server_version;");
				const maxConnections = await db.query("SHOW max_connections;");
				const connectionsUsed = await db.query(
					"SELECT count(*) FROM pg_stat_activity;",
				);

				return reply.send({
					updated_at: new Date().toISOString(),
					dependencies: {
						database: {
							version:
								version.rows[0].server_version ?? version.rows[0].version,
							max_connections: maxConnections.rows[0].max_connections,
							connections_used: connectionsUsed.rows[0].count,
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
