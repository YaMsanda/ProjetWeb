import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../Client/Client.entity';
import { Proposition } from '../Proposition/Proposition.entity';

@Entity({ name: 'contreproposition' })
export class Contreproposition {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_contreprop' })
  public id: number;

  @Column({ name: 'Margenegoc_contreprop', type: 'int' })
  public titre_prop: number;

  @Column({ name: 'Type_contreprop', type: 'varchar' })
  public prix_prop: string;

  @Column({ name: 'Texte_contreprop', type: 'varchar' })
  public justifIdent_prop: string;

  @OneToOne(type => Proposition)
  @JoinColumn()
  proposition?: Proposition;

  @OneToMany(type => Client, client => client.contreproposition, {
    nullable: true,
  })
  @JoinColumn()
  client?: Client[];
}
