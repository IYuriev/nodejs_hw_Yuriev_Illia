import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from './../roles/roles.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async create(dto: CreateUserDto) {
    const role =
      (await this.rolesService.getRoleByValue('USER')) ??
      (await this.rolesService.createRole({
        value: 'USER',
        description: 'Default user role',
      }));

    const user = this.usersRepository.create({
      ...dto,
      roles: [role],
    });

    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find({ relations: ['roles', 'posts'] });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateUserDto) {
    return await this.usersRepository.update(id, dto);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['roles', 'posts'],
    });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.usersRepository.findOne({
      where: { id: dto.userId },
      relations: ['roles', 'posts'],
    });
    const role = await this.rolesService.getRoleByValue(dto.value);
    if (user && role && !user.roles.some((r) => r.id === role.id)) {
      user.roles.push(role);
      return await this.usersRepository.save(user);
    }
    throw new HttpException(
      'User or role not found or user already has this role',
      HttpStatus.NOT_FOUND,
    );
  }
}
