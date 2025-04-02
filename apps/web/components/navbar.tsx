"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
	const [isClient, setIsClient] = useState(false);
	const { user, loading, logout } = useAuth();
	const router = useRouter();
	const [showNavbar, setShowNavbar] = useState(true);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!user && !loading) {
			setShowNavbar(false);
		} else {
			setShowNavbar(true);
		}
	}, [user, loading]);

	const handleLogout = async () => {
		try {
			logout();
			setShowNavbar(false);
			router.push("/login");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	if (!isClient || loading) return <div />;

	return showNavbar && user ? (
		<nav>
			<div className="flex flex-row gap-4 items-center justify-center h-16">
				<button
					type="button"
					onClick={() => router.push("/profile")}
					className="btn btn-soft btn-primary"
				>
					Profile
				</button>
				<button
					type="button"
					onClick={() => router.push("/animes")}
					className="btn btn-soft btn-info"
				>
					Animes
				</button>
				<button
					type="button"
					onClick={handleLogout}
					className="btn btn-soft btn-error"
				>
					Logout
				</button>
			</div>
		</nav>
	) : null;
}
