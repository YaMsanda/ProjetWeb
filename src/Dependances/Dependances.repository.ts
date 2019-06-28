import { EntityRepository, Repository } from 'typeorm';

import { Dependances } from './Dependances.entity';

@EntityRepository(Dependances)
export class DependancesRepository extends Repository<Dependances> {}
