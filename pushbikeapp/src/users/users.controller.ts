/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':pendaftaran')
  findOne(@Param('pendaftaran') pendaftaran: number) {
    const user = this.service.findOne(+pendaftaran);
    if (!user) {
      throw new NotFoundException(
        `User dengan nomor pendaftaran ${pendaftaran} tidak ditemukan`,
      );
    }
    return user;
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Put(':pendaftaran')
  update(
    @Param('pendaftaran') pendaftaran: number,
    @Body() dto: UpdateUserDto,
  ) {
    try {
      const updated = this.service.update(+pendaftaran, dto);
      if (!updated) {
        throw new NotFoundException(
          `User dengan nomor pendaftaran ${pendaftaran} tidak ditemukan`,
        );
      }
      return updated;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Terjadi kesalahan tak dikenal');
    }
  }

  @Delete(':pendaftaran')
  remove(@Param('pendaftaran') pendaftaran: number) {
    const deleted = this.service.remove(+pendaftaran);
    if (!deleted) {
      throw new NotFoundException(
        `User dengan nomor pendaftaran ${pendaftaran} tidak ditemukan`,
      );
    }
    return deleted;
  }
}
