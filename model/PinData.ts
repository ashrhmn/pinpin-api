import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class PinData extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    username!:string

    @Column()
    name!:string

    @Column()
    description!:string

    @Column()
    secret!:string

}