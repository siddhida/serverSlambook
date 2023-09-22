import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';
import { Task } from '../entities/Task';
import { getRepository } from 'typeorm';
import { autoInjectable, container, inject, singleton } from "tsyringe";
import { TaskService } from '../services/TaskService';

@singleton()
@JsonController('/tasks')
export class TaskController {
  // private taskRepository = getRepository(Task);
  constructor( private readonly taskService: TaskService) {
    this.taskService = container.resolve(TaskService);
  }

  @Get('/')
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
    // return await this.taskRepository.find();
  }

  @Get('/:id')
  async getTask(@Param('id') id: number): Promise<Task | undefined | null | string> {
    // return await this.taskRepository.findOne(id);
    return this.taskService.getOneTask(id);
    // return await this.taskRepository.findOne({where: {id: Number(id)}});
  }

  @Post('/')
  async createTask(@Body() task: Task): Promise<Task|string> {
    return this.taskService.addTask(task);
    // return await this.taskRepository.save(task);
  }

  // @Put('/:id')
  // async updateTask(@Param('id') id: number, @Body() updatedTask: Task): Promise<Task | undefined | null> {
  //   await this.taskRepository.update(id, updatedTask);
  //   // return await this.taskRepository.findOne(id);
  //   return await this.taskRepository.findOne({where: {id: Number(id)}});
  // }

  // @Delete('/:id')
  // async deleteTask(@Param('id') id: number): Promise<void> {
  //   // await this.taskRepository.delete(id);
  //   await this.taskRepository.delete({id: Number(id)});
  // }
}
