import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyBasicAuth from "@fastify/basic-auth";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";

import path from "node:path";

import { configureAuth } from "./middlewares/auth";

import handlerRoute from "@/common/handlers/handlerRoute";
import configClient from "@/common/config/configClient";
import handlerDatabase from "@/common/handlers/handlerDatabase";

import userController from "@/modules/user/controller";

const app = fastify({ logger: true });

app.register(fastifyStatic, {
	root: path.join(__dirname, "public"),
	prefix: "/",
});

app.register(async (authenticatedApp) => {
	authenticatedApp.register(fastifyBasicAuth, {
		validate: (username, password, _req, _reply, done) => {
			if (username === "admin" && password === "admin") return done();
			done(new Error("Unauthorized"));
		},
	});

	authenticatedApp.register(userController);
});

app.register(fastifyJwt, {
	secret: "chelseaERendaFixa2025",
});

app.register(fastifyCookie, {
	secret: "chelseaERendaFixa2025",
	hook: "onRequest",
	parseOptions: {},
});

app.register(fastifyCors, {
	origin: "http://localhost:3000",
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization"],
	methods: ["GET", "POST", "PUT", "DELETE"],
});

configureAuth(app);

export default async () => {
	try {
		await handlerRoute(app);
		await handlerDatabase();

		app.listen({ port: configClient.port as number });
		console.log("Rodando na porta:", configClient.port);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
