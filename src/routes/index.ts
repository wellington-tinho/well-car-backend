import { sql } from "../../infra/client.ts";
import type { FastifyTypedInstance } from "../types.ts";
// import healthRoutes from "./health.ts";

export async function routes(app: FastifyTypedInstance) {
	const result = await sql`
      SELECT 1 + 1 as sum;
  `;
	console.log(result);
	// await healthRoutes(app);
}
