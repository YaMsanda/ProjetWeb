import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../Client/Client.entity';
import { Proposition } from '../Proposition/Proposition.entity';

@Entity({ name: 'effectuer' })
export class Effectuer {
  @ManyToOne(type => Proposition, proposition => proposition.effectuer, {
    nullable: true,
  })
  @JoinTable()
  proposition?: Proposition;

  @PrimaryGeneratedColumn('uuid', { name: 'effectuer_id' })
  public id: number;

  @ManyToMany(type => Client, client => client.effectuer, { nullable: true })
  @JoinTable()
  client?: Client[];
}
