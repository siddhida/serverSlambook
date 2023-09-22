import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany } from 'typeorm';
import {Book} from './Book';
import { type } from 'os';
@Entity()
export class Pal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: 'pal' })
  nick_name?: string;

  @Column({ default: 'jhasiddhida@gmail.com' })
  email_id?: string;

  @Column({ default: '7294110530' })
  phone_number?: string;

  // @Column({default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  @Column()
  dob?: Date;

  @Column({ default: 'icecream, food, fight, offline games,reading' })
  likes ?: string

  @Column({ default: 'fight, reels, PubG game' })
  dislikes ?: string

  @Column({ default: 'PalPal' })
  current_crush ?: string

  @Column({ default: 'Complex' })
  current_employment_status ?: string

  @Column({ default: 'complicated' })
  current_relationship_status ?: string

  @Column({ default: 'educated' })
  current_education_status ?: string

  @Column({ default: 'Nice' })
  one_word_about_me ?: string

  @Column({ default: 'Very Nice' })
  one_paragraph_about_me ?: string

  @Column({ default: 'Too talkative' })
  one_complaint_about_me ?: string

  @Column({ default: true })
  access_to_read_pal_granted!: boolean

  @Column({ default: true })
  access_to_write_pal_granted!: boolean

  @Column('text', { array: true, nullable: true, default: ['siddhidajha@gmail.com']  })
  access_to_write_pal_granted_to!: string

  @Column('text', { array: true, nullable: true, default: ['siddhidajha@gmail.com'] })
  access_to_read_pal_granted_to!: Array<string>

  @ManyToOne(() => Book)
    @JoinColumn({ name: 'book_id' })
    book!: Book;

  // @ManyToMany(() => Book, (book) => book.pals)
  // @JoinColumn({ name: 'bookId' })
  // books!: Book[];
}
