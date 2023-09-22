import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import {Book} from './Book';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 'Sid' })
  name!: string;

  @Column({ default: 'jhasiddhida@gmail.com' })
  email_id!: string;

  @Column({ default: true })
  is_authenticated!: boolean;

  @Column({ default: true })
  is_loggedin!: boolean;

  @Column({ type: 'date', nullable: true, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  last_loggedIn!: Date| null

  @OneToMany(() => Book, (book: Book) => book.user, { cascade: true })
    @JoinColumn({ name: 'book_id' })
  books!: Book[];

  // @OneToOne(() => Book)
  //   @JoinColumn({ name: 'bookId' })
  //   books!: Book;
}
