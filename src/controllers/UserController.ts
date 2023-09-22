import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';
import { autoInjectable, container, inject, singleton } from "tsyringe";
import { UserService } from '../services/UserService';

@singleton()
@JsonController('/users')
export class UserController {
  constructor( private readonly userService: UserService) {
    this.userService = container.resolve(UserService);
  }

  @Get('/')
  async getAllUsers(): Promise<User[] | string> {
    return this.userService.getAllUsers();
    // return await this.taskRepository.find();
  }

  @Post('/')
  async createUser(@Body() user: any): Promise<User | string> {
    // console.log('Post FUNCT ==== ', user);
    return this.userService.addUser(user);
  }

  @Put('/:userId/update-user')
  async updateUser(
    @Param('userId') userId: number,
    @Body() bookData:User  ): Promise<User | undefined> {
    // 1. Create a new book and assign it to the user.
    const userIdentified = await this.userService.getUserById(userId);
    if (userIdentified == null) {
      throw new Error(`Pal with ID ${userId} not found.`);
    }
    console.log("Pal Data ==== ", bookData);
    const userInfo = await this.userService.updateUser({ ...bookData}, userId);

    return userInfo;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<User | string | undefined> {
    return this.userService.deleteUser(id);
  }

}