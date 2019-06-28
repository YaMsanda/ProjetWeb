import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contreproposition } from '../Contreproposition/Contreproposition.entity';
import { Effectuer } from '../Effectuer/Effectuer.entity';
import { RoleEnum } from '../Enum/Role.enum';
import { Favoris } from '../Favoris/Favoris.entity';
import { Localisation } from '../Localisation/Localisation.entity';

@Entity({ name: 'client' })
export class Client {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_client' })
  public id: number;

  @Column({ name: 'Mail_client', type: 'varchar' })
  public mail_client: string;

  @Column({ name: 'Nom_client', type: 'varchar' })
  public nom_client: string;

  @Column({ name: 'Prenom_client', type: 'varchar' })
  public prenom_client: string;

  @Column({ name: 'Datenaiss_client', type: 'varchar' })
  public datenaiss_client: string;

  @Column({ name: 'Tel_client', type: 'varchar' })
  public tel_client: string;

  @Column({ name: 'Note_client', type: 'varchar' })
  public note_client: string;

  @Column({ name: 'Pass_client', type: 'varchar' })
  public pass_client: string;

  @Column({
    name: 'Role_client',
    type: 'enum',
    enum: RoleEnum,
    default: 'Utilisateur',
  })
  public role_client: RoleEnum;

  @OneToOne(type => Localisation)
  localisation?: Localisation;

  @ManyToMany(type => Favoris, favoris => favoris.client, { nullable: true })
  @JoinTable()
  favoris?: Favoris[];

  @ManyToMany(type => Effectuer, effectuer => effectuer.client, {
    nullable: true,
  })
  effectuer?: Effectuer[];

  @ManyToOne(
    type => Contreproposition,
    contreproposition => contreproposition.client,
    {
      nullable: true,
    },
  )
  contreproposition?: Contreproposition;
}
