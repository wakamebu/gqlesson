import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { CreateTaskInput } from './dto/createTask.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
    constructor(private readonly prismaService: PrismaService) {}
  
    async getTasks(): Promise<Task[]> {
        return await this.prismaService.task.findMany();
    }

    async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
        const {name, dueDate, description} = createTaskInput;
        return await this.prismaService.task.create({
            data: {
                name,
                dueDate,
                description,
            }
        });
    }
}
