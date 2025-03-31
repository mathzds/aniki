import fs from "node:fs";
import path from "node:path";

export default class animeRepository {
	getVideoPath(anime: string, episode: string): string {
		const decodedAnime = decodeURIComponent(anime);
		const videoPath = path.join("public", decodedAnime, `${episode}.mp4`);

		if (!fs.existsSync(videoPath)) {
			throw new Error("EPISODE_NOT_FOUND");
		}

		return videoPath;
	}
}
