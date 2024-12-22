import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../enums/role.enums';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/role.decorators';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get()
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    try {
      return this.usersService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @Post('/:id/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          console.log(file);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              '.' +
              file.originalname.split('.')[1],
          );
        },
      }),
    }),
  )
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    const url = `http://localhost:3000/uploads/${file.filename}`;
    return { message: 'File uploaded successfully', url };
  }
  setAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return this.usersService.addAvatar(+id, file.path);
    } catch (error) {
      return error;
    }
  }
  @Get('/:id/avatar')
  getAvatar(@Param('id') id: string, @Res() res: Response) {
    const fileName = `avatar-${id}.jpg`;
    const filePath = join(__dirname, '..', '..', 'uploads', fileName);

    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    } else {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.updateUser(+id, updateUserDto);
    } catch (error) {
      return error;
    }
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    try {
      return this.usersService.deleteUser(+id);
    } catch (error) {
      return error;
    }
  }
}
