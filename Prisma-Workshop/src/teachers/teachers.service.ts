import { Injectable } from '@nestjs/common';
import { Prisma, Teacher } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeachersService {
    constructor(private prisma: PrismaService) {}
 
    async create(createTeacher: Prisma.TeacherCreateInput): 
    Promise<Teacher> {
        return this.prisma.teacher.create({
            data: createTeacher,
        });
    }
    
    async findAll(): Promise<Teacher[]> {
        return this.prisma.teacher.findMany();
    }

    async findOne(id: Prisma.TeacherWhereUniqueInput): 
    Promise<Teacher> {
        return this.prisma.teacher.findUnique({
        where: id,
        });
    }

    async update(id: Prisma.TeacherWhereUniqueInput, 
        updateTeacher: Prisma.TeacherUpdateInput): Promise<Teacher> {
        return this.prisma.teacher.update({
        where: id,
        data: updateTeacher,
        });
    }

    async delete(id: Prisma.TeacherWhereUniqueInput): Promise<Teacher> {
        return this.prisma.teacher.delete({
        where: id,
        });
    }
}
