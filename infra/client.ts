import postgres from "postgres";
import { z } from "zod";

const DatabaseConfigSchema = z.string();

const database_url = DatabaseConfigSchema.parse(process.env.DATABASE_URL);

// export const sql = postgres(config);
export const sql = postgres(database_url);
