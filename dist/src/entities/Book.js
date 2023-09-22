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
exports.Book = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Pal_1 = require("./Pal");
let Book = class Book {
    id;
    name;
    access_to_read_granted;
    access_to_write_granted;
    access_to_read_granted_to;
    access_to_write_granted_to;
    // @OneToOne(() => User)
    //   @JoinColumn({ name: 'userId' })
    //   user!: User;
    user;
    pals;
};
exports.Book = Book;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Book.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Book.prototype, "access_to_read_granted", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Book.prototype, "access_to_write_granted", void 0);
__decorate([
    (0, typeorm_1.Column)('text', {
        array: true,
        nullable: true,
        default: ['siddhidajha@gmail.com'],
    }),
    __metadata("design:type", String)
], Book.prototype, "access_to_read_granted_to", void 0);
__decorate([
    (0, typeorm_1.Column)('text', {
        array: true,
        nullable: true,
        default: ['siddhidajha@gmail.com'],
    }),
    __metadata("design:type", Array)
], Book.prototype, "access_to_write_granted_to", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.books),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User_1.User)
], Book.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Pal_1.Pal, (pal) => pal.book, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Book.prototype, "pals", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)()
], Book);
