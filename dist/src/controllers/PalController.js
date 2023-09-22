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
exports.PalController = void 0;
const routing_controllers_1 = require("routing-controllers");
const Pal_1 = require("../entities/Pal");
const tsyringe_1 = require("tsyringe");
const PalService_1 = require("../services/PalService");
const BookService_1 = require("../services/BookService");
let PalController = class PalController {
    palService;
    bookService;
    constructor(palService, bookService) {
        this.palService = palService;
        this.bookService = bookService;
        this.palService = tsyringe_1.container.resolve(PalService_1.PalService);
        this.bookService = tsyringe_1.container.resolve(BookService_1.BookService);
    }
    async getAllTasks() {
        return this.palService.getAllPals();
    }
    async addPal(bookId, palData) {
        // 1. Create a new book and assign it to the user.
        const book = await this.bookService.getBookById(bookId);
        if (book == null) {
            throw new Error(`Book with ID ${bookId} not found.`);
        }
        const palInfo = await this.palService.createPal({ ...palData, book });
        return palInfo;
    }
    async updatePal(palId, palData) {
        // 1. Create a new book and assign it to the user.
        const palIdentified = await this.palService.getPalById(palId);
        if (palIdentified == null) {
            throw new Error(`Pal with ID ${palId} not found.`);
        }
        console.log("Pal Data ==== ", palData);
        const palInfo = await this.palService.updatePal({ ...palData }, palId);
        return palInfo;
    }
    async deletePal(id) {
        return this.palService.deletePal(id);
    }
};
exports.PalController = PalController;
__decorate([
    (0, routing_controllers_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PalController.prototype, "getAllTasks", null);
__decorate([
    (0, routing_controllers_1.Post)('/:bookId/add-pal'),
    __param(0, (0, routing_controllers_1.Param)('bookId')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Pal_1.Pal]),
    __metadata("design:returntype", Promise)
], PalController.prototype, "addPal", null);
__decorate([
    (0, routing_controllers_1.Put)('/:palId/update-pal'),
    __param(0, (0, routing_controllers_1.Param)('palId')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Pal_1.Pal]),
    __metadata("design:returntype", Promise)
], PalController.prototype, "updatePal", null);
__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PalController.prototype, "deletePal", null);
exports.PalController = PalController = __decorate([
    (0, tsyringe_1.singleton)(),
    (0, routing_controllers_1.JsonController)('/pals'),
    __metadata("design:paramtypes", [PalService_1.PalService, BookService_1.BookService])
], PalController);
