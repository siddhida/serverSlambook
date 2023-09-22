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
exports.Pal = void 0;
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
let Pal = class Pal {
    id;
    name;
    nick_name;
    email_id;
    phone_number;
    // @Column({default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    dob;
    likes;
    dislikes;
    current_crush;
    current_employment_status;
    current_relationship_status;
    current_education_status;
    one_word_about_me;
    one_paragraph_about_me;
    one_complaint_about_me;
    access_to_read_pal_granted;
    access_to_write_pal_granted;
    access_to_write_pal_granted_to;
    access_to_read_pal_granted_to;
    book;
};
exports.Pal = Pal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pal.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pal' }),
    __metadata("design:type", String)
], Pal.prototype, "nick_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'jhasiddhida@gmail.com' }),
    __metadata("design:type", String)
], Pal.prototype, "email_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '7294110530' }),
    __metadata("design:type", String)
], Pal.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Pal.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'icecream, food, fight, offline games,reading' }),
    __metadata("design:type", String)
], Pal.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'fight, reels, PubG game' }),
    __metadata("design:type", String)
], Pal.prototype, "dislikes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'PalPal' }),
    __metadata("design:type", String)
], Pal.prototype, "current_crush", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Complex' }),
    __metadata("design:type", String)
], Pal.prototype, "current_employment_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'complicated' }),
    __metadata("design:type", String)
], Pal.prototype, "current_relationship_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'educated' }),
    __metadata("design:type", String)
], Pal.prototype, "current_education_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Nice' }),
    __metadata("design:type", String)
], Pal.prototype, "one_word_about_me", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Very Nice' }),
    __metadata("design:type", String)
], Pal.prototype, "one_paragraph_about_me", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Too talkative' }),
    __metadata("design:type", String)
], Pal.prototype, "one_complaint_about_me", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Pal.prototype, "access_to_read_pal_granted", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Pal.prototype, "access_to_write_pal_granted", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true, default: ['siddhidajha@gmail.com'] }),
    __metadata("design:type", String)
], Pal.prototype, "access_to_write_pal_granted_to", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true, default: ['siddhidajha@gmail.com'] }),
    __metadata("design:type", Array)
], Pal.prototype, "access_to_read_pal_granted_to", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Book_1.Book),
    (0, typeorm_1.JoinColumn)({ name: 'book_id' }),
    __metadata("design:type", Book_1.Book)
], Pal.prototype, "book", void 0);
exports.Pal = Pal = __decorate([
    (0, typeorm_1.Entity)()
], Pal);
