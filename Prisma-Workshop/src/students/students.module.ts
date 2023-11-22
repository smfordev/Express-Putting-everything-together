import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [StudentsController],
    providers: [StudentsService, PrismaService]
})
export class StudentsModule {}
