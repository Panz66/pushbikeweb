/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private data: User[] = [];
  private counter = 1; // auto increment ID pendaftaran

  create(dto: CreateUserDto): User {
    const newUser = new User(
      dto.id_pendaftaran ?? this.counter++, // auto-generate jika tidak dikirim
      dto.nama,
      dto.plat_number,
      dto.community,
      dto.point1 ?? 0,
      dto.point2 ?? 0,
    );
    this.data.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.data;
  }

  findOne(id_pendaftaran: number): User | undefined {
    return this.data.find((m) => m.id_pendaftaran === id_pendaftaran);
  }

  update(id_pendaftaran: number, dto: UpdateUserDto): User | null {
    const index = this.data.findIndex((m) => m.id_pendaftaran === id_pendaftaran);
    if (index === -1) return null;

    const user = this.data[index];

    // update hanya field yang dikirim
    this.data[index] = new User(
      dto.id_pendaftaran ?? user.id_pendaftaran,
      dto.nama ?? user.nama,
      dto.plat_number ?? user.plat_number,
      dto.community ?? user.community,
      dto.point1 ?? user.point1,
      dto.point2 ?? user.point2,
    );

    return this.data[index];
  }

  remove(id_pendaftaran: number): User | null {
    const index = this.data.findIndex((m) => m.id_pendaftaran === id_pendaftaran);
    if (index === -1) return null;

    const deleted = this.data[index];
    this.data.splice(index, 1);
    return deleted;
  }
}
