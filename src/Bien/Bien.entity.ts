import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agence } from '../Agence/Agence.entity';
import { Agent } from '../Agent/Agent.entity';
import { Appartenir } from '../Appartenir/Appartenir.entity';
import { Client } from '../Client/Client.entity';
import { Favoris } from '../Favoris/Favoris.entity';
import { Localisation } from '../Localisation/Localisation.entity';

@Entity({ name: 'bien' })
export class Bien {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_bien' })
  public id: number;

  @OneToMany(type => Favoris, favoris => favoris.bien, { nullable: true })
  favoris?: Favoris[];

  @OneToOne(type => Client)
  @JoinColumn()
  client: Client;

  @OneToOne(type => Agence)
  @JoinColumn()
  agence: Agence;

  @OneToOne(type => Localisation)
  @JoinColumn()
  localisation: Localisation;

  @OneToOne(type => Agent)
  @JoinColumn()
  agent: Agent;

  @ManyToMany(type => Appartenir, appartenir => appartenir.bien, {
    nullable: true,
  })
  appartenir?: Appartenir[];

  @Column({ name: 'Nom_bien', type: 'varchar' })
  public nom_bien: string;

  @Column({ name: 'Surfacehab_bien', type: 'float' })
  public surfacehab_bien: number;

  @Column({ name: 'Surfacetotal_bien', type: 'float' })
  public surfacetotal_bien: number;

  @Column({ name: 'Nbrepieces_bien', type: 'int' })
  public nbrepieces_bien: number;

  @Column({ name: 'Prix_bien', type: 'int' })
  public prix_bien: number;

  @Column({ name: 'Desc_bien', type: 'varchar' })
  public desc_bien: string;
}
