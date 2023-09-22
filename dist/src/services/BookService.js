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
exports.BookService = void 0;
const tsyringe_1 = require("tsyringe");
const Book_1 = require("./../entities/Book");
const typeorm_1 = require("typeorm");
const routing_controllers_1 = require("routing-controllers");
let BookService = class BookService {
    bookRepo;
    constructor() {
        this.bookRepo = (0, typeorm_1.getRepository)(Book_1.Book);
    }
    async getAllBooks() {
        // const userRepository = getRepository(User);
        return this.bookRepo.find();
        // return "Books"
    }
    async addBook(bookInfo) {
        let resp = await this.bookRepo.save(this.bookRepo.create(bookInfo));
        // const resp = await userRepository.save(userRepository.create({ username: 'peela', email: 'peela@here.com' }));
        console.log('Resp ==== ', resp);
        if (resp) {
            return 'Saved';
        }
        return 'Not Saved';
    }
    async createBook(bookData) {
        const book = this.bookRepo.create(bookData);
        return this.bookRepo.save(book);
    }
    async getBookById(id) {
        return this.bookRepo.findOneOrFail({ where: { id } });
    }
    async updateBook(bookData, bookId) {
        await this.bookRepo.update(bookId, bookData);
        return this.getBookById(bookId);
    }
    async deleteBook(id) {
        const identifiedBook = this.bookRepo.findOneOrFail({ where: { id } });
        if (identifiedBook == null) {
            return `Book with id ${id} not found`;
        }
        await this.bookRepo.delete(id);
        return `Book with id ${id} successfully deleted `;
    }
};
exports.BookService = BookService;
__decorate([
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookService.prototype, "addBook", null);
exports.BookService = BookService = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], BookService);
