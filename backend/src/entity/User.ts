import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
import { ErrorMessages } from '../tools';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
    id!: number;

  @Column()
  @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
    username!: string;

  @Column()
  @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
    firstname!: string;

  @Column()
  @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
    lastname!: string; 

  @Column()
  @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
  @IsEmail(undefined, { message: ErrorMessages.IsNotValidEmail })
    email!: string;

  @Column({ select: false })
  @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
  @MinLength(8, { message: "Password " + ErrorMessages.TooShortPassword})
  @MaxLength(50, { message: "Password " + ErrorMessages.TooLongPassword})
    password!: string;

  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user"
  })
    role!: UserRole;

  setPassword = (password: string) => {
    return (this.password = bcrypt.hashSync(password, 10));
  };

  isValidPassword = (password: string) => {
    return bcrypt.compareSync(password, this.password);
  };

  generateJWT = () => {
    return jwt.sign(
      {
        id: this.id,
      },
      jwtConfig.jwtSecret,
      {expiresIn: "1h"}
    )
  };
}

export type UserRole = "admin" | "user";
