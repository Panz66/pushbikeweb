/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsInt({ message: 'ID pendaftaran diisi otomatis oleh sistem' })
  id_pendaftaran?: number;

  @IsString({ message: 'Nama tidak boleh kosong' })
  nama: string;

  @IsString({ message: 'Plat berupa kombinasi huruf dan angka' })
  plat_number: string;

  @IsString({ message: 'Community berupa teks' })
  community: string;

  @IsOptional()
  @IsInt({ message: 'Point1 diisi admin' })
  point1?: number;

  @IsOptional()
  @IsInt({ message: 'Point2 diisi admin' })
  point2?: number;
}
