import { injectable, singleton } from "tsyringe";
import { Task } from "./../entities/Task";
import { Repository, getRepository } from "typeorm";
import { Param, Body } from "routing-controllers";

@singleton()
export class TaskService {
private readonly taskRepo: Repository<Task>;

constructor(){
  this.taskRepo = getRepository(Task);
}


  async getAllTasks(): Promise<Task[]> {
    // const userRepository = getRepository(User);
    return this.taskRepo.find();
}

async getOneTask(@Param('id') id: number): Promise<Task|string> {
  // console.log("ID is ==== ", id);
  const resp = await this.taskRepo.findOneOrFail({where: {id}});
  // console.log("Resp ==== ", resp);
  if(resp){
    return resp;
  }
  return 'Not Found';
}

async addTask(@Body() task:any):Promise<Task| string>{
  // console.log("Body ==== ", user);
  // const userRepository = getRepository(User);
  let resp = await this.taskRepo.save(this.taskRepo.create(task));
  // const resp = await userRepository.save(userRepository.create({ username: 'peela', email: 'peela@here.com' }));
  if(resp){
    return "Saved"
  }
  return 'Not Saved'
  
}

}