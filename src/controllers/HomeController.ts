import { JsonController, Get, Post, Put, Delete, Param, Body, Controller } from 'routing-controllers';
import { autoInjectable, container, inject, singleton } from "tsyringe";

@singleton()
@Controller('/')
export class HomeController {

  @Get('/')
  async getMainROute(): Promise<string> {
    return "Hello Vercel!!!";
    
  }

}