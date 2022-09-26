import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { ErrorMessages } from '../tools';
import { User } from './User';
import { Category } from './Category';

@Entity({ name: "posts" })
export class Post{
    @PrimaryGeneratedColumn({ name: 'post_id' })
    id!: number;

    @Column()
    @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
    title!: string;

    @Column()
    @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
    content!: string;

    @Column()
    @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
    @IsUrl(undefined, { message: ErrorMessages.IsNotValidURL })
    url!: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at!: Date;

    @Column({ name: 'user_id' })
    user_id!: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user!: User[];

    @Column({ name: 'category_id' })
    category_id!: number;

    @ManyToOne(type => Category)
    @JoinColumn({ name: 'category_id' })
    category!: Category;

}