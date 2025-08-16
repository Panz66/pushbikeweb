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

  @Get(':id_pendaftaran')
  findOne(@Param('id_pendaftaran') id_pendaftaran: number) {
    const user = this.service.findOne(+id_pendaftaran);
    if (!user) {
      throw new NotFoundException(
        `User dengan nomor id_pendaftaran ${id_pendaftaran} tidak ditemukan`,
      );
    }
    return user;
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Put(':id_pendaftaran')
  update(
    @Param('id_pendaftaran') id_pendaftaran: number,
    @Body() dto: UpdateUserDto,
  ) {
    try {
      const updated = this.service.update(+id_pendaftaran, dto);
      if (!updated) {
        throw new NotFoundException(
          `User dengan nomor id_pendaftaran ${id_pendaftaran} tidak ditemukan`,
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

  @Delete(':id_pendaftaran')
  remove(@Param('id_pendaftaran') id_pendaftaran: number) {
    const deleted = this.service.remove(+id_pendaftaran);
    if (!deleted) {
      throw new NotFoundException(
        `User dengan nomor id_pendaftaran ${id_pendaftaran} tidak ditemukan`,
      );
    }
    return deleted;
  }
}
