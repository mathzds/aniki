import fastify from "fastify";
import fastifyStatic from "@fastify/static";

import path from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

import configClient from "../common/config/configClient";
import handlerRoute from "../common/handlers/handlerRoute";

const pump = promisify(pipeline);
const app = fastify({ logger: true });

app.register(fastifyStatic, {
	root: path.join(__dirname, "public"),
	prefix: "/",
});

export default async () => {
	try {
		await handlerRoute(app);

		app.listen({ port: configClient.port as number });
		console.log("Rodando na porta:", configClient.port);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
