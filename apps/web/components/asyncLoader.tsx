"use client";

import { useState, useEffect } from "react";
import Loading from "./loading";

interface AsyncLoaderProps {
	load: () => Promise<void>;
	children: React.ReactNode;
}

export default function AsyncLoader({ load, children }: AsyncLoaderProps) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		load().then(() => {
			if (isMounted) {
				setIsLoading(false);
			}
		});

		return () => {
			isMounted = false;
		};
	}, [load]);

	return <div>{isLoading ? <Loading /> : children}</div>;
}
