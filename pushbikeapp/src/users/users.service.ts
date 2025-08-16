/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private data: User[] = [];

  create(dto: CreateUserDto): User {
    const newUser = new User(
      dto.pendaftaran,
      dto.nama,
      dto.plat_number,
      dto.comunnity,
      dto.email,
      dto.point,
    );
    this.data.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.data;
  }

  findOne(pendaftaran: number): User | undefined {
    return this.data.find((m) => m.pendaftaran === pendaftaran);
  }

  update(pendaftaran: number, dto: UpdateUserDto): User | null {
    if (
      !dto.pendaftaran ||
      !dto.nama ||
      !dto.plat_number ||
      !dto.comunnity ||
      !dto.email ||
      !dto.point
    ) {
      throw new Error('Semua field wajib diisi untuk update');
    }

    const index = this.data.findIndex((m) => m.pendaftaran === pendaftaran);
    if (index === -1) return null;

    const updated = new User(
      dto.pendaftaran,
      dto.nama,
      dto.plat_number,
      dto.comunnity,
      dto.email,
      dto.point,
    );
    this.data[index] = updated;
    return updated;
  }

  remove(pendaftaran: number): User | null {
    const index = this.data.findIndex((m) => m.pendaftaran === pendaftaran);
    if (index === -1) return null;

    const deleted = this.data[index];
    this.data.splice(index, 1);
    return deleted;
  }
}
