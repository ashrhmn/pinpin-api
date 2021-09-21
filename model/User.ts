import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("Users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ nullable: false, default: "" })
  email!: string;

  @Column({ nullable: false, default: "" })
  name!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
