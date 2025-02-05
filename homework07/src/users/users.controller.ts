import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Post,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/create-user.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { AddRoleDto } from './dto/add-role.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SelfOnlyGuard } from 'src/auth/guards/self-only.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, SelfOnlyGuard)
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, SelfOnlyGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/role')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}
