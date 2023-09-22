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
exports.TaskController = void 0;
const routing_controllers_1 = require("routing-controllers");
const Task_1 = require("../entities/Task");
const tsyringe_1 = require("tsyringe");
const TaskService_1 = require("../services/TaskService");
let TaskController = class TaskController {
    taskService;
    // private taskRepository = getRepository(Task);
    constructor(taskService) {
        this.taskService = taskService;
        this.taskService = tsyringe_1.container.resolve(TaskService_1.TaskService);
    }
    async getAllTasks() {
        return this.taskService.getAllTasks();
        // return await this.taskRepository.find();
    }
    async getTask(id) {
        // return await this.taskRepository.findOne(id);
        return this.taskService.getOneTask(id);
        // return await this.taskRepository.findOne({where: {id: Number(id)}});
    }
    async createTask(task) {
        return this.taskService.addTask(task);
        // return await this.taskRepository.save(task);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, routing_controllers_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getAllTasks", null);
__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTask", null);
__decorate([
    (0, routing_controllers_1.Post)('/'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Task_1.Task]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
exports.TaskController = TaskController = __decorate([
    (0, tsyringe_1.singleton)(),
    (0, routing_controllers_1.JsonController)('/tasks'),
    __metadata("design:paramtypes", [TaskService_1.TaskService])
], TaskController);
