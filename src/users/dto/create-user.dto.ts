import { IsEmail, MinLength, IsInt, Min } from "@nestjs/class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @MinLength(6, { message: 'The password needs to contain the minimun of 6 characters'})
    password: string;

    @IsInt()
    @Min(1)
    level: number;
}