import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants/auth';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
