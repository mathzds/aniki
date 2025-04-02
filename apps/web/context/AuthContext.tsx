"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
	id: string;
	login: string;
}

interface AuthContextType {
	user: User | null;
	login: () => void;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	login: () => {},
	logout: () => {},
	loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/auth/me", { credentials: "include" });
				if (res.ok) {
					const userData = await res.json();
					setUser(userData);
				}
			} finally {
				setLoading(false);
			}
		};
		checkAuth();
	}, []);

	const login = async () => {
		const res = await fetch("/api/auth/me", {
			credentials: "include",
		});
		const userData = await res.json();
		setUser(userData);
	};

	const logout = async () => {
		return await fetch("/api/auth/logout", {
			method: "POST",
			credentials: "include",
		});
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
