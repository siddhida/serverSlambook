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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
let User = class User {
    id;
    name;
    email_id;
    is_authenticated;
    is_loggedin;
    last_loggedIn;
    books;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Sid' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'jhasiddhida@gmail.com' }),
    __metadata("design:type", String)
], User.prototype, "email_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "is_authenticated", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "is_loggedin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Object)
], User.prototype, "last_loggedIn", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Book_1.Book, (book) => book.user, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'book_id' }),
    __metadata("design:type", Array)
], User.prototype, "books", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
