import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appartenir } from '../Appartenir/Appartenir.entity';
import { DependancesEnum } from '../enum/Dependance.enum';

@Entity({ name: 'dependances' })
export class Dependances {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_dependance' })
  public id: number;

  @Column({ name: 'Libelle_dependance', type: 'enum', enum: DependancesEnum })
  public libelle_dependance: DependancesEnum;

  @Column({ name: 'Superficie_dependance', type: 'float' })
  public superficie_dependance: number;

  @OneToMany(type => Appartenir, appartenir => appartenir.dependances, {
    nullable: true,
  })
  appartenir?: Appartenir[];
}
