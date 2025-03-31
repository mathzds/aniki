import fs from "node:fs";
import type { ReadStream } from "node:fs";

import animeRepository from "./repository";

export default class animeService {
	private repository: animeRepository;

	constructor() {
		this.repository = new animeRepository();
	}

	getVideoStream(anime: string, episode: string): ReadStream {
		try {
			const videoPath = this.repository.getVideoPath(anime, episode);
			return fs.createReadStream(videoPath);
		} catch (error) {
			throw new Error("EPISODE_NOT_FOUND");
		}
	}
}
