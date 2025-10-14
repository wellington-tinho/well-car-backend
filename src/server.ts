import { fastifyCors } from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { routes } from "./routes/index.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifyCors, { origin: "*" });

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Typed API",
			version: "1.0.1",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.register(routes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

app
	.listen({ port: PORT, host: "0.0.0.0" })
	.then(() => {
		console.log(`HTTP server running on port ${PORT}`);
	})
	.catch((err) => {
		console.error("Error starting server:", err);
		process.exit(1);
	});
