import fastifyBasicAuth from "@fastify/basic-auth";
import type { FastifyInstance } from "fastify";

export const basicAuth = (app: FastifyInstance) => {
	app.register(fastifyBasicAuth, {
		validate: (username, password, _req, _reply, done) => {
			if (username === "admin" && password === "admin") {
				done();
			} else {
				done(new Error("Unauthorized"));
			}
		},
	});
};
