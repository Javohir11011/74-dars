import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../auth/entities/auth.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersRepository } from './repository/user.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
})
export class UsersModule {}
