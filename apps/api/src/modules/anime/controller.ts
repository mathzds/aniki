import type { FastifyInstance } from "fastify";

import animeService from "./service";

import ErrorHandler from "@/common/handlers/handlerError";

export default async function animeController(app: FastifyInstance) {
	const videoService = new animeService();

	app.get("/anime/stream/:anime/:episode", async (request, reply) => {
		const { anime, episode } = request.params as {
			anime: string;
			episode: string;
		};

		try {
			const stream = videoService.getVideoStream(anime, episode);

			reply.header("Content-Type", "video/mp4");
			reply.header("Accept-Ranges", "bytes");

			return reply.send(stream);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			ErrorHandler.handle(error, reply);
		}
	});

	app.get("/", async (_request, reply) => {
		return reply.send("Ola mundo");
	});
}
