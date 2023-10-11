import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersRepository } from './users.repostiory';

import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { RolesModule } from '../roles/roles.module';
import { CartsModule } from '../carts/carts.module';

@Module({
	providers: [UsersService, UsersRepository],
	imports: [TypeOrmModule.forFeature([User, Role]), RolesModule, CartsModule],
	exports: [UsersService],
})
export class UsersModule {}
