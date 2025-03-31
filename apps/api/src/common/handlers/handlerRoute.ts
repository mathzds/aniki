import type { FastifyInstance } from "fastify";

import animeController from "../../modules/anime/controller";

export default async function (app: FastifyInstance) {
	animeController(app);
}
