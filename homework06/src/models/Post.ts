import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
class Post {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("integer")
  authorId: number;

  @Column("text")
  title: string;

  @Column("text")
  content: string;

  @Column("text")
  status: string;

  @Column("timestamp")
  createdAt: Date;

  @Column("timestamp")
  updatedAt: Date;
}

export default Post;
