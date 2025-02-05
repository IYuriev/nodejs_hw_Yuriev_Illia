import { Role } from 'src/roles/entities/role.entity';
import { Post } from '../../posts/entities/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column('text')
  name: string;

  @Column('text')
  @Exclude()
  password: string;

  @Column('text', { unique: true })
  email: string;

  @Column('integer')
  age: number;

  @ManyToMany(() => Role, (role) => role.users, {
    cascade: true,
  })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Post, (post: Post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
