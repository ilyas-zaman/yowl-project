import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ErrorMessages } from '../tools';
import { User } from './User';
import { Post } from './Post';

@Entity({ name: "comments" })
export class Comment{
    @PrimaryGeneratedColumn({ name: 'comment_id' })
    id!: number;

    @Column()
    @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
    content!: string;

    @Column({ name: 'post_id' })
    @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
    post_id!: number;

    @ManyToOne(type => Post)
    @JoinColumn({ name: 'post_id' })
    post!: Post;

    @Column({ name: 'user_id' })
    user_id!: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at!: Date;

}