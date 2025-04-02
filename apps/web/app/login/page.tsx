"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { useAuth } from "../../context/AuthContext";

import { User, Lock } from "lucide-react";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await fetch("http://localhost:3001/user/login", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					login: username,
					password: password,
				}),
			});

			if (!response.ok) {
				throw new Error("Credenciais inválidas");
			}

			login();
			router.push("/profile");
		} catch (err) {
			setError("Credenciais inválidas");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<Image src="/logo.png" alt="logo" width={300} height={300} priority />
			<div className="flex w-full max-w-[400px]">
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
					<div className="input validator flex items-center w-full">
						<User />
						<input
							type="text"
							required
							placeholder="Username"
							pattern="[A-Za-z][A-Za-z0-9\-]*"
							minLength={3}
							maxLength={30}
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div className="input validator flex items-center w-full">
						<Lock />
						<input
							type="password"
							required
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					{error && <p className="text-red-500 text-sm">{error}</p>}

					<button
						type="submit"
						className="btn btn-soft btn-accent transition"
						disabled={loading}
					>
						{loading ? "Loading..." : "Log-in"}
					</button>
				</form>
			</div>
		</div>
	);
}
