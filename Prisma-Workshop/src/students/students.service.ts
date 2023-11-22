import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {Student, Prisma} from '@prisma/client';


@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) {}

    async create(student: Prisma.StudentCreateInput): Promise<Student> {
        return this.prisma.student.create({
        data: student,
        });
    }

    async findAll(): Promise<Student[]> {
        return this.prisma.student.findMany();
    }

    async findOne(id: Prisma.StudentWhereUniqueInput): 
    Promise<Student | null>  {
        return this.prisma.student.findUnique({
        where: id ,
        });
    }

    async update(id: Prisma.StudentWhereUniqueInput, 
        updateStudent: Prisma.StudentUpdateInput): Promise<Student> {
        return this.prisma.student.update({
        where: id ,
        data: updateStudent,
        });
  }

  async delete(id: Prisma.StudentWhereUniqueInput): Promise<Student> {
    return this.prisma.student.delete({
      where: id ,
    });
  }
}
