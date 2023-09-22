import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';
import { Pal } from '../entities/Pal';
import { getRepository } from 'typeorm';
import { autoInjectable, container, inject, singleton } from "tsyringe";
import { Book } from '../entities/Book';
import { PalService } from '../services/PalService';
import { BookService } from '../services/BookService';

@singleton()
@JsonController('/pals')
export class PalController {
  constructor( private readonly palService: PalService, private readonly bookService: BookService) {
    this.palService = container.resolve(PalService);
    this.bookService = container.resolve(BookService);
  }

  @Get('/')
  async getAllTasks(): Promise<Pal[] | string> {
    return this.palService.getAllPals();
  }

  @Post('/:bookId/add-pal')
  async addPal(
    @Param('bookId') bookId: number,
    @Body() palData:Pal  ): Promise<Pal | undefined> {
    // 1. Create a new book and assign it to the user.
    const book = await this.bookService.getBookById(bookId);
    if (book == null) {
      throw new Error(`Book with ID ${bookId} not found.`);
    }

    const palInfo = await this.palService.createPal({ ...palData, book });

    return palInfo;
  }

  @Put('/:palId/update-pal')
  async updatePal(
    @Param('palId') palId: number,
    @Body() palData:Pal  ): Promise<Pal | undefined> {
    // 1. Create a new book and assign it to the user.
    const palIdentified = await this.palService.getPalById(palId);
    if (palIdentified == null) {
      throw new Error(`Pal with ID ${palId} not found.`);
    }
    console.log("Pal Data ==== ", palData);
    const palInfo = await this.palService.updatePal({ ...palData}, palId);

    return palInfo;
  }

  @Delete('/:id')
  async deletePal(@Param('id') id: number): Promise<Pal | string | undefined> {
    return this.palService.deletePal(id);
  }
}
