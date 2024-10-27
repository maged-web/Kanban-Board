import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'members'})
export class Member{
@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;


@Column()
title:string;

@Column()
age: number;

@Column({ unique: true })
email: string;

@Column()
phone: string;

@Column({ default: 'Unclaimed' })
status: string;

}