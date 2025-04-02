"use client";

import { useAuth } from "../../context/AuthContext";

import { useAuthCheck } from "../../hooks/useAuthCheck";

export default function Profile() {
	useAuthCheck();
	const { user } = useAuth();

	if (!user) {
		throw new Error("USER_NOT_FOUND");
	}

	return (
		<div>
			<h1>Profile</h1>
			<div>
				<p>ID: {user.id}</p>
				<p>Username: {user.login}</p>
			</div>
		</div>
	);
}
