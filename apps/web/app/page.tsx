import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center h-screen ">
			<Image
				src="/logo.png"
				alt="Application Logo"
				width={300}
				height={300}
				priority
			/>
			<button type="button" className="btn btn-soft btn-accent transition">
				Log-in
			</button>
		</div>
	);
}
