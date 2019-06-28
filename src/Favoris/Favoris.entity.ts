import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bien } from '../Bien/Bien.entity';
import { Client } from '../Client/Client.entity';

@Entity({ name: 'favoris' })
export class Favoris {
  @PrimaryGeneratedColumn('uuid', { name: 'favoris' })
  public id: number;

  @ManyToOne(type => Bien, bien => bien.favoris, { nullable: true })
  @JoinTable()
  bien?: Bien;

  @ManyToMany(type => Client, client => client.favoris, { nullable: true })
  @JoinTable()
  client?: Client[];
}
