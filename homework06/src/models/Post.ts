import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

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

  @Column({
    type: "enum",
    enum: PostStatus,
    default: PostStatus.DRAFT,
  })
  status: PostStatus;

  @Column("timestamp")
  createdAt: Date;

  @Column("timestamp")
  updatedAt: Date;
}

export default Post;
