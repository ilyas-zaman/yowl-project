import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ErrorMessages } from '../tools';

@Entity({ name: "categories" })
export class Category{
    @PrimaryGeneratedColumn({ name: 'category_id' })
    id!: number;

    @Column({ name: 'category_name' })
    @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
    name!: string;

}