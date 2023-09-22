import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';
import { getRepository } from 'typeorm';
import { autoInjectable, container, inject, singleton } from "tsyringe";
import { BookService } from './../services/BookService';
import { UserService } from '../services/UserService';
import { Book } from '../entities/Book';
import { User } from '../entities/User';

@singleton()
@JsonController('/books')
export class BookController {
  // private taskRepository = getRepository(Task);
  constructor( private readonly bookService: BookService, private readonly userService: UserService) {
    this.bookService = container.resolve(BookService);
    this.userService = container.resolve(UserService);
  }

  @Get('/')
  async getAllBooks(): Promise<Book[] | string> {
    return this.bookService.getAllBooks();
    // return await this.taskRepository.find();
  }

  // @Post('/')
  // // @UseBefore(raw({ type: "application/json" }))
  // async createBook(@Body() bookInfo: any): Promise<Book | string> {
  //   return this.bookService.addBook(bookInfo);
  // }

  @Post('/:userId/add-book')
  async addBook(
    @Param('userId') userId: number,
    @Body() bookData:Book  ): Promise<User | undefined> {
    const user = await this.userService.getUserById(userId);
    if (user == null) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    await this.bookService.createBook({ ...bookData, user });
    return user;
  }

  @Put('/:bookId/update-book')
  async updateBook(
    @Param('bookId') bookId: number,
    @Body() bookData:Book  ): Promise<Book | undefined> {
    // 1. Create a new book and assign it to the user.
    const bookIdentified = await this.bookService.getBookById(bookId);
    if (bookIdentified == null) {
      throw new Error(`Pal with ID ${bookId} not found.`);
    }
    console.log("Book Data ==== ", bookData);
    const bookInfo = await this.bookService.updateBook({ ...bookData}, bookId);

    return bookInfo;
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: number): Promise<Book | string | undefined> {
    return this.bookService.deleteBook(id);
  }


}