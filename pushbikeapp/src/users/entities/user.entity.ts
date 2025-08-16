/* eslint-disable prettier/prettier */
export class User {
  constructor(
    public id_pendaftaran: number,
    public nama: string,
    public plat_number: string,
    public community: string,
    public point1 : number,
    public point2 : number,
  ) {}

  getDisplayName(): string {
    return `${this.nama}(${this.id_pendaftaran})`;
  }
}
