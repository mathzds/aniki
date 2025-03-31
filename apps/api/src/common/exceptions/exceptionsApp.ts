export class AppError extends Error {
	constructor(
		public message: string,
		public statusCode: number,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		public details?: any,
	) {
		super(message);
	}
}
