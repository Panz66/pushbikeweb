/* eslint-disable prettier/prettier */
export class User {
  constructor(
    public pendaftaran: number,
    public nama: string,
    public plat_number: string,
    public comunnity: string,
    public email: string,
    public point: number,
  ) {}

  getDisplayName(): string {
    return '${this.nama}(${this.pendaftaran})';
  }
}
