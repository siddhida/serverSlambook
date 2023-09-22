import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { User } from './User';
import { Pal } from './Pal';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: false })
  access_to_read_granted!: boolean;

  @Column({ default: false })
  access_to_write_granted!: boolean;

  @Column('text', {
    array: true,
    nullable: true,
    default: ['siddhidajha@gmail.com'],
  })
  access_to_read_granted_to!: string;

  @Column('text', {
    array: true,
    nullable: true,
    default: ['siddhidajha@gmail.com'],
  })
  access_to_write_granted_to!: Array<string>;

  // @OneToOne(() => User)
  //   @JoinColumn({ name: 'userId' })
  //   user!: User;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToMany(() => Pal, (pal) => pal.book, { cascade: true })
  @JoinTable()
  pals!: Pal[];

  // @OneToMany((type) => Pal, (child) => child.id)
  // @JoinColumn({ name: 'palId' })
  // pal!: Pal[];
}
