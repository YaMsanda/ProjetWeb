import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'localisation' })
export class Localisation {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_localisation' })
  public id: number;

  @Column({ name: 'Adresse', type: 'varchar' })
  public adresse: string;

  @Column({ name: 'Code_postal', type: 'int' })
  public numero: number;
}
