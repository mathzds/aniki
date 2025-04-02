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

	app.post("/user/login", async (request, reply) => {
		const { login, password } = request.body as {
			login: string;
			password: string;
		};

		try {
			const user = await userService.login({ login, password });

			if (!user) {
				return reply.code(401).send({ message: "Unauthorized" });
			}

			const token = app.jwt.sign({ id: user.id }, { expiresIn: "1d" });

			reply
				.setCookie("access_token", token, {
					httpOnly: true,
					secure: false,
					sameSite: "strict",
					path: "/",
				})
				.send({ message: "Login successful" });
		} catch (error) {
			ErrorHandler.handle(error, reply);
		}
	});

	app.get(
		"/user/profile",
		{
			preHandler: [app.authenticate],
		},
		async (request, reply) => {
			try {
				const user = await userService.findById(
					request.authenticatedUser?.id ?? "",
				);

				if (!user) {
					return reply.code(404).send({ message: "Usuário não encontrado" });
				}

				return reply.send({
					id: user.id,
					login: user.login,
				});
			} catch (error) {
				ErrorHandler.handle(error, reply);
			}
		},
	);

	app.post("/user/logout", async (_request, reply) => {
		try {
			return reply
				.clearCookie("access_token", {
					httpOnly: true,
					secure: false,
					sameSite: "strict",
					path: "/",
				})
				.send({ message: "Logout successful" });
		} catch (error) {
			ErrorHandler.handle(error, reply);
		}
	});
}
