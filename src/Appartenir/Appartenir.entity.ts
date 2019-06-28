import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bien } from '../Bien/Bien.entity';
import { Dependances } from '../Dependances/Dependances.entity';

@Entity({ name: 'appartenir' })
export class Appartenir {
  @ManyToOne(type => Dependances, dependances => dependances.appartenir, {
    nullable: true,
  })
  @JoinTable()
  dependances?: Dependances;

  @PrimaryGeneratedColumn('uuid', { name: 'appartenir_id' })
  public id: number;

  @ManyToMany(type => Bien, bien => bien.appartenir, { nullable: true })
  @JoinTable()
  bien?: Bien[];
}
