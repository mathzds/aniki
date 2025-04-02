"use client";

import AsyncLoader from "../../components/asyncLoader";

export default function ProfileLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const fetchData = async () => {
		await new Promise((resolve) => setTimeout(resolve, 1500));
	};

	return (
		<AsyncLoader load={fetchData}>
			<div>{children}</div>
		</AsyncLoader>
	);
}
