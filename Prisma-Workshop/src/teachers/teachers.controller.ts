import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Prisma, Teacher } from '@prisma/client';

@Controller('teachers')
export class TeachersController {
    constructor(private readonly teachersService: TeachersService){}

    @Get()
    async findAll(): Promise<Teacher[]> {
        return this.teachersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): 
    Promise<Teacher> {
        return this.teachersService.findOne({id: Number(id)});
    }

    @Post()
    create(@Body() createTeacher: Prisma.TeacherCreateInput): 
    Promise<Teacher> {
        return this.teachersService.create(createTeacher);
    }

    @Put(':id')
    update(@Param('id') id: string, 
    @Body() updateTeacher: Prisma.TeacherUpdateInput): 
    Promise<Teacher> {
        return this.teachersService.update({id: Number(id)}, updateTeacher);
    }

    @Delete(':id')
    delete(@Param('id') id: string): 
    Promise<Teacher> {
        return this.teachersService.delete({id: Number(id)});
    }
}
