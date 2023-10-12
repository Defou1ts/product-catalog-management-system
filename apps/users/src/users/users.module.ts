import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersRepository } from './users.repostiory';
import { UsersResolver } from './users.resolver';

import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
	providers: [UsersService, UsersRepository, UsersResolver],
	imports: [TypeOrmModule.forFeature([User, Role]), RolesModule],
	exports: [],
})
export class UsersModule {}
