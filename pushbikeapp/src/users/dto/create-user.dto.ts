/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNumber({}, { message: 'No pendaftaran diisi  otomatis' })
  pendaftaran: number;

  @IsString({ message: 'Nama tidak boleh kosong ' })
  nama: string;

  @IsString({ message: 'Plat berupa teks huruf dan angka ' })
  plat_number: string;

  @IsString({ message: 'Comunnity berupa teks ' })
  comunnity: string;

  @IsEmail({}, { message: 'harus berisi format email ' })
  email: string;

  @IsNumber({}, { message: 'point diisi admin' })
  point: number;
}
