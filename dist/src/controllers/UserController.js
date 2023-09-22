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
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const User_1 = require("../entities/User");
const tsyringe_1 = require("tsyringe");
const UserService_1 = require("../services/UserService");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
        this.userService = tsyringe_1.container.resolve(UserService_1.UserService);
    }
    async getAllUsers() {
        return this.userService.getAllUsers();
        // return await this.taskRepository.find();
    }
    async createUser(user) {
        // console.log('Post FUNCT ==== ', user);
        return this.userService.addUser(user);
    }
    async updateUser(userId, bookData) {
        // 1. Create a new book and assign it to the user.
        const userIdentified = await this.userService.getUserById(userId);
        if (userIdentified == null) {
            throw new Error(`Pal with ID ${userId} not found.`);
        }
        console.log("Pal Data ==== ", bookData);
        const userInfo = await this.userService.updateUser({ ...bookData }, userId);
        return userInfo;
    }
    async deleteUser(id) {
        return this.userService.deleteUser(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, routing_controllers_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, routing_controllers_1.Post)('/'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, routing_controllers_1.Put)('/:userId/update-user'),
    __param(0, (0, routing_controllers_1.Param)('userId')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, User_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, tsyringe_1.singleton)(),
    (0, routing_controllers_1.JsonController)('/users'),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
