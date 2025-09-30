// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.preload({
      id,
      ...updateTaskDto,
    });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return this.taskRepository.save(task);
  }

  async remove(id: string) {
    const task = await this.findOne(id);
    return this.taskRepository.remove(task);
  }
}
