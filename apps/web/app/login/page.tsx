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

			await login();
			router.push("/profile");
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<Image src="/logo.png" alt="logo" width={200} height={200} priority />
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
				<div className="input validator flex items-center">
					<User />
					<input
						type="text"
						required
						placeholder="Username"
						pattern="[A-Za-z][A-Za-z0-9\-]*"
						minLength={3}
						maxLength={30}
						className="flex-1 p-2 outline-none border-none bg-transparent"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className="input validator flex items-center">
					<Lock className="h-5 w-5 opacity-70" />
					<input
						type="password"
						required
						placeholder="Password"
						className="flex-1 p-2 outline-none border-none bg-transparent"
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
	);
}
