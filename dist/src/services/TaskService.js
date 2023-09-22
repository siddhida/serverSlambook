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
exports.TaskService = void 0;
const tsyringe_1 = require("tsyringe");
const Task_1 = require("./../entities/Task");
const typeorm_1 = require("typeorm");
const routing_controllers_1 = require("routing-controllers");
let TaskService = class TaskService {
    taskRepo;
    constructor() {
        this.taskRepo = (0, typeorm_1.getRepository)(Task_1.Task);
    }
    async getAllTasks() {
        // const userRepository = getRepository(User);
        return this.taskRepo.find();
    }
    async getOneTask(id) {
        // console.log("ID is ==== ", id);
        const resp = await this.taskRepo.findOneOrFail({ where: { id } });
        // console.log("Resp ==== ", resp);
        if (resp) {
            return resp;
        }
        return 'Not Found';
    }
    async addTask(task) {
        // console.log("Body ==== ", user);
        // const userRepository = getRepository(User);
        let resp = await this.taskRepo.save(this.taskRepo.create(task));
        // const resp = await userRepository.save(userRepository.create({ username: 'peela', email: 'peela@here.com' }));
        if (resp) {
            return "Saved";
        }
        return 'Not Saved';
    }
};
exports.TaskService = TaskService;
__decorate([
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "getOneTask", null);
__decorate([
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "addTask", null);
exports.TaskService = TaskService = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], TaskService);
