import "./globals.css";

import type { Metadata } from "next";

import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/navbar";

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
				<AuthProvider>
					<Navbar />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
