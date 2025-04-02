import "./globals.css";

import type { Metadata } from "next";

import { AuthProvider } from "../context/AuthContext";

export const metadata: Metadata = {
	title: "Aniki",
	icons: {
		icon: "/logo.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
