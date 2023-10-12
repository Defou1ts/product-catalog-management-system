import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';
import { RolesResolver } from './roles.resolver';

import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

@Module({
	providers: [RolesService, RolesRepository, RolesResolver],
	imports: [TypeOrmModule.forFeature([Role, User]), JwtModule, CacheModule.register()],
	exports: [RolesService],
})
export class RolesModule {}
