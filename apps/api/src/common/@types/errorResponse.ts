export type ErrorResponse = {
	statusCode: number;
	body: {
		message: string;
		errors?: Array<{ field: string; message: string }>;
	};
};
