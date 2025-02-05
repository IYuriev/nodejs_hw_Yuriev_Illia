import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from 'src/auth/decorators/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Get('/:value')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
