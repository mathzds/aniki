import createDataSource from "@/core/database/database";

export const dataSource = createDataSource();

export default async function () {
	await dataSource
		.initialize()
		.then(() => {
			console.log("Database connected");
		})
		.catch((err) => {
			console.error(err);
		});
}
