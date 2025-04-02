"use client";

import LoadingWrapper from "../../components/loadingWrapper";


export default function LoginLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <LoadingWrapper>{children}</LoadingWrapper>;
}
