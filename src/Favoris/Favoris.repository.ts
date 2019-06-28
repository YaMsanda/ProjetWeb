import { EntityRepository, Repository } from 'typeorm';

import { Favoris } from './Favoris.entity';

@EntityRepository(Favoris)
export class FavorisRepository extends Repository<Favoris> {}
