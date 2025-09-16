import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor (private prisma: PrismaService) {}

    async create(dto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.prisma.user.create({
            data: { ...dto, password: hashedPassword, deleted: false},
        });
    }

    findAll() {
        return this.prisma.user.findMany({ where: { deleted: false} });
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: {email } });
    }

    async update(id: number, dto: UpdateUserDto) {
        return this.prisma.user.update({ where: { id }, data: dto });
    }

    async remove(id: number) {
        return this.prisma.user.update({ where: { id }, data: { deleted: true } });
    }

    findDeleted() {
        return this.prisma.user.findMany({ where: { deleted: true } });
    }
}