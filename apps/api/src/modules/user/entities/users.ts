import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export default class userEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", length: 255, nullable: false, unique: true })
	login!: string;

	@Column({ type: "varchar", length: 255, nullable: false })
	password!: string;
}
