import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

interface AuthenticatedUser {
	id: string;
}

declare module "fastify" {
	interface FastifyRequest {
		authenticatedUser?: AuthenticatedUser;
	}

	interface FastifyInstance {
		authenticate: (
			request: FastifyRequest,
			reply: FastifyReply,
		) => Promise<void>;
	}
}

export const configureAuth = (app: FastifyInstance) => {
	app.decorateRequest("authenticatedUser", undefined);

	app.decorate(
		"authenticate",
		async (request: FastifyRequest, reply: FastifyReply) => {
			try {
				const token = request.cookies.access_token;
				if (!token) throw new Error("TOKEN_NOT_FOUND");

				const decoded = app.jwt.verify(token) as AuthenticatedUser;
				request.authenticatedUser = decoded;
			} catch (error) {
				reply.code(401).send({ message: "Não autorizado" });
			}
		},
	);

	app.addHook("onRequest", async (request, reply) => {
		const publicRoutes = ["/user/login"];
		if (publicRoutes.some((route) => request.url.startsWith(route))) return;

		await app.authenticate(request, reply);
	});
};
