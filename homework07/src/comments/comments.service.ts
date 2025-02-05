import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './dto/create-comment.dto';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(postId: number, dto: CreateCommentDto, userId: number) {
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }
    const comment = this.commentsRepository.create({
      content: dto.content,

      post: { id: postId } as Post,
      user: { id: userId } as User,
    });
    return await this.commentsRepository.save(comment);
  }

  async findAll() {
    return await this.commentsRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    return await this.commentsRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateCommentDto) {
    return await this.commentsRepository.update(id, dto);
  }

  async remove(id: number) {
    return await this.commentsRepository.delete(id);
  }
}
