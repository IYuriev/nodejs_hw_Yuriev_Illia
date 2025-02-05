import { UsersService } from './../users/users.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { saltRounds } from 'src/constants/auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email address exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, saltRounds);
    const user = await this.usersService.create({
      ...dto,
      password: hashPassword,
    });
    const token = await this.generateToken(user);

    return { token: token.token };
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Incorrect email',
      });
    }

    const passwordEquals = await bcrypt.compare(dto.password, user.password);

    if (!passwordEquals) {
      throw new UnauthorizedException({
        message: 'Incorrect password',
      });
    }

    return user;
  }
}
