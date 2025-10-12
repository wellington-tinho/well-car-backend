import { fastifyCors } from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
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

app.register(routes);

app.listen({ port: 3333 }).then(() => {
	console.log("HTTP server running!");
});
