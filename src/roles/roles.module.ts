import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from './entities/role.entity';
import { RolesRepository } from './repository/role.repository';

@Module({
  imports: [SequelizeModule.forFeature([Roles])],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
})
export class RolesModule {}
