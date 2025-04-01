import Image from "next/image";
import { User, Lock } from "lucide-react";

export default function Login() {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<Image src="/logo.png" alt="logo" width={200} height={200} priority />
			<div className="flex flex-col gap-4">
				<label className="input validator flex items-center ">
					<User />
					<input
						type="text"
						required
						placeholder="Username"
						pattern="[A-Za-z][A-Za-z0-9\-]*"
						minLength={3}
						maxLength={30}
						className="flex-1 p-2 outline-none border-none bg-transparent"
					/>
				</label>

				<label className="input validator flex items-center ">
					<Lock className="h-5 w-5 opacity-70" />
					<input
						type="password"
						required
						placeholder="Password"
						className="flex-1 p-2 outline-none border-none bg-transparent"
					/>
				</label>

				<button type="button" className="btn btn-soft btn-accent transition">
					Log-in
				</button>
			</div>
		</div>
	);
}
