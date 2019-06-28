import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Localisation } from '../Localisation/Localisation.entity';

@Entity({ name: 'agence' })
export class Agence {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_agence' })
  public id: number;

  @OneToOne(type => Localisation)
  @JoinColumn()
  localisation: Localisation;

  @Column({ name: 'Taux_agence', type: 'varchar' })
  public taux_agence: string;
}
