import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agence } from '../Agence/Agence.entity';

@Entity({ name: 'agent' })
export class Agent {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_agent' })
  public id: number;

  @Column({ name: 'Nom_agent', type: 'varchar' })
  public nom_agent: string;

  @Column({ name: 'Prenom_agent', type: 'varchar' })
  public prenom_agent: string;

  @Column({ name: 'Mail_agent', type: 'varchar' })
  public mail_agent: string;

  @OneToOne(type => Agence, { nullable: true })
  @JoinColumn()
  agence?: Agence;
}
