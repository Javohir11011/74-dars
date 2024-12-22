import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepo } from './repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepo) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepo.create(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepo.findAll();
  }

  async findOne(id: number) {
    return await this.categoryRepo.findOne(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepo.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    return await this.categoryRepo.remove(id);
  }
}
