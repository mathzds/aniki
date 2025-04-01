import type { FastifyInstance } from "fastify";
import userServices from "./services";
import ErrorHandler from "@/common/handlers/handlerError";

export default async function userController(app: FastifyInstance) {
	const userService = new userServices();

	app.get(
		"/user/:id",
		{
			preHandler: app.basicAuth,
		},
		async (request, reply) => {
			const { id } = request.params as { id: string };

			try {
				const user = await userService.findById(id);
				return reply.send(user);
			} catch (error) {
				ErrorHandler.handle(error, reply);
			}
		},
	);

	app.post(
		"/user",
		{
			preHandler: app.basicAuth,
		},
		async (request, reply) => {
			const { login, password } = request.body as {
				login: string;
				password: string;
			};

			try {
				const user = await userService.create({ login, password });
				return reply.send(user);
			} catch (error) {
				ErrorHandler.handle(error, reply);
			}
		},
	);
}
