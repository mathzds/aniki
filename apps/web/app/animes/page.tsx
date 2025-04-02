"use client";

import { useAuth } from "../../context/AuthContext";
import { useAuthCheck } from "../../hooks/useAuthCheck";

export default function Profile() {
	useAuthCheck();

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="card card-side shadow-sm">
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<video
					width="100%"
					height="auto"
					controls
					preload="auto"
					onError={(e) => {
						console.error("Error loading video:", e);
					}}
				>
					<source
						src="http://localhost:3001/anime/stream/bleach-classico/1"
						type="video/mp4"
					/>
					<track
						src="/path/to/captions.vtt"
						kind="subtitles"
						srcLang="en"
						label="English"
					/>
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	);
}
