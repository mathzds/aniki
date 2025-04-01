import userRepository from "./repository";

import type userEntity from "./entities/users";

import type createUser from "./dto/createUser";

export default class userServices {
	private repository: userRepository;
	constructor() {
		this.repository = new userRepository();
	}

	async findById(id: string): Promise<userEntity | null> {
		return await this.repository.findById(id).catch(() => {
			throw new Error("USER_NOT_FOUND");
		});
	}

	async create(user: createUser): Promise<userEntity> {
		return await this.repository.create(user).catch(() => {
			throw new Error("USER_ALREADY_EXISTS");
		});
	}

	async delete(id: string): Promise<void> {
		return await this.repository.delete(id).catch(() => {
			throw new Error("USER_NOT_FOUND");
		});
	}
}
