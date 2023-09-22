import { injectable, singleton } from "tsyringe";
import { Book } from "./../entities/Book";
import { Repository, getRepository } from "typeorm";
import { Param, Body } from "routing-controllers";

@singleton()
export class BookService {
private readonly bookRepo: Repository<Book>;

constructor(){
  this.bookRepo = getRepository(Book);
}
  async getAllBooks(): Promise<Book[]| string> {
    // const userRepository = getRepository(User);
    return this.bookRepo.find();
    // return "Books"
}

async addBook(@Body() bookInfo: any): Promise<Book | string> {
  let resp = await this.bookRepo.save(this.bookRepo.create(bookInfo));
  // const resp = await userRepository.save(userRepository.create({ username: 'peela', email: 'peela@here.com' }));
  console.log('Resp ==== ', resp);
  if (resp) {
    return 'Saved';
  }
  return 'Not Saved';
}

async createBook(bookData: Partial<Book>): Promise<Book> {
  const book = this.bookRepo.create(bookData);
  return this.bookRepo.save(book);
}

async getBookById(id: number): Promise<Book> {
  return this.bookRepo.findOneOrFail({where: {id}});
}

async updateBook(bookData: Partial<Book>, bookId: number): Promise<Book> {
  await this.bookRepo.update(bookId, bookData);
  return this.getBookById(bookId);
}

async deleteBook(id: number): Promise<Book | string | undefined> {
  const identifiedBook = this.bookRepo.findOneOrFail({where: {id}});
  if(identifiedBook == null){
    return `Book with id ${id} not found`
  }
  await this.bookRepo.delete(id);
  return `Book with id ${id} successfully deleted `
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