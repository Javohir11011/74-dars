import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../entities/category.entity';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoryRepo {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoryModel.create(createCategoryDto);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryModel.findAll();
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      const category = await this.categoryModel.findByPk(id);
      if (!category) {
        throw new NotFoundException(`not found.`);
      }
      return category;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const category = await this.findOne(id);
      await category.update(updateCategoryDto);
      return category;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const category = await this.findOne(id);
      await category.destroy();
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}
