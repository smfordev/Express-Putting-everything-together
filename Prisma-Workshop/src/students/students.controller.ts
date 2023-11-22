import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Prisma, Student } from '@prisma/client';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService){}

    @Get()
    async findAll(): Promise<Student[]> {
        return this.studentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): 
    Promise<Student> {
        return this.studentsService.findOne({id: Number(id)});
    }

    @Post()
    create(@Body() createStudent: Prisma.StudentCreateInput): 
    Promise<Student> {
        return this.studentsService.create(createStudent);
    }

    @Put(':id')
    update(@Param('id') id: string, 
    @Body() updateStudent: Prisma.StudentUpdateInput): 
    Promise<Student> {
        return this.studentsService.update({id: Number(id)}, updateStudent);
    }

    @Delete(':id')
    delete(@Param('id') id: string): 
    Promise<Student> {
        return this.studentsService.delete({id: Number(id)});
    }
}
