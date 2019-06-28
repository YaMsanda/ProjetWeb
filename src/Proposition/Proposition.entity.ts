import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bien } from '../Bien/Bien.entity';
import { Contreproposition } from '../Contreproposition/Contreproposition.entity';
import { Effectuer } from '../Effectuer/Effectuer.entity';

@Entity({ name: 'proposition' })
export class Proposition {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_prop' })
  public id: number;

  @OneToMany(type => Effectuer, effectuer => effectuer.proposition, {
    nullable: true,
  })
  effectuer?: Effectuer[];

  @Column({ name: 'Titre_prop', type: 'varchar' })
  public titre_prop: string;

  @Column({ name: 'Prix_prop', type: 'int' })
  public prix_prop: number;

  @Column({ name: 'JustifIdent_prop', type: 'varchar' })
  public justifIdent_prop: string;

  @Column({ name: 'ModeFinanc_prop', type: 'varchar' })
  public modeFinanc_prop: string;

  @Column({ name: 'FinProj_prop', type: 'varchar' })
  public finProj_prop: string;

  @OneToOne(type => Bien)
  @JoinColumn()
  bien?: Bien;

  @OneToOne(type => Contreproposition)
  contreproposition?: Contreproposition;
}
