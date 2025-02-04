import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepo } from './repository/category.repository';
import { Category } from './entities/category.entity';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepo],
  exports: [CategoryService],
})
export class CategoryModule {}
