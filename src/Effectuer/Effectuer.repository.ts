import { EntityRepository, Repository } from 'typeorm';

import { Effectuer } from './Effectuer.entity';

@EntityRepository(Effectuer)
export class FavorisRepository extends Repository<Effectuer> {}
