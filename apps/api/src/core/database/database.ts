import { DataSource } from "typeorm";

import userEntity from "@/modules/user/entities/users";

export default function createDataSource() {
	return new DataSource({
		type: "sqlite",
		database: "./db.sqlite",
		entities: [userEntity],
		synchronize: true,
		logging: true,
	});
}
