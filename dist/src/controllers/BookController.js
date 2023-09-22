"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const routing_controllers_1 = require("routing-controllers");
const tsyringe_1 = require("tsyringe");
const BookService_1 = require("./../services/BookService");
const UserService_1 = require("../services/UserService");
const Book_1 = require("../entities/Book");
let BookController = class BookController {
    bookService;
    userService;
    // private taskRepository = getRepository(Task);
    constructor(bookService, userService) {
        this.bookService = bookService;
        this.userService = userService;
        this.bookService = tsyringe_1.container.resolve(BookService_1.BookService);
        this.userService = tsyringe_1.container.resolve(UserService_1.UserService);
    }
    async getAllBooks() {
        return this.bookService.getAllBooks();
        // return await this.taskRepository.find();
    }
    // @Post('/')
    // // @UseBefore(raw({ type: "application/json" }))
    // async createBook(@Body() bookInfo: any): Promise<Book | string> {
    //   return this.bookService.addBook(bookInfo);
    // }
    async addBook(userId, bookData) {
        const user = await this.userService.getUserById(userId);
        if (user == null) {
            throw new Error(`User with ID ${userId} not found.`);
        }
        await this.bookService.createBook({ ...bookData, user });
        return user;
    }
    async updateBook(bookId, bookData) {
        // 1. Create a new book and assign it to the user.
        const bookIdentified = await this.bookService.getBookById(bookId);
        if (bookIdentified == null) {
            throw new Error(`Pal with ID ${bookId} not found.`);
        }
        console.log("Book Data ==== ", bookData);
        const bookInfo = await this.bookService.updateBook({ ...bookData }, bookId);
        return bookInfo;
    }
    async deleteBook(id) {
        return this.bookService.deleteBook(id);
    }
};
exports.BookController = BookController;
__decorate([
    (0, routing_controllers_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAllBooks", null);
__decorate([
    (0, routing_controllers_1.Post)('/:userId/add-book'),
    __param(0, (0, routing_controllers_1.Param)('userId')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Book_1.Book]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "addBook", null);
__decorate([
    (0, routing_controllers_1.Put)('/:bookId/update-book'),
    __param(0, (0, routing_controllers_1.Param)('bookId')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Book_1.Book]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateBook", null);
__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteBook", null);
exports.BookController = BookController = __decorate([
    (0, tsyringe_1.singleton)(),
    (0, routing_controllers_1.JsonController)('/books'),
    __metadata("design:paramtypes", [BookService_1.BookService, UserService_1.UserService])
], BookController);
