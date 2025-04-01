import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center h-screen ">
			<Image src="/logo.png" alt="logo" width={300} height={300} priority />
			<Link href={"/login"}>
				<button type="button" className="btn btn-soft btn-accent transition">
					Start
				</button>
			</Link>
		</div>
	);
}
