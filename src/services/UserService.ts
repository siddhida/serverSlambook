import { injectable, singleton } from 'tsyringe';
import { User } from './../entities/User';
import { Repository, getRepository } from 'typeorm';
import { Param, Body } from 'routing-controllers';
import { Book } from '../entities/Book';

@singleton()
export class UserService {
  private readonly userRepo: Repository<User>;

  constructor() {
    this.userRepo = getRepository(User);
  }

  async getAllUsers(): Promise<User[] | string> {
    return this.userRepo.find({
        where:{},
        relations:['books', 'books.pals']
    });
  }

  async addUser(@Body() user: any): Promise<User | string> {
    let resp = await this.userRepo.save(this.userRepo.create(user));
    // const resp = await userRepository.save(userRepository.create({ username: 'peela', email: 'peela@here.com' }));
    // console.log('Resp ==== ', resp);
    if (resp) {
      return 'Saved';
    }
    return 'Not Saved';
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepo.findOneOrFail({where: {id}, relations:['books', 'books.pals']});
  }

  async updateUser(userData: Partial<User>, userId: number): Promise<User> {
    await this.userRepo.update(userId, userData);
    return this.getUserById(userId);
  }

  async deleteUser(id: number): Promise<User | string | undefined> {
    const identifiedUser = this.userRepo.findOneOrFail({where: {id}});
    if(identifiedUser == null){
      return `User with id ${id} not found`
    }
    await this.userRepo.delete(id);
    return `User with id ${id} successfully deleted `
  }

  // async getOneTask(@Param('id') id: number): Promise<Task|string> {
  //   // const userRepository = getRepository(User);
  //   // console.log("ID is ==== ", id);
  //   const resp = await this.taskRepo.findOneOrFail({where: {id}});
  //   // console.log("Resp ==== ", resp);
  //   if(resp){
  //     return resp;
  //   }
  //   return 'Not Found';
  // }

  // async addTask(@Body() task:any):Promise<Task| string>{
  //   // console.log("Body ==== ", user);
  //   // const userRepository = getRepository(User);
  //   let resp = await this.taskRepo.save(this.taskRepo.create(task));
  //   // const resp = await userRepository.save(userRepository.create({ username: 'peela', email: 'peela@here.com' }));
  //   if(resp){
  //     return "Saved"
  //   }
  //   return 'Not Saved'

  // }
}
