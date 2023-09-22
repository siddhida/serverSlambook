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
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const User_1 = require("./../entities/User");
const typeorm_1 = require("typeorm");
const routing_controllers_1 = require("routing-controllers");
let UserService = class UserService {
    userRepo;
    constructor() {
        this.userRepo = (0, typeorm_1.getRepository)(User_1.User);
    }
    async getAllUsers() {
        return this.userRepo.find({
            where: {},
            relations: ['books', 'books.pals']
        });
    }
    async addUser(user) {
        let resp = await this.userRepo.save(this.userRepo.create(user));
        // const resp = await userRepository.save(userRepository.create({ username: 'peela', email: 'peela@here.com' }));
        // console.log('Resp ==== ', resp);
        if (resp) {
            return 'Saved';
        }
        return 'Not Saved';
    }
    async getUserById(id) {
        return this.userRepo.findOneOrFail({ where: { id }, relations: ['books', 'books.pals'] });
    }
    async updateUser(userData, userId) {
        await this.userRepo.update(userId, userData);
        return this.getUserById(userId);
    }
    async deleteUser(id) {
        const identifiedUser = this.userRepo.findOneOrFail({ where: { id } });
        if (identifiedUser == null) {
            return `User with id ${id} not found`;
        }
        await this.userRepo.delete(id);
        return `User with id ${id} successfully deleted `;
    }
};
exports.UserService = UserService;
__decorate([
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "addUser", null);
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], UserService);
