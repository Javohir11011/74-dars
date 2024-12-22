import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from './database/database';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './category/category.module';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    SequelizeModule.forRoot(Sequelize.connect()),
    AuthModule,
    UsersModule,
    RolesModule,
    CategoryModule,
  ],
})
export class AppModule {}
