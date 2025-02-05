import { Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto, user: User) {
    const post = this.postsRepository.create({ ...dto, user });
    return await this.postsRepository.save(post);
  }

  async findAll() {
    return await this.postsRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    return await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, dto: UpdatePostDto) {
    return await this.postsRepository.update(id, dto);
  }

  async remove(id: number) {
    return await this.postsRepository.delete(id);
  }
}
