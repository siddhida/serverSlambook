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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PalService = void 0;
const tsyringe_1 = require("tsyringe");
const Pal_1 = require("./../entities/Pal");
const Book_1 = require("./../entities/Book");
const typeorm_1 = require("typeorm");
let PalService = class PalService {
    palRepo;
    bookRepo;
    constructor() {
        this.palRepo = (0, typeorm_1.getRepository)(Pal_1.Pal);
        this.bookRepo = (0, typeorm_1.getRepository)(Book_1.Book);
    }
    async getAllPals() {
        // const userRepository = getRepository(User);
        // return this.taskRepo.find();
        return "Pals";
    }
    // async createPal(palData: Partial<Pal>): Promise<Pal> {
    async createPal(palData) {
        const palInfo = this.palRepo.create(palData);
        return this.palRepo.save(palInfo);
    }
    async deletePal(id) {
        const identifiedPal = this.palRepo.findOneOrFail({ where: { id } });
        if (identifiedPal == null) {
            return `Pal with id ${id} not found`;
        }
        await this.palRepo.delete(id);
        return `Pal with id ${id} successfully deleted `;
    }
    async getPalById(id) {
        return this.palRepo.findOneOrFail({ where: { id } });
    }
    async updatePal(palData, palId) {
        await this.palRepo.update(palId, palData);
        return this.getPalById(palId);
    }
};
exports.PalService = PalService;
exports.PalService = PalService = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], PalService);
