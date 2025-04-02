"use client";

import { useState, useEffect } from "react";
import Loading from "./loading";

interface LoadingWrapperProps {
	children: React.ReactNode;
	delay?: number;
}

export default function LoadingWrapper({
	children,
	delay = 1000,
}: LoadingWrapperProps) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, delay);

		return () => clearTimeout(timer);
	}, [delay]);

	return <div>{isLoading ? <Loading /> : children}</div>;
}
