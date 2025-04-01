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
}
