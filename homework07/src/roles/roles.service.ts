import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = this.rolesRepository.create(dto);
    return await this.rolesRepository.save(role);
  }

  async getRoleByValue(value: string) {
    return this.rolesRepository.findOneBy({ value });
  }
}
