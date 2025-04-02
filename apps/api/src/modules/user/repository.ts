import type { Repository } from "typeorm";

import { dataSource } from "@/common/handlers/handlerDatabase";

import userEntity from "./entities/users";

import type createUser from "./dto/createUser";

export default class userRepository {
	private repository: Repository<userEntity>;

	constructor() {
		this.repository = dataSource.getRepository(userEntity);
	}

	async findById(id: string): Promise<userEntity | null> {
		return this.repository.findOneBy({ id });
	}

	async create(user: createUser): Promise<userEntity> {
		const newUser = this.repository.create(user);
		return this.repository.save(newUser);
	}

	async delete(id: string): Promise<void> {
		await this.repository.delete(id);
	}

	async login(data: {
		login: string;
		password: string;
	}): Promise<userEntity | null> {
		const user = await this.repository.findOneBy({ login: data.login });

		if (!user || user.password !== data.password) {
			throw new Error("INVALID_CREDENTIALS");
		}

		if (!user) throw new Error("INVALID_CREDENTIALS");

		return user;
	}
}
