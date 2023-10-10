import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';

import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

@Module({
	providers: [RolesService, RolesRepository],
	imports: [TypeOrmModule.forFeature([Role, User]), JwtModule],
	exports: [RolesService],
})
export class RolesModule {}
