import type { FastifyReply } from "fastify";

import type { ErrorResponse } from "../@types/errorResponse";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class ErrorHandler {
	static handle(error: unknown, reply: FastifyReply) {
		// biome-ignore lint/complexity/noThisInStatic: <explanation>
		const { statusCode, body } = this.getErrorResponse(error);
		return reply.status(statusCode).send(body);
	}

	private static getErrorResponse(error: unknown): ErrorResponse {
		if (error instanceof Error) {
			switch (error.message) {
				case "EPISODE_NOT_FOUND":
					return {
						statusCode: 409,
						body: { message: "Episodio nao encontrado" },
					};
				case "USER_NOT_FOUND":
					return {
						statusCode: 409,
						body: { message: "Usuario nao encontrado" },
					};
				case "USER_ALREADY_EXISTS":
					return {
						statusCode: 409,
						body: { message: "Usuario ja cadastrado" },
					};
				case "TOKEN_NOT_FOUND":
					return {
						statusCode: 401,
						body: { message: "Token nao encontrado" },
					};
				case "INVALID_CREDENTIALS":
					return {
						statusCode: 401,
						body: { message: "Credenciais invalidas" },
					};
				default:
					console.error("Erro interno:", error);
					return {
						statusCode: 500,
						body: { message: "Ocorreu um erro" },
					};
			}
		}

		console.error(error);
		return {
			statusCode: 500,
			body: { message: "Erro inesperado." },
		};
	}
}
