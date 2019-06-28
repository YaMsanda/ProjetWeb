import { EntityRepository, Repository } from 'typeorm';

import { Appartenir } from './Appartenir.entity';

@EntityRepository(Appartenir)
export class FavorisRepository extends Repository<Appartenir> {}
