import { injectable, singleton } from "tsyringe";
import { Pal } from "./../entities/Pal";
import { Book } from "./../entities/Book";
import { Repository, getRepository } from "typeorm";
import { Param, Body } from "routing-controllers";

@singleton()
export class PalService {
private readonly palRepo: Repository<Pal>;
private readonly bookRepo: Repository<Book>;

constructor(){
  this.palRepo = getRepository(Pal);
  this.bookRepo = getRepository(Book);
}


  async getAllPals(): Promise<Pal[]| string> {
    // const userRepository = getRepository(User);
    // return this.taskRepo.find();
    return "Pals"
}

// async createPal(palData: Partial<Pal>): Promise<Pal> {
async createPal(palData: Partial<Pal>): Promise<Pal> {
  const palInfo = this.palRepo.create(palData);
  return this.palRepo.save(palInfo);
}

async deletePal(id: number): Promise<Pal | string | undefined> {
  const identifiedPal = this.palRepo.findOneOrFail({where: {id}});
  if(identifiedPal == null){
    return `Pal with id ${id} not found`
  }
  await this.palRepo.delete(id);
  return `Pal with id ${id} successfully deleted `
}

async getPalById(id:number): Promise<Pal> {
  return this.palRepo.findOneOrFail({where: {id}})
}

async updatePal(palData: Partial<Pal>, palId: number): Promise<Pal> {
  await this.palRepo.update(palId, palData);
  return this.getPalById(palId);
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