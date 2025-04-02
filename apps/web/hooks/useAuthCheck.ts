"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { useAuth } from "../context/AuthContext";

export const useAuthCheck = () => {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push("/login");
		}
	}, [user, loading, router]);
};
